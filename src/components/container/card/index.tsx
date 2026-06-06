import { Box } from "@mui/material";
import { TPROPS } from "./type";

const fontFamily =
  "'Nimbus Sans', 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif";

export default function Index({ badge, article, author }: TPROPS) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "185.5px",
        boxSizing: "border-box",
        padding: "24px",
        background: "#FFFFFF",
        border: "1px solid #F3F4F6",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {badge && (
        <Box
          component="span"
          sx={{
            alignSelf: "flex-start",
            padding: "2px 8px",
            background: "#FEF2F2",
            borderRadius: "4px",
            fontFamily,
            fontWeight: 700,
            fontSize: "10px",
            lineHeight: "15px",
            letterSpacing: "-0.5px",
            textTransform: "uppercase",
            color: "#8B1E24",
          }}
        >
          {badge}
        </Box>
      )}

      <Box
        sx={{
          marginTop: badge ? "15px" : 0,
          fontFamily,
          fontWeight: 700,
          fontSize: "14px",
          lineHeight: "17.5px",
          color: "#2D2D2D",
        }}
      >
        {article}
      </Box>

      <Box
        sx={{
          marginTop: "auto",
          paddingTop: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <Box
          sx={{
            fontFamily,
            fontWeight: 500,
            fontSize: "11px",
            lineHeight: "16.5px",
            color: "#9CA3AF",
            flex: 1,
            minWidth: 0,
          }}
        >
          {author}
        </Box>

        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "16px",
            height: "16px",
            flexShrink: 0,
            color: "#9CA3AF",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M14 3h7v7" />
            <path d="M10 14L21 3" />
            <path d="M21 14v7H3V3h7" />
          </svg>
        </Box>
      </Box>
    </Box>
  );
}
