import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { AccessData, YearTable } from "./YearTable";

const rows2023: AccessData[] = [
	{ month: 'Abril', qty: '50' },
	{ month: 'Maio', qty: '197' },
	{ month: 'Junho', qty: '259' },
	{ month: 'Julho', qty: '206' },
	{ month: 'Agosto', qty: '298' },
	{ month: 'Setembro', qty: '458' },
	{ month: 'Outubro', qty: '465' },
	{ month: 'Novembro', qty: '587' },
	{ month: 'Dezembro', qty: '448' },
];

const rows2024: AccessData[] = [
	{ month: 'Janeiro', qty: '267' },
	{ month: 'Fevereiro', qty: '235' },
	{ month: 'Março', qty: '246' },
	{ month: 'Abril', qty: '439' },
	{ month: 'Maio', qty: '397' },
	{ month: 'Junho', qty: '515' },
	{ month: 'Julho', qty: '658' },
	{ month: 'Agosto', qty: '684' },
	{ month: 'Setembro', qty: '523' },
	{ month: 'Outubro', qty: '428' },
	{ month: 'Novembro', qty: '512' },
	{ month: 'Dezembro', qty: '345' },
];

const rows2025: AccessData[] = [
	{ month: 'Janeiro', qty: '389' },
	{ month: 'Fevereiro', qty: '352' },
	{ month: 'Março', qty: '423' },
	{ month: 'Abril', qty: '344' },
	{ month: 'Maio', qty: '425' },
	{ month: 'Junho', qty: '358' },
	{ month: 'Julho', qty: '420' },
	{ month: 'Agosto', qty: '398' },
	{ month: 'Setembro', qty: '345' },
	{ month: 'Outubro', qty: '315' },
	{ month: 'Novembro', qty: '425' },
	{ month: 'Dezembro', qty: '299' },
];

const rows2026: AccessData[] = [
	{ month: 'Janeiro', qty: '225' },
	{ month: 'Fevereiro', qty: '302' },
	{ month: 'Março', qty: '324' },
	{ month: 'Abril', qty: '418' },
	{ month: 'Maio', qty: '484' },
	{ month: 'Junho', qty: '477' },
];

export default function Index() {
	const max = Math.max(
		...[...rows2023, ...rows2024, ...rows2025, ...rows2026].map((row) => Number(row.qty)),
	);

	return (
		<div className="bg-[#f5f5f4] min-h-[88vh] pt-20 sm:pt-24 pb-20 sm:pb-24 px-4">
			<div className="max-w-[860px] mx-auto">
				<div className="text-center mb-6">
					<div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gb-primary mb-3">
						<BarChartOutlinedIcon style={{ color: "#ffffff", fontSize: 28 }} />
					</div>
					<h1
						className="font-display text-[28px] sm:text-[32px] font-bold text-gb-text leading-tight tracking-tight"
						style={{ background: "transparent" }}
					>
						Acessos
					</h1>
				</div>

				<div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 font-body border border-gb-border">
					<YearTable year="2023" rows={rows2023} max={max} />
					<YearTable year="2024" rows={rows2024} max={max} />
					<YearTable year="2025" rows={rows2025} max={max} />
					<YearTable year="2026" rows={rows2026} max={max} />
				</div>
			</div>
		</div>
	);
}
