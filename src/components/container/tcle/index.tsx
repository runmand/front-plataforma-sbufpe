import * as React from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

type Section = { heading?: string; text: string };

const profissionaisSections: Section[] = [
    {
        text:
            "Convidamos o (a) Sr. (a) para participar como voluntário (a) da pesquisa GestBucalSD: AVALIAÇÃO DO USO DE PLATAFORMA WEB-BASED PARA MELHORIA DA QUALIDADE E GOVERNANÇA DOS SERVIÇOS PÚBLICOS DE SAÚDE BUCAL, que está sob a responsabilidade da pesquisadora Nilcema Figueiredo, residente na Rua José Bonifácio, 125/1602, Madalena-Recife-PE, CEP: 50.710-435 — Telefone (81) 99975-1015 e e-mail (nilcema.figueiredo@ufpe.br) para contato do pesquisador responsável, inclusive ligações a cobrar. Também participa da pesquisa, coordenando a área de Tecnologia da Informação, a pesquisadora Amanda Maria Chaves — telefone para contato: (81) 99655-5073.",
    },
    {
        text:
            "Todas as suas dúvidas podem ser esclarecidas com o responsável por esta pesquisa. Apenas quando todos os esclarecimentos forem dados e você concorde com a realização do estudo, pedimos que aceite o termo presente na primeira pergunta — ele será fornecido por e-mail ao final da resposta.",
    },
    {
        text:
            "O (a) senhor (a) estará livre para decidir participar ou recusar-se. Caso não aceite participar, não haverá nenhum problema; desistir é um direito seu, bem como será possível retirar o consentimento em qualquer fase da pesquisa, também sem nenhuma penalidade.",
    },
    {
        heading: "Descrição da pesquisa e esclarecimento da participação",
        text:
            "Nessa pesquisa, vamos precisar que você participe de investigação prévia à implantação da plataforma GestBucalSD; realize a avaliação de qualidade do estabelecimento de saúde em que trabalha e avaliação de satisfação profissional, caso você seja cirurgião(ã) dentista; e investigação sobre o efeito do GestBucalSD ao fim do projeto. Para tal, você acessará o(s) módulo(s) operacional(is) através da plataforma web-based GestBucalSD e responderá o(s) questionário(s) correspondente(s) à sua vinculação (periodicamente). Toda coleta de dados será realizada em meio on-line, onde os participantes farão um cadastro na plataforma, utilizando dados pessoais (Nome, CPF, Data de Nascimento, Endereço, E-mail, Sexo e Telefone), além da criação de uma senha que será armazenada e recuperada através de criptografia ponta a ponta. O tempo de cada avaliação dura em média de 8 a 10 minutos, realizada individualmente. A coleta será feita de acordo com a disponibilidade e vontade do participante, visto que estará disponível em meio on-line para preenchimento de acordo com a execução da pesquisa.",
    },
    {
        heading: "Riscos",
        text:
            "Esse estudo tem riscos mínimos. Os principais riscos estão relacionados ao manejo e proteção de dados, especialmente por se tratar de dados sensíveis. Para minimizar os possíveis riscos de vazamento de dados, os dados de cadastro serão armazenados em banco de dados isolados, com senha e criptografados. O profissional pode sentir algum constrangimento por ter que avaliar o seu serviço, porém todas as respostas dos questionários serão analisadas de maneira macro e, em sua divulgação, não estarão ligadas à identidade do usuário. Também pode ocorrer o risco do desconforto, onde o profissional pode não se sentir confortável em receber e-mails relacionados à plataforma. Para minimizar tal risco, o profissional pode optar por não receber notificações da plataforma, ou até excluir sua conta a qualquer momento que desejar.",
    },
    {
        heading: "Benefícios diretos e indiretos",
        text:
            "Os benefícios diretos para o profissional estão relacionados à adequação das condições sociais e do trabalho, melhoria de sua satisfação profissional, bem como maior empoderamento técnico e político à sua atuação. Como benefícios indiretos, espera-se o aprimoramento dos estabelecimentos de saúde e consequente rede de atenção em saúde bucal. Os métodos avaliativos, que expressam juízo de valor, podem levar à tomada de decisão para mudanças locais com vistas à melhoria da qualidade, resultando em serviços mais efetivos e promotores de saúde. O uso de ferramenta eletrônica oportuniza decisão ágil para governança inteligente.",
    },
    {
        heading: "Confidencialidade e contato",
        text:
            "Esclarecemos que os participantes dessa pesquisa têm plena liberdade de se recusar a participar do estudo e que esta decisão não acarretará penalização por parte dos pesquisadores. Todas as informações desta pesquisa serão confidenciais e serão divulgadas apenas em eventos ou publicações científicas, não havendo identificação dos voluntários, a não ser entre os responsáveis pelo estudo, sendo assegurado o sigilo sobre a sua participação. Os dados coletados (respostas do questionário) ficarão armazenados em banco de dados seguro em nuvem (Heroku), sob a responsabilidade do pesquisador, no endereço acima informado, pelo período mínimo de 5 anos após o término da pesquisa. Nada lhe será pago e nem será cobrado para participar desta pesquisa, pois a aceitação é voluntária, mas fica também garantida a indenização em casos de danos comprovadamente decorrentes da participação na pesquisa, conforme decisão judicial ou extra-judicial. Se houver necessidade, as despesas para a sua participação serão assumidas pelos pesquisadores (ressarcimento de transporte e alimentação). Em caso de dúvidas relacionadas aos aspectos éticos deste estudo, o (a) senhor (a) poderá consultar o Comitê de Ética em Pesquisa Envolvendo Seres Humanos da UFPE — Avenida da Engenharia s/n, 1º Andar, sala 4, Cidade Universitária, Recife-PE, CEP: 50740-600 — Tel.: (81) 2126-8588 — e-mail: cephumanos.ufpe@ufpe.br.",
    },
];

