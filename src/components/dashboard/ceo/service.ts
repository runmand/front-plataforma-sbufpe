import { http } from "src/core/axios";
import { CeoApiResponse } from "./type";

export default class CeoDashboardService {
	/** Rota genérica de leitura/exportação de dados (GET /data/form/:id) — formulário de CEO = id 1. */
	async getCeoData(): Promise<CeoApiResponse> {
		const res = await http.get("/data/form/1");
		return res.data as CeoApiResponse;
	}
}
