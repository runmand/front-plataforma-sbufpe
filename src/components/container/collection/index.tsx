import { useEffect, useMemo, useState } from "react";
import { Box, Link, Pagination, Typography } from "@mui/material";
import Card from "../card/index";
import { acervo } from "src/shared/dataBase";

const fontFamily =
  "'Nimbus Sans', 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif";

const PAGE_SIZE = 12;

export default function Index() {
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [footerHeight, setFooterHeight] = useState<number>(44);

  useEffect(() => {
    const measure = () => {
      const footer = document.querySelector("footer");
      if (footer) setFooterHeight(footer.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const filteredAcervo = useMemo(() => {
    const text = searchText.trim().toLowerCase();
    if (text === "") return acervo;
    return acervo.filter(
      (a) =>
        (a.article || "").toLowerCase().includes(text) ||
        (a.author || "").toLowerCase().includes(text)
    );
  }, [searchText]);

  const totalPages = Math.max(1, Math.ceil(filteredAcervo.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAcervo.slice(start, start + PAGE_SIZE);
  }, [filteredAcervo, currentPage]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPage(1);
  };

  const goToPage = (next: number) => {
    setPage(Math.min(Math.max(1, next), totalPages));
  };

  return (
    <Box
      sx={{
        background: "#FFFFFF",
        marginTop: "68px",
        paddingTop: "25px",
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
            Abaixo, apresentamos os estudos, artigos e diretrizes que fundamentam
            as informações e recomendações presentes em nossa plataforma.
          </Typography>
        </Box>

        {/* Busca — alinhada à esquerda, abaixo do subtítulo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "16px",
          }}
        >
          <Box
            component="label"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "13px",
              width: { xs: "100%", sm: "320px" },
              maxWidth: "100%",
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
                handleSearch(e.target.value)
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
          padding: `0 32px calc(48px + ${footerHeight}px)`,
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
          {pageItems.map((item, index) => (
            <Link
              key={`${currentPage}-${index}`}
              href={item.link}
              target="_blank"
              underline="none"
              sx={{ display: "block", height: "100%" }}
            >
              <Card
                badge={item.type}
                article={item.article}
                author={item.author}
              />
            </Link>
          ))}
        </Box>

        {totalPages > 1 && (
          <Box
            sx={{
              marginTop: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pagination
              page={currentPage}
              count={totalPages}
              onChange={(_, next) => goToPage(next)}
              siblingCount={1}
              boundaryCount={1}
              sx={{
                "& .MuiPagination-ul": {
                  gap: "8px",
                },
                "& .MuiPaginationItem-root": {
                  width: "40px",
                  height: "40px",
                  margin: 0,
                  borderRadius: "4px",
                  border: "1px solid #E5E7EB",
                  fontFamily,
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0px",
                  color: "#666666",
                  "&:hover": {
                    backgroundColor: "#F9FAFB",
                  },
                },
                "& .MuiPaginationItem-ellipsis": {
                  border: "none",
                  color: "#666666",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#8B1E24",
                  border: "none",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#8B1E24",
                  },
                },
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