const usuariosSections: Section[] = [
    {
        text:
            "Convidamos o (a) Sr. (a) para participar como voluntário (a) da pesquisa GestBucalSD: AVALIAÇÃO DO USO DE PLATAFORMA WEB-BASED PARA MELHORIA DA QUALIDADE E GOVERNANÇA DOS SERVIÇOS PÚBLICOS DE SAÚDE BUCAL — Módulo 3 - Usuário, que está sob a responsabilidade da pesquisadora Nilcema Figueiredo, residente na Rua José Bonifácio, 125/1602, Madalena-Recife-PE, CEP: 50.710-435 — Telefone (81) 99975-1015 e e-mail (nilcema.figueiredo@ufpe.br) para contato do pesquisador responsável, inclusive ligações a cobrar. Também participa desta pesquisa a pesquisadora Amanda Maria Chaves — telefone para contato: (81) 99655-5073.",
    },
    {
        text:
            "Todas as suas dúvidas podem ser esclarecidas com o responsável por esta pesquisa. Apenas quando todos os esclarecimentos forem dados e você concorde com a realização do estudo, pedimos que rubrique as folhas e assine ao final deste documento, que está em duas vias. Uma via será entregue e a outra ficará com o pesquisador responsável.",
    },
    {
        text:
            "O (a) senhor (a) estará livre para decidir participar ou recusar-se. Caso não aceite participar, não haverá nenhum problema; desistir é um direito seu, bem como será possível retirar o consentimento em qualquer fase da pesquisa, também sem nenhuma penalidade.",
    },
    {
        heading: "Descrição da pesquisa e esclarecimento da participação",
        text:
            "Nessa pesquisa, vamos precisar que você realize avaliação de satisfação sobre os serviços de saúde bucal a partir da sua experiência com o estabelecimento de saúde em que tem sido atendido ou onde terminou tratamento. Para tal, você responderá formulário/questionário de avaliação de satisfação do usuário da plataforma web-based GestBucalSD (entrevista ou uso direto da plataforma). Toda coleta de dados será realizada em meio on-line, onde os entrevistadores/usuários farão cadastro na plataforma, utilizando dados pessoais (Nome, CPF, Data de Nascimento, Endereço, E-mail, Sexo e Telefone), além da criação de uma senha que será armazenada e recuperada através de criptografia ponta a ponta. Após o cadastro do módulo 4, o participante será convidado a responder a um formulário/questionário, com duração média de 8 a 10 minutos, de maneira individual. A coleta será feita de acordo com a disponibilidade e vontade do usuário, em caráter presencial ou remoto.",
    },
    {
        heading: "Riscos",
        text:
            "Os principais riscos estão relacionados ao manejo e proteção de dados, especialmente por se tratar de dados sensíveis aos usuários. Para minimizar os possíveis riscos de vazamento de dados, os dados de cadastro serão armazenados em banco de dados isolados, com senha e criptografados. Todas as respostas dos formulários serão analisadas de maneira macro e, em sua divulgação, não estarão ligadas à identidade do usuário. O usuário pode não se sentir confortável em responder algumas perguntas; para minimizar tal risco, o usuário pode optar por pedir esclarecimentos ou não as responder.",
    },
    {
        heading: "Benefícios diretos e indiretos",
        text:
            "Os benefícios diretos aos usuários são a adequação dos serviços às suas necessidades, incremento na satisfação ao longo do tempo, melhoria da qualidade dos serviços, bem como maior empoderamento técnico e político à sua atuação. Como benefícios indiretos, espera-se que os resultados da pesquisa tenham a potencialidade de aprimorar os estabelecimentos de saúde e consequente rede de atenção em saúde bucal, contribuindo também para estudos de satisfação do usuário, podendo determinar padrões e métricas de satisfação. O efeito dos serviços na satisfação do usuário é considerado avaliação de resultados, com o poder de auxiliar a tomada de decisão evidenciando a ótica do usuário e, com o uso de ferramenta eletrônica, ser ágil e oportuno para governança inteligente.",
    },
    {
        heading: "Confidencialidade e contato",
        text:
            "Esclarecemos que os participantes dessa pesquisa têm plena liberdade de se recusar a participar do estudo e que esta decisão não acarretará penalização por parte dos pesquisadores. Todas as informações desta pesquisa serão confidenciais e serão divulgadas apenas em eventos ou publicações científicas, não havendo identificação dos voluntários, a não ser entre os responsáveis pelo estudo, sendo assegurado o sigilo sobre a sua participação. Os dados coletados (respostas do questionário) ficarão armazenados em banco de dados seguro em nuvem (Heroku), sob a responsabilidade do pesquisador, no endereço acima informado, pelo período mínimo de 5 anos após o término da pesquisa. Nada lhe será pago e nem será cobrado para participar desta pesquisa, pois a aceitação é voluntária, mas fica também garantida a indenização em casos de danos comprovadamente decorrentes da participação na pesquisa, conforme decisão judicial ou extra-judicial. Se houver necessidade, as despesas para a sua participação serão assumidas pelos pesquisadores (ressarcimento de transporte e alimentação). Em caso de dúvidas relacionadas aos aspectos éticos deste estudo, o (a) senhor (a) poderá consultar o Comitê de Ética em Pesquisa Envolvendo Seres Humanos da UFPE — Avenida da Engenharia s/n, 1º Andar, sala 4, Cidade Universitária, Recife-PE, CEP: 50740-600 — Tel.: (81) 2126-8588 — e-mail: cephumanos.ufpe@ufpe.br.",
    },
];

