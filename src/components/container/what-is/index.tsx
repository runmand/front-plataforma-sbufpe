import Link from "next/link";
import Carousel from "react-material-ui-carousel";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { routerEnum } from "src/core/enums";
import { AccessData, YearTable } from "@components/container/informes/YearTable";

const partners = [
	{ src: 'https://i.imgur.com/n2myEZg.png', alt: 'Logo Conselho Regional de Odontologia de Pernambuco' },
	{ src: 'https://i.imgur.com/9UbYlhV.png', alt: 'Logo FACEPE' },
	{ src: 'https://i.imgur.com/ZedrNah.png', alt: 'Logo CNPq' },
	{ src: 'https://i.imgur.com/Z1oobdG.png', alt: 'Logo UFPE' },
	{ src: 'https://i.imgur.com/B1VsMhf.png', alt: 'Logo do Governo do Estado de Pernambuco' },
];

const stats = [
	{ label: 'Usuários Cadastrados', value: '2.478' },
	{ label: 'Municípios Parceiros', value: '24' },
	{ label: 'Artigos no Acervo', value: '291' },
];

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
];

const accessMax = Math.max(
	...[...rows2023, ...rows2024, ...rows2025].map((row) => Number(row.qty)),
);

function SectionCard({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
	return (
		<div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 font-body border border-gb-border">
			<div className="mb-6 pb-5 border-b border-gb-border">
				<span className="inline-block text-[11px] font-bold tracking-widest uppercase text-gb-primary mb-2">
					{eyebrow}
				</span>
				<h2 className="font-display text-[22px] sm:text-[26px] font-bold text-gb-text leading-tight tracking-tight">
					{title}
				</h2>
			</div>
			{children}
		</div>
	);
}

export default function Index() {
	return (
		<div className="bg-[#f5f5f4] min-h-[88vh] pt-20 sm:pt-24 pb-20 sm:pb-24 px-4">
			<div className="max-w-[860px] mx-auto">
				<div className="text-center mb-6">
					<div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gb-primary mb-3">
						<InfoOutlinedIcon style={{ color: "#ffffff", fontSize: 28 }} />
					</div>
					<h1
						className="font-display text-[28px] sm:text-[32px] font-bold text-gb-text leading-tight tracking-tight"
						style={{ background: "transparent" }}
					>
						O que é GestBucal SD
					</h1>
				</div>

				<div className="space-y-8">
					<SectionCard eyebrow="Sobre" title="A plataforma">
						<div className="space-y-4 text-[14.5px] text-gb-text leading-relaxed text-justify">
							<p>
								A plataforma <strong>GestBucalSD</strong> é uma ferramenta web-based de autoprocessamento de dados projetada para o monitoramento e avaliação da saúde bucal.
							</p>
							<p>
								Através dela, é possível realizar o processamento automático de dados coletados nas unidades de saúde, gerando informações essenciais para avaliar a situação de saúde bucal da população.
							</p>
							<p>
								Com diversos módulos operacionais, a plataforma disponibiliza indicadores, gráficos, mapas e relatórios que auxiliam na compreensão da qualidade e efetividade dos serviços de atenção em saúde bucal.
							</p>
							<p>
								Dessa forma, o <strong>GestBucalSD</strong> contribui para uma governança inteligente e para a melhoria contínua da rede de atenção em saúde bucal.
							</p>
							<p>
								Acesse a{' '}
								<Link href={routerEnum.HOME} className="text-gb-primary font-semibold hover:underline">
									tela inicial
								</Link>{' '}
								para explorar suas funcionalidades.
							</p>
						</div>
					</SectionCard>

					<SectionCard eyebrow="Parceiros" title="Quem apoia o GestBucal SD">
						<Carousel indicators autoPlay>
							{partners.map((partner, index) => (
								<div key={index} className="h-40 sm:h-64 flex items-center justify-center">
									<img
										src={partner.src}
										alt={partner.alt}
										className="max-h-40 sm:max-h-64 max-w-[80%] object-contain mx-auto"
									/>
								</div>
							))}
						</Carousel>
					</SectionCard>

					<SectionCard eyebrow="Estatísticas" title="Números do GestBucal SD">
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
							{stats.map((stat) => (
								<div key={stat.label} className="rounded-xl bg-gb-input p-6 text-center">
									<div className="font-display text-3xl font-bold text-gb-primary">{stat.value}</div>
									<div className="text-sm text-gb-muted mt-1.5">{stat.label}</div>
								</div>
							))}
						</div>
					</SectionCard>

					<SectionCard eyebrow="Uso da plataforma" title="Acessos Mensais">
						<YearTable year="2023" rows={rows2023} max={accessMax} />
						<YearTable year="2024" rows={rows2024} max={accessMax} />
						<YearTable year="2025" rows={rows2025} max={accessMax} />
					</SectionCard>
				</div>
			</div>
		</div>
	);
}
