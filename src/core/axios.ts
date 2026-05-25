import axios, { AxiosRequestConfig } from "axios";
import { localStorageKeyEnum } from "./enums";
import { showError } from "./snackbar";
// import jwt from 'jsonwebtoken';

declare module "axios" {
    interface AxiosRequestConfig {
        silent?: boolean;
    }
}

export const http = axios.create({ baseURL: process.env.API_URL });

http.interceptors.request.use(
    (config) => {
        const openRoutes: string[] = [
            "/",
            "/login/",
            "/login/cpf",
            "/login/cellphone",
            "/login/email",
            "/login/username",
            "/user-registers",
            "/user-types",
            "/reset/",
            "/biopen/aps",
            "/biopen/ceo",
            "/biopen/usuario",
        ];

        /** Se a rota for protegida, segue a lógica. */
        if (!openRoutes.includes(config.url)) {
            const token = localStorage.getItem(localStorageKeyEnum.TOKEN);

            //TODO: Verificar expiração do token.
            /** Se não existir JWT token, redireciona para a pagina inicial. */
            if (!token) {
                window.location.href = "/";
                return Promise.reject(new Error("No token"));
            }

            /** Se existir JWT token, injeta os dados no header da requisição. */
            //TODO: Usar token para permissão de rotas.
            // jwt.verify(token, process.env.JWT_SECRET);
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
        const errors: string[] | undefined = res.data.errors?.map((err: any) => err.message);
        const silent = (res.config as AxiosRequestConfig)?.silent;

        if (errors?.length && !silent) {
            errors.forEach((msg) => showError(msg));
        }

        return {
            status: res.data.status,
            data: res.data.data,
            msg: res.data.msg,
            errors,
        };
    },
    (e) => {
        if (e?.message !== "No token") {
            console.error("LOGGER::axios-response-interceptor", e);
        }

        const errors: string[] | undefined =
            typeof e === "string" ? [e] : e?.response?.data?.errors?.map((err: any) => err.message);
        const silent = (e?.config as AxiosRequestConfig)?.silent;

        if (errors?.length && !silent) {
            errors.forEach((msg) => showError(msg));
        } else if (!silent && e?.message !== "No token") {
            showError("Ops! Algo deu errado...");
        }

        return Promise.reject({ errors });
    }
);
