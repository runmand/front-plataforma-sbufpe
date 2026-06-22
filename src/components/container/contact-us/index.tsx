import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const fontDisplay = "'Newsreader', Georgia, 'Times New Roman', serif";

const inputSx = {
  width: "100%",
  boxSizing: "border-box",
  fontFamily: fontDisplay,
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "16px",
  color: "#111827",
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "8px",
  outline: "none",
  "&::placeholder": {
    fontFamily: fontDisplay,
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "16px",
    color: "#9CA3AF",
    opacity: 1,
  },
  "&:focus": {
    borderColor: "#841A1A",
  },
};

function EnvelopeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#841A1A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6L12 13L2 6" />
    </svg>
  );
}

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
};

function FormField({
  id,
  label,
  placeholder,
  value,
  onChange,
  multiline = false,
}: FieldProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        component="label"
        htmlFor={id}
        sx={{
          display: "block",
          fontFamily: fontDisplay,
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: "0px",
          color: "#374151",
          marginBottom: "8px",
        }}
      >
        {label}
      </Box>
      <Box
        component={multiline ? "textarea" : "input"}
        id={id}
        name={id}
        required
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        sx={{
          ...inputSx,
          display: "block",
          height: multiline ? "178px" : "58px",
          padding: multiline ? "16px" : "20px 16px",
          resize: multiline ? "none" : undefined,
        }}
      />
    </Box>
  );
}

export default function Index() {
  const [name, setName] = useState("");
  const [assunto, setAssunto] = useState("");
  const [message, setMessage] = useState("");
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

  function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`Assunto - ${assunto} (De - ${name})`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:sbufpe@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <Box
      sx={{
        background: "#FAF7F2",
        marginTop: "68px",
        paddingTop: "38px",
        paddingBottom: `calc(67px + ${footerHeight}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "896px",
          boxSizing: "border-box",
          padding: "0 32px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* Card: Entre em Contato Conosco */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "896px",
            minHeight: "192px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            padding: "40px",
            borderRadius: "12px",
            border: "1px solid #F3F4F6",
            background: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "42px",
                height: "42px",
                flexShrink: 0,
                padding: "8px",
                boxSizing: "border-box",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                background: "#F9FAFB",
              }}
            >
              <EnvelopeIcon />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontFamily: fontDisplay,
                  fontWeight: 400,
                  fontSize: "36px",
                  lineHeight: "40px",
                  letterSpacing: "0px",
                  color: "#111827",
                  marginBottom: "10px",
                }}
              >
                Entre em Contato Conosco
              </Typography>
              <Typography
                sx={{
                  fontFamily: fontDisplay,
                  fontWeight: 300,
                  fontSize: "18px",
                  lineHeight: "28px",
                  letterSpacing: "0px",
                  color: "#6B7280",
                }}
              >
                Fale conosco para mais informações
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "2px",
              borderTop: "1px solid #841A1A",
            }}
          />
        </Box>

        {/* Card: Formulário */}
        <Box
          component="form"
          onSubmit={sendEmail}
          sx={{
            width: "100%",
            maxWidth: "896px",
            minHeight: "648px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            padding: "40px 40px 56px",
            borderRadius: "12px",
            border: "1px solid #F3F4F6",
            background: "#FFFFFF",
          }}
        >
          <FormField
            id="nome"
            label="Nome"
            placeholder="Digite seu nome aqui"
            value={name}
            onChange={setName}
          />
          <FormField
            id="motivo"
            label="Motivo do Contato"
            placeholder="Digite o motivo do contato"
            value={assunto}
            onChange={setAssunto}
          />
          <FormField
            id="mensagem"
            label="Mensagem"
            placeholder="Insira sua mensagem aqui"
            value={message}
            onChange={setMessage}
            multiline
          />

          <Box
            component="button"
            type="submit"
            sx={{
              width: "100%",
              height: "60px",
              marginTop: "auto",
              padding: "16px 0",
              boxSizing: "border-box",
              border: "none",
              borderRadius: "8px",
              background: "#841A1A",
              cursor: "pointer",
              fontFamily: fontDisplay,
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "28px",
              letterSpacing: "1.8px",
              textAlign: "center",
              textTransform: "uppercase",
              color: "#FFFFFF",
              transition: "background-color 0.2s",
              "&:hover": {
                background: "#6D141A",
              },
            }}
          >
            Enviar
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
