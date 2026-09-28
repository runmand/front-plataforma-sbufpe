import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

interface AccessData {
	month: string;
	qty: string;
}

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

function YearTable({ year, rows }: { year: string; rows: AccessData[] }) {
	const max = Math.max(...rows.map((row) => Number(row.qty)));

	return (
		<div className="mb-10 last:mb-0">
			<div className="flex items-center gap-3 mb-4">
				<span className="inline-flex items-center justify-center rounded-full bg-gb-primary text-white text-xs font-bold px-3 py-1 font-body tracking-wide">
					{year}
				</span>
				<span className="h-px flex-1" style={{ background: "#e7e5e4" }} />
			</div>

			<div className="overflow-hidden rounded-xl" style={{ border: "1px solid #e7e5e4" }}>
				<table className="w-full text-sm font-body">
					<thead>
						<tr className="bg-gb-input">
							<th className="text-left px-4 py-2.5 font-semibold text-gb-text">Mês</th>
							<th className="text-right px-4 py-2.5 font-semibold text-gb-text w-24">Acessos</th>
							<th className="hidden sm:table-cell px-4 py-2.5" />
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => (
							<tr key={`${year}-${row.month}`} className="even:bg-gb-input/40" style={{ borderTop: "1px solid #e7e5e4" }}>
								<td className="px-4 py-2.5 text-gb-text">{row.month}</td>
								<td className="px-4 py-2.5 text-right font-semibold text-gb-primary">{row.qty}</td>
								<td className="hidden sm:table-cell px-4 py-2.5">
									<span className="block h-1.5 rounded-full overflow-hidden" style={{ background: "#fde8ea" }}>
										<span
											className="block h-full rounded-full bg-gb-primary"
											style={{ width: `${(Number(row.qty) / max) * 100}%` }}
										/>
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default function Index() {
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

				<div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 font-body" style={{ border: "1px solid #e7e5e4" }}>
					<YearTable year="2023" rows={rows2023} />
					<YearTable year="2024" rows={rows2024} />
					<YearTable year="2025" rows={rows2025} />
					<YearTable year="2026" rows={rows2026} />
				</div>
			</div>
		</div>
	);
}
