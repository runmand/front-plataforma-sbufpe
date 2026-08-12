import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { theme } from "src/core/theme";
import {
  studentTeamTI,
  studentsTeamGI,
  teacherTeamGI,
  teacherTeamTI,
} from "src/shared/dataBase";

/* ─── Card de membro ─────────────────────────────────────── */
const TeamMemberCard = ({ member, sx = {} }: { member: any; sx?: any }) => (
  <Card
    sx={{
      width: "100%",
      maxWidth: 380,
      borderRadius: 4,
      backgroundColor: "#ffffff",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 8px 28px rgba(0, 0, 0, 0.12)",
      },
      ...sx,
    }}
  >
    <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
        {/* Foto */}
        <Avatar
          alt={member.name}
          src={member.photo}
          variant="rounded"
          sx={{ width: 88, height: 88, borderRadius: 3, flexShrink: 0 }}
        />

        {/* Conteúdo */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: theme.secundaryColor,
              fontSize: "1.05rem",
              lineHeight: 1.3,
              mb: 1,
            }}
          >
            {member.name}
          </Typography>

          <Chip
            label={member.role}
            size="small"
            sx={{
              backgroundColor: "#fde8ea",
              color: theme.primaryColor,
              fontWeight: 600,
              fontSize: "0.8rem",
              borderRadius: "20px",
              height: 28,
              mb: 1,
            }}
          />

          {/* Botões de contato */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {member.contacts.map((contact: any) => (
              <Box
                key={contact.id}
                component="button"
                onClick={() => window.open(contact.url, "_blank")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  px: 1.5,
                  py: 0.6,
                  border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: "20px",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor:
                      contact.id === "linked-in" ? "#0077b5" : theme.primaryColor,
                    borderColor: "transparent",
                    "& .contact-icon, & .contact-label": { color: "#fff" },
                  },
                }}
              >
                {contact.id === "linked-in" ? (
                  <LinkedInIcon
                    className="contact-icon"
                    sx={{ fontSize: 18, color: "#0077b5" }}
                  />
                ) : (
                  <AccountCircleIcon
                    className="contact-icon"
                    sx={{ fontSize: 18, color: theme.primaryColor }}
                  />
                )}
                <Typography
                  className="contact-label"
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    color: "rgba(0,0,0,0.5)",
                    lineHeight: 1,
                  }}
                >
                  {contact.id === "linked-in" ? "LINKEDIN" : "LATTES"}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

/* ─── Cabeçalho de sub-seção (Docentes / Discentes) ─────── */
const SectionLabel = ({
  label,
  accent = theme.primaryColor,
}: {
  label: string;
  accent?: string;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      mb: 3,
    }}
  >
    <Box sx={{ flex: 1, height: "1px", backgroundColor: "rgba(0,0,0,0.08)" }} />
    <Chip
      label={label}
      sx={{
        backgroundColor: accent,
        color: "#fff",
        fontWeight: 700,
        fontSize: "0.78rem",
        letterSpacing: "0.06em",
        borderRadius: "20px",
        height: 30,
        px: 1,
      }}
    />
    <Box sx={{ flex: 1, height: "1px", backgroundColor: "rgba(0,0,0,0.08)" }} />
  </Box>
);

/* ─── Bloco de sub-seção ─────────────────────────────────── */
const TeamSection = ({
  label,
  members,
  accent = theme.primaryColor,
}: {
  label: string;
  members: any[];
  accent?: string;
}) => (
  <Box sx={{ mb: 5 }}>
    <SectionLabel label={label} accent={accent} />

    <Grid container spacing={2.5} sx={{ justifyContent: "center" }}>
      {members.map((member: any, index: number) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={index}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <TeamMemberCard member={member} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

/* ─── Cabeçalho de grupo (GI / TI) ──────────────────────── */
const GroupHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <Box sx={{ textAlign: "center", mb: 5 }}>
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.5,
        mb: 1.5,
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 3,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secundaryColor})`,
        }}
      />
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: { xs: "1.4rem", md: "1.75rem" },
          color: theme.primaryColor,
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: 32,
          height: 3,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${theme.secundaryColor}, ${theme.primaryColor})`,
        }}
      />
    </Box>

    {subtitle && (
      <Typography
        sx={{
          color: "rgba(0,0,0,0.45)",
          fontSize: "0.95rem",
          fontWeight: 500,
        }}
      >
        {subtitle}
      </Typography>
    )}
  </Box>
);

/* ─── Divisor entre grupos ───────────────────────────────── */
const GroupDivider = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      my: 7,
    }}
  >
    <Box sx={{ flex: 1, height: "1px", backgroundColor: "rgba(0,0,0,0.07)" }} />
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: theme.primaryColor,
        opacity: 0.3,
      }}
    />
    <Box
      sx={{
        width: 5,
        height: 5,
        borderRadius: "50%",
        backgroundColor: theme.primaryColor,
        opacity: 0.2,
      }}
    />
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: theme.primaryColor,
        opacity: 0.3,
      }}
    />
    <Box sx={{ flex: 1, height: "1px", backgroundColor: "rgba(0,0,0,0.07)" }} />
  </Box>
);

/* ─── Página principal ───────────────────────────────────── */
export default function Index() {
  return (
    <Box
      sx={{
        background: "#f5f5f4",
        marginTop: "5rem",
        paddingTop: { xs: "3rem", md: "4rem" },
        paddingBottom: "5rem",
        minHeight: "88vh",
      }}
    >
      <Container maxWidth="lg">
        {/* ── Hero ── */}
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Typography
            sx={{
              fontWeight: 800,
              color: theme.primaryColor,
              fontSize: { xs: "2.2rem", sm: "3rem", md: "3.5rem" },
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            Nossa Equipe
          </Typography>

          <Box
            sx={{
              width: 56,
              height: 3,
              background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secundaryColor})`,
              mx: "auto",
              mb: 2.5,
              borderRadius: 2,
            }}
          />

          <Typography
            sx={{
              color: "rgba(0,0,0,0.5)",
              maxWidth: 580,
              mx: "auto",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              fontWeight: 400,
              lineHeight: 1.7,
            }}
          >
            Profissionais dedicados ao desenvolvimento e pesquisa em saúde
            bucal, trabalhando juntos para inovar e transformar o cuidado
            odontológico.
          </Typography>
        </Box>

        {/* ── Equipe de Gestão da Informação ── */}
        <GroupHeader
          title="Equipe de Gestão da Informação"
          subtitle="Conduzem a pesquisa-ação"
        />

        <TeamSection label="Docentes" members={teacherTeamGI} />
        <TeamSection
          label="Discentes"
          members={studentsTeamGI}
          accent={theme.secundaryColor}
        />

        <GroupDivider />

        {/* ── Equipe de Tecnologia da Informação ── */}
        <GroupHeader
          title="Equipe de Tecnologia da Informação"
          subtitle="Atuam no desenvolvimento da plataforma e suporte técnico à execução da pesquisa"
        />

        <TeamSection label="Docentes" members={teacherTeamTI} />
        <TeamSection
          label="Discentes"
          members={studentTeamTI}
          accent={theme.secundaryColor}
        />
      </Container>
    </Box>
  );
}
