import axios, { AxiosRequestConfig } from "axios";
import { localStorageKeyEnum } from "./enums";
import { parseJwtPayload } from "./jwt";
import { showError, showWarning } from "./snackbar";

declare module "axios" {
    interface AxiosRequestConfig {
        silent?: boolean;
        _retryCount?: number;
    }
}

const MAX_GET_RETRIES = 2;
const RETRYABLE_STATUS_CODES = new Set([502, 503, 504]);

const OPEN_ROUTES: string[] = [
    "/",
    "/login/",
    "/login",
    "/login/cpf",
    "/login/cellphone",
    "/login/email",
    "/login/username",
    "/user-registers",
    "/user-types",
    "/reset/",
    "/reset/execute",
    "/biopen/aps",
    "/biopen/ceo",
    "/biopen/usuario",
];

const SESSION_LOCAL_KEYS = [
    localStorageKeyEnum.TOKEN,
    localStorageKeyEnum.TYPE_ID,
    localStorageKeyEnum.USER_ID,
    "historyTeoric",
    "teoric-config",
    "historyPratical",
    "pratical-config",
    "selectedAnswer",
    "lastFormSubmited",
];

function isOpenRoute(url?: string): boolean {
    const cleanUrl = url?.split("?")[0] || "";
    return (
        OPEN_ROUTES.includes(cleanUrl) ||
        cleanUrl.startsWith("/login/") ||
        cleanUrl.startsWith("/biopen/") ||
        cleanUrl.startsWith("/databi/")
    );
}

function isTokenExpired(token: string): boolean {
    const payload = parseJwtPayload<{ exp?: number }>(token);
    if (!payload?.exp || typeof payload.exp !== "number") return false;
    return Date.now() >= payload.exp * 1000;
}

export function clearClientSession() {
    if (typeof window === "undefined") return;
    SESSION_LOCAL_KEYS.forEach((key) => {
        try {
            localStorage.removeItem(key);
        } catch {
            // ignore storage errors
        }
    });
    try {
        sessionStorage.clear();
    } catch {
        // ignore storage errors
    }
}

let isHandlingSessionExpiry = false;

function handleSessionExpired(silent?: boolean) {
    if (typeof window === "undefined") return;
    clearClientSession();
    if (isHandlingSessionExpiry) return;
    isHandlingSessionExpiry = true;

    if (!silent) {
        showWarning("Sua sessão expirou. Faça login novamente.");
    }

    window.setTimeout(() => {
        if (window.location.pathname !== "/") {
            window.location.href = "/";
        }
        window.setTimeout(() => {
            isHandlingSessionExpiry = false;
        }, 1500);
    }, 300);
}

function shouldRetryGetRequest(error: any, config?: AxiosRequestConfig): boolean {
    if (!config || config.method?.toLowerCase() !== "get") return false;
    if (error?.message === "No token" || error?.message === "Session expired") return false;

    const retryCount = config._retryCount ?? 0;
    if (retryCount >= MAX_GET_RETRIES) return false;

    const status = error?.response?.status;
    const isNetworkError = !error?.response;
    const isTimeout = error?.code === "ECONNABORTED";
    const isTransientHttp = typeof status === "number" && RETRYABLE_STATUS_CODES.has(status);

    return isNetworkError || isTimeout || isTransientHttp;
}

export const http = axios.create({
    baseURL: process.env.API_URL,
    timeout: 15000,
});

http.interceptors.request.use(
    (config) => {
        if (!isOpenRoute(config.url)) {
            const token = typeof window !== "undefined" ? localStorage.getItem(localStorageKeyEnum.TOKEN) : null;

            /** Se não existir JWT token, redireciona para a pagina inicial. */
            if (!token) {
                if (typeof window !== "undefined" && window.location.pathname !== "/") {
                    window.location.href = "/";
                }
                return Promise.reject(new Error("No token"));
            }

            /** Valida expiração (exp) do JWT antes de enviar requisição protegida. */
            if (isTokenExpired(token)) {
                handleSessionExpired(config.silent);
                return Promise.reject(new Error("Session expired"));
            }

            /** Se existir JWT token válido, injeta os dados no header da requisição. */
            config.headers = config.headers || {};
            config.headers.token = token;
        }

        return config;
    },
    (e) => {
        console.error("axios-request-interceptor", e);
        return { errors: typeof e === "string" ? e : e.response?.data?.errors?.map((err: any) => err.message) };
    }
);

http.interceptors.response.use(
    (res) => {
        const errors: string[] | undefined = res.data?.errors?.map((err: any) => err.message);
        const silent = (res.config as AxiosRequestConfig)?.silent;

        if (errors?.length && !silent) {
            errors.forEach((msg) => showError(msg));
        }

        return {
            status: res.data?.status,
            data: res.data?.data,
            msg: res.data?.msg,
            errors,
        };
    },
    async (e) => {
        const config = e?.config as AxiosRequestConfig | undefined;

        if (shouldRetryGetRequest(e, config)) {
            const nextRetry = (config!._retryCount ?? 0) + 1;
            config!._retryCount = nextRetry;
            const baseDelay = nextRetry === 1 ? 500 : 1500;
            const jitter = Math.floor(Math.random() * 250);
            await new Promise((resolve) => setTimeout(resolve, baseDelay + jitter));
            return http.request(config!);
        }

        const isInternalAuthAbort = e?.message === "No token" || e?.message === "Session expired";
        if (!isInternalAuthAbort) {
            console.error("LOGGER::axios-response-interceptor", e);
        }

        const silent = config?.silent;
        const status = e?.response?.status;

        if (status === 401 && !isOpenRoute(config?.url)) {
            handleSessionExpired(silent);
            return Promise.reject({ errors: ["Sua sessão expirou. Faça login novamente."] });
        }

        const errors: string[] | undefined =
            typeof e === "string" ? [e] : e?.response?.data?.errors?.map((err: any) => err.message);

        if (errors?.length && !silent) {
            errors.forEach((msg) => showError(msg));
        } else if (!silent && !isInternalAuthAbort) {
            showError("Ops! Algo deu errado...");
        }

        return Promise.reject({ errors });
    }
);