function TcleContent({ subtitle, sections }: { subtitle: string; sections: Section[] }) {
    return (
        <div>
            <div className="mb-6 pb-5" style={{ borderBottom: "1px solid #e7e5e4" }}>
                <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-gb-primary mb-2">
                    {subtitle}
                </span>
                <h2 className="font-display text-[22px] sm:text-[26px] font-bold text-gb-text leading-tight tracking-tight">
                    Termo de Consentimento Livre e Esclarecido
                </h2>
            </div>

            <div className="space-y-5">
                {sections.map((s, i) => (
                    <div key={i}>
                        {s.heading && (
                            <h3 className="text-[11px] font-bold tracking-widest uppercase text-gb-label mb-2">
                                {s.heading}
                            </h3>
                        )}
                        <p className="text-[14.5px] text-gb-text leading-relaxed text-justify" style={{ textIndent: "1.5rem" }}>
                            {s.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Index() {
    const [value, setValue] = React.useState(0);

    const tabs = [
        { label: "Profissionais", subtitle: "Módulos 1, 2 e 3 — Profissionais", sections: profissionaisSections },
        { label: "Usuários", subtitle: "Módulo 3 — Usuários", sections: usuariosSections },
    ];

    return (
        <div className="bg-[#f5f5f4] min-h-[88vh] pt-20 sm:pt-24 pb-12 px-4">
            <div className="max-w-[860px] mx-auto">
                {/* Page header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gb-primary mb-3">
                        <DescriptionOutlinedIcon style={{ color: "#ffffff", fontSize: 28 }} />
                    </div>
                    <h1
                        className="font-display text-[28px] sm:text-[32px] font-bold text-gb-text leading-tight tracking-tight"
                        style={{ background: "transparent" }}
                    >
                        TCLE do GestBucalSD
                    </h1>
                    <p className="text-sm text-gb-muted leading-relaxed mt-1.5 max-w-[560px] mx-auto">
                        Leia atentamente o termo correspondente ao seu perfil antes de iniciar a participação na pesquisa.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-5">
                    <div className="inline-flex p-1 rounded-xl bg-white" style={{ border: "1px solid #e7e5e4" }}>
                        {tabs.map((t, i) => {
                            const active = value === i;
                            return (
                                <button
                                    key={t.label}
                                    type="button"
                                    onClick={() => setValue(i)}
                                    style={{ border: "none", cursor: "pointer" }}
                                    className={`px-5 sm:px-8 py-2.5 rounded-lg text-[13px] font-semibold tracking-wide uppercase transition-all ${
                                        active
                                            ? "bg-gb-primary text-white"
                                            : "bg-transparent text-gb-muted hover:text-gb-text"
                                    }`}
                                >
                                    {t.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 font-body" style={{ border: "1px solid #e7e5e4" }}>
                    <TcleContent subtitle={tabs[value].subtitle} sections={tabs[value].sections} />
                </div>
            </div>
        </div>
    );
}
