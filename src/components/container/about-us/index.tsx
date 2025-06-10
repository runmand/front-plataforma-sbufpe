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
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { theme } from "src/core/theme";
import {
  studentTeamTI,
  studentsTeamGI,
  teacherTeamGI,
  teacherTeamTI,
} from "src/shared/dataBase";

const TeamMemberCard = ({ member, sx = {} }: { member: any; sx?: any }) => (
  <Card
    sx={{
      maxWidth: 350,
      width: "100%",
      height: "auto",
      borderRadius: 4,
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
    <CardContent sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Avatar
          alt={member.name}
          src={member.photo}
          sx={{
            width: 96,
            height: 96,
            border: `3px solid ${theme.primaryColor}`,
            boxShadow: `0 4px 16px ${theme.primaryColor}20`,
          }}
        />

        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.secundaryColor,
              mb: 1.5,
              fontSize: "1.2rem",
              lineHeight: 1.3,
            }}
          >
            {member.name}
          </Typography>

          <Chip
            label={member.role}
            sx={{
              backgroundColor: theme.primaryColor,
              color: theme.white,
              fontWeight: 500,
              fontSize: "0.85rem",
              borderRadius: 2,
              px: 2,
              py: 1,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          {member.contacts.map((contact: any) => (
            <IconButton
              key={contact.id}
              size="medium"
              onClick={() => window.open(contact.url, "_blank")}
              sx={{
                width: 44,
                height: 44,
                backgroundColor: `${theme.primaryColor}10`,
                color: theme.primaryColor,
                borderRadius: 2,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: theme.primaryColor,
                  color: theme.white,
                },
              }}
            >
              {contact.id === "linked-in" ? (
                <LinkedInIcon />
              ) : (
                <AccountCircleIcon />
              )}
            </IconButton>
          ))}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const TeamSection = ({
  title,
  subtitle,
  members,
  bgColor = theme.primaryColor,
}: {
  title: string;
  subtitle?: string;
  members: any[];
  bgColor?: string;
}) => (
  <Box sx={{ mb: 8 }}>
    <Box
      sx={{
        background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}dd 100%)`,
        borderRadius: 3,
        py: 3,
        px: 4,
        mb: 5,
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(109, 20, 26, 0.15)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: theme.white,
          fontWeight: 700,
          mb: subtitle ? 1 : 0,
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: theme.white,
            opacity: 0.95,
            fontSize: "1.1rem",
            fontWeight: 400,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>

    <Grid
      container
      spacing={4}
      sx={{
        justifyContent: "center",
        px: { xs: 2, md: 0 },
      }}
    >
      {members.map((member: any, index: number) => (
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
          <TeamMemberCard member={member} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default function Index() {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
            Nossa Equipe
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
            Profissionais dedicados ao desenvolvimento e pesquisa em saúde
            bucal, trabalhando juntos para inovar e transformar o cuidado
            odontológico
          </Typography>
        </Box>

        <Box
          sx={{
            width: 60,
            height: 4,
            background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secundaryColor})`,
            mx: "auto",
            mb: 3,
            mt: 15,
            borderRadius: 2,
          }}
        />
        <Box sx={{ mb: 10 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              sx={{
                color: theme.primaryColor,
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Equipe de Gestão da Informação
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: theme.primaryColor,
                opacity: 0.8,
                fontSize: "1.1rem",
                fontWeight: 500,
              }}
            >
              Conduzem a pesquisa-ação
            </Typography>
          </Box>

          <TeamSection title="Docentes" members={teacherTeamGI} />

          <TeamSection
            title="Discentes"
            members={studentsTeamGI}
            bgColor={theme.secundaryColor}
          />
        </Box>
        <Box
          sx={{
            width: 60,
            height: 4,
            background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secundaryColor})`,
            mx: "auto",
            mb: 3,
            mt: 15,
            borderRadius: 2,
          }}
        />
        <Box>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              sx={{
                color: theme.primaryColor,
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Equipe de Tecnologia da Informação
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: theme.primaryColor,
                opacity: 0.8,
                fontSize: "1.1rem",
                fontWeight: 500,
              }}
            >
              Atuam no desenvolvimento da plataforma e suporte técnico à
              execução da pesquisa
            </Typography>
          </Box>

          <TeamSection title="Docentes" members={teacherTeamTI} />

          <TeamSection
            title="Discentes"
            members={studentTeamTI}
            bgColor={theme.secundaryColor}
          />
        </Box>
      </Container>
    </Box>
  );
}
