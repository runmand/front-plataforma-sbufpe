export interface AccessData {
	month: string;
	qty: string;
}

export function YearTable({ year, rows, max }: { year: string; rows: AccessData[]; max: number }) {
	return (
		<div className="mb-10 last:mb-0">
			<div className="flex items-center gap-3 mb-4">
				<span className="inline-flex items-center justify-center rounded-full bg-gb-primary text-white text-xs font-bold px-3 py-1 font-body tracking-wide">
					{year}
				</span>
				<span className="h-px flex-1 bg-gb-border" />
			</div>

			<div className="overflow-hidden rounded-xl border border-gb-border">
				<table className="w-full text-sm font-body">
					<thead>
						<tr className="bg-gb-input">
							<th scope="col" className="text-left px-4 py-2.5 font-semibold text-gb-text">Mês</th>
							<th scope="col" className="text-right px-4 py-2.5 font-semibold text-gb-text w-24">Acessos</th>
							<th scope="col" aria-hidden="true" className="hidden sm:table-cell px-4 py-2.5" />
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => (
							<tr key={`${year}-${row.month}`} className="even:bg-gb-input/40 border-t border-gb-border">
								<td className="px-4 py-2.5 text-gb-text">{row.month}</td>
								<td className="px-4 py-2.5 text-right font-semibold text-gb-primary">{row.qty}</td>
								<td className="hidden sm:table-cell px-4 py-2.5" aria-hidden="true">
									<span className="block h-1.5 rounded-full overflow-hidden bg-gb-primary/10">
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
