import {
  Box,
  Button,
  Card as MuiCard,
  CardContent,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import { theme } from "src/core/theme";
import { acervo } from "src/shared/dataBase";

const ReferenceCard = ({
  article,
  author,
  type,
  sx = {},
}: {
  article: string;
  author: string;
  type: string;
  sx?: any;
}) => (
  <MuiCard
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 3,
      backgroundColor: "#ffffff",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      transition: "transform 0.2s ease",
      "&:hover": {
        transform: "translateY(-8px)",
      },
      ...sx,
    }}
  >
    <CardContent sx={{ p: 3, flexGrow: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
        }}
      >
        <Chip
          label={type}
          size="small"
          sx={{
            backgroundColor: theme.primaryColor,
            color: theme.white,
            fontWeight: 500,
            fontSize: "0.75rem",
            borderRadius: 2,
            alignSelf: "flex-start",
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.secundaryColor,
            fontSize: "1.1rem",
            lineHeight: 1.3,
            flexGrow: 1,
          }}
        >
          {article}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: theme.black,
            opacity: 0.8,
            fontSize: "0.9rem",
            fontStyle: "italic",
          }}
        >
          {author}
        </Typography>
      </Box>
    </CardContent>
  </MuiCard>
);

export default function ReferencesPage() {
  const [searchFilter, setSearchFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredAcervo = acervo.filter((item) => {
    const matchesFilter =
      searchFilter === "" || item.type.includes(searchFilter);
    const matchesSearchTerm =
      searchTerm === "" ||
      item.article.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearchTerm;
  });

  const totalPages = Math.ceil(filteredAcervo.length / itemsPerPage);
  const currentItems = filteredAcervo.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchFilter("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.greyLight} 0%, #f8f9fa 100%)`,
        marginTop: "5rem",
        paddingTop: isMobile ? "3rem" : "4rem",
        paddingBottom: "4rem",
        minHeight: "88vh",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            sx={{
              color: theme.primaryColor,
              fontWeight: 800,
              mb: 3,
              background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secundaryColor})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              lineHeight: 1.2,
            }}
          >
            Acervo de Referências
          </Typography>

          <Box
            sx={{
              width: 80,
              height: 4,
              background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secundaryColor})`,
              mx: "auto",
              mb: 3,
              borderRadius: 2,
            }}
          />

          <Typography
            variant="h6"
            sx={{
              color: theme.primaryColor,
              opacity: 0.85,
              maxWidth: 700,
              mx: "auto",
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Explore nossa coleção de artigos, pesquisas e publicações relevantes
            para saúde bucal e gestão em saúde
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            mb: 6,
            p: 3,
            backgroundColor: theme.white,
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="filter-label" sx={{ color: theme.primaryColor }}>
              Filtrar por Tipo
            </InputLabel>
            <Select
              labelId="filter-label"
              value={searchFilter}
              onChange={handleFilterChange}
              label="Filtrar por Tipo"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.primaryColor,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.primaryColor,
                },
              }}
            >
              <MenuItem value="">Todas as Referências</MenuItem>
              <MenuItem value={"CEO-PARAÍBA"}>CEO-PARAÍBA</MenuItem>
              <MenuItem value={"Avaliação CEO"}>Avaliação CEO</MenuItem>
              <MenuItem value={"Avaliação da APS"}>Avaliação APS</MenuItem>
              <MenuItem value={"Planeja SD"}>Planeja SD</MenuItem>
              <MenuItem value={"Epidemiologia"}>Epidemiologia</MenuItem>
              <MenuItem value={"Satisfação do Usuário"}>
                Satisfação do Usuário
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Buscar por título ou autor"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchTermChange}
            sx={{
              minWidth: 250,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.primaryColor,
                },
                "&:hover fieldset": {
                  borderColor: theme.primaryColor,
                },
              },
            }}
          />

          <Button
            onClick={handleClearFilters}
            variant="outlined"
            sx={{
              color: theme.primaryColor,
              borderColor: theme.primaryColor,
              "&:hover": {
                backgroundColor: `${theme.primaryColor}10`,
                borderColor: theme.primaryColor,
              },
            }}
          >
            Limpar Filtros
          </Button>
        </Box>

        {filteredAcervo.length > 0 ? (
          <>
            <Grid
              container
              spacing={4}
              sx={{
                justifyContent: "center",
                px: { xs: 2, md: 0 },
              }}
            >
              {currentItems.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    href={item.link}
                    target="_blank"
                    underline="none"
                    sx={{ width: "100%" }}
                  >
                    <ReferenceCard
                      article={item.article}
                      author={item.author}
                      type={item.type}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 4,
                  mb: 2,
                  width: "100%",
                  px: isMobile ? 2 : 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    overflow: "auto",
                    "@media screen and (max-width: 816px)": {
                      "& ul li": {
                        width: "100%",
                      },
                    },
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    siblingCount={isMobile ? 0 : 1}
                    boundaryCount={1}
                    sx={{
                      minWidth: "fit-content",
                      "& .MuiPagination-ul": {
                        flexWrap: "nowrap",
                        justifyContent: "center",
                        gap: isMobile ? "2px" : "4px",
                      },
                      "& .MuiPaginationItem-root": {
                        color: theme.primaryColor,
                        minWidth: isMobile ? "28px" : "32px",
                        height: isMobile ? "28px" : "32px",
                        fontSize: isMobile ? "0.75rem" : "0.875rem",
                        margin: 0,
                        borderRadius: "6px",
                        "&:hover": {
                          backgroundColor: `${theme.primaryColor}15`,
                        },
                      },
                      "& .Mui-selected": {
                        backgroundColor: theme.primaryColor + " !important",
                        color: "#fff !important",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: theme.primaryColor + " !important",
                        },
                      },
                      "& .MuiPaginationItem-ellipsis": {
                        height: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    px: 2,
                    py: 1,
                    color: theme.primaryColor,
                    fontWeight: 500,
                    display: isMobile ? "block" : "none",
                    backgroundColor: `${theme.primaryColor}10`,
                    borderRadius: 2,
                    fontSize: "0.75rem",
                    textAlign: "center",
                  }}
                >
                  Página {currentPage} de {totalPages}
                </Typography>
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              p: 6,
              backgroundColor: theme.white,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: theme.primaryColor,
                fontWeight: 600,
                mb: 2,
              }}
            >
              Nenhuma referência encontrada
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.black,
                opacity: 0.7,
              }}
            >
              Tente ajustar seus filtros de busca
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
