import { http } from "src/core/axios";
import { VigiaRow } from "./type";

export default class VigiaDashboardService {
	async getVigiaData(): Promise<VigiaRow[]> {
		const res = await http.get("/data/vigia");
		return (res.data as VigiaRow[]) ?? [];
	}
}
