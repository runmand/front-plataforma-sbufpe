import { useMemo, useState } from "react";
import { Box, Link, Typography } from "@mui/material";
import Card from "../card/index";
import { acervo } from "src/shared/dataBase";

const fontFamily =
  "'Nimbus Sans', 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif";

type Category = "ESTUDO" | "ARTIGO" | "DIRETRIZ";

const diretrizKeywords = [
  "portaria",
  "política nacional",
  "politica nacional",
  "programa nacional",
  "manual",
  "caderno de atenção",
  "caderno de atencao",
  "diretrizes",
  "diretriz",
  "recomendação",
  "recomendacao",
  "resolução",
  "resolucao",
  "brasil sorridente",
  "matriz avaliativa",
  "protocolo",
  "linha de cuidado",
  "pccs",
  "plano nacional",
  "guia política",
  "guia politica",
  "nota técnica",
  "nota tecnica",
];

const scientificDomains = [
  "scielo",
  "scielosp",
  "nature.com",
  "ncbi.nlm.nih.gov",
  "sciencedirect",
  "liebertpub",
  "sagepub",
  "oup.com",
  "academic.oup",
  "europepmc",
  "magonline",
  "redalyc",
  "doi.org",
  "wiley",
  "researchgate",
  "pubmed",
  "dialnet",
  "ajph",
  "periodicojs",
  "revistaseletronicas",
  "revabeno",
  "rbmfc",
  "frontiersin",
  "tandfonline",
  "lww.com",
  "journals.",
  "core.ac.uk",
  "onlinelibrary",
];

const directiveStarts =
  /^\s*(define|institui|dispõe|dispoe|regulamenta|aprova|estabelece|cria)\b/i;

const studyStarts =
  /^\s*(curso|cursos|material de apoio|treinamento|residência|residencia|mestrado|doutorado)\b/i;

function getCategory(item: {
  article: string | null;
  author: string | null;
  link: string | null;
}): Category {
  const articleRaw = item.article || "";
  const article = articleRaw.toLowerCase();
  const author = (item.author || "").toLowerCase();
  const link = (item.link || "").toLowerCase();

  if (studyStarts.test(articleRaw)) return "ESTUDO";

  const matchesDiretriz =
    diretrizKeywords.some((kw) => article.includes(kw)) ||
    directiveStarts.test(articleRaw);

  if (matchesDiretriz) return "DIRETRIZ";

  const isInstitutionalAuthor =
    author.includes("ministério da saúde") ||
    author.includes("ministerio da saude") ||
    author.includes("world health organization") ||
    author.includes("organização mundial") ||
    /^\s*brasil\b/.test(author);

  const isScientificLink = scientificDomains.some((d) => link.includes(d));

  if (isInstitutionalAuthor && !isScientificLink) return "DIRETRIZ";

  if (isScientificLink) return "ARTIGO";

  return "ESTUDO";
}

const acervoCategorized = acervo.map((item) => ({
  ...item,
  category: getCategory(item),
}));

const categories: { value: "" | Category; label: string }[] = [
  { value: "", label: "TUDO" },
  { value: "ESTUDO", label: "ESTUDOS" },
  { value: "ARTIGO", label: "ARTIGOS" },
  { value: "DIRETRIZ", label: "DIRETRIZES" },
];

export default function Index() {
  const [categoryFilter, setCategoryFilter] = useState<"" | Category>("");
  const [searchText, setSearchText] = useState<string>("");

  const categoriesWithCount = useMemo(
    () =>
      categories.map((c) => ({
        ...c,
        count:
          c.value === ""
            ? acervoCategorized.length
            : acervoCategorized.filter((a) => a.category === c.value).length,
      })),
    []
  );

  const newAcervo = useMemo(() => {
    const text = searchText.trim().toLowerCase();
    return acervoCategorized
      .filter((a) =>
        categoryFilter === "" ? true : a.category === categoryFilter
      )
      .filter((a) =>
        text === ""
          ? true
          : (a.article || "").toLowerCase().includes(text) ||
            (a.author || "").toLowerCase().includes(text)
      );
  }, [categoryFilter, searchText]);

  return (
    <Box
      sx={{
        background: "#FFFFFF",
        marginTop: "68px",
        paddingTop: "25px",
        minHeight: "88vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
          padding: "0 32px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Breadcrumb: FONTES / REFERÊNCIAS */}
        <Box>
          <Typography
            component="span"
            sx={{
              fontFamily,
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0.6px",
              textTransform: "uppercase",
              color: "#8B1E24",
            }}
          >
            FONTES
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily,
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0.6px",
              color: "#8B1E24",
              mx: "8px",
            }}
          >
            /
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily,
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0.6px",
              textTransform: "uppercase",
              color: "#9CA3AF",
            }}
          >
            REFERÊNCIAS
          </Typography>
        </Box>

        {/* Título + subtítulo */}
        <Box>
          <Typography
            sx={{
              fontFamily,
              fontWeight: 700,
              fontSize: "36px",
              lineHeight: "40px",
              color: "#2D2D2D",
              marginBottom: "8px",
            }}
          >
            Referências
          </Typography>
          <Typography
            sx={{
              fontFamily,
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#666666",
              maxWidth: "640px",
            }}
          >
            Abaixo, apresentamos todos os estudos, artigos e diretrizes que
            fundamentam as informações e recomendações presentes em nossa
            plataforma.
          </Typography>
        </Box>

        {/* Filtros + busca */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "center" },
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {categoriesWithCount.map((c) => {
              const isActive = categoryFilter === c.value;
              return (
                <button
                  key={c.value || "all"}
                  onClick={() => setCategoryFilter(c.value)}
                  style={{
                    fontFamily,
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    textAlign: "center",
                    padding: isActive ? "9px 24px" : "8px 24px",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    transition:
                      "background-color 0.2s, color 0.2s, border-color 0.2s",
                    background: isActive ? "#8B1E24" : "#FFFFFF",
                    color: isActive ? "#FFFFFF" : "#666666",
                    border: isActive ? "none" : "1px solid #E5E7EB",
                  }}
                >
                  {c.label}
                  {c.value !== "" && ` (${c.count})`}
                </button>
              );
            })}
          </Box>

          <Box
            component="label"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "13px",
              width: { xs: "100%", md: "320px" },
              height: "38px",
              boxSizing: "border-box",
              padding: "0 16px",
              borderRadius: "9999px",
              border: "1px solid #E5E7EB",
              background: "#FFFFFF",
              cursor: "text",
            }}
          >
            <Box
              component="span"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "16px",
                height: "16px",
                flexShrink: 0,
                lineHeight: 0,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20L16.5 16.5" />
              </svg>
            </Box>
            <Box
              component="input"
              type="text"
              placeholder="Pesquisar referências..."
              value={searchText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchText(e.target.value)
              }
              sx={{
                flex: 1,
                minWidth: 0,
                height: "20px",
                padding: 0,
                margin: 0,
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily,
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#2D2D2D",
                "&::placeholder": {
                  color: "#6B7280",
                  opacity: 1,
                  fontFamily,
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Cards */}
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
          marginTop: "48px",
          padding: "0 32px 48px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: "24px",
          }}
        >
          {newAcervo.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              target="_blank"
              underline="none"
              sx={{ display: "block", height: "100%" }}
            >
              <Card
                badge={item.category}
                article={item.article}
                author={item.author}
              />
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
