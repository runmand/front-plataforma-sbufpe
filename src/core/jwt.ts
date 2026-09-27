/**
 * Decodifica o payload de um token JWT sem validar a assinatura no cliente.
 * Seguro para leitura de claims públicos (ex.: id do usuário, typeId, exp).
 */
export function parseJwtPayload<T = Record<string, any>>(token?: string | null): T | null {
    if (!token || typeof token !== "string") return null;
    try {
        const parts = token.split(".");
        if (parts.length < 2) return null;
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(jsonPayload) as T;
    } catch {
        return null;
    }
}
