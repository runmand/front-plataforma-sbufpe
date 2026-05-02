import { Modal } from "@mui/material";
import React, { useEffect } from "react";
import { TPROPS } from "./type";
import { theme } from "src/core/theme";

const PRIMARY = '#6D141A';
const ff = "'Source Sans 3', -apple-system, sans-serif";

export default function FormResultFeedBack(props: TPROPS) {
  useEffect(() => {
    localStorage.setItem("lastFormSubmited", props.formId + "");
  }, [props.formId]);

  return (
    <Modal
      open={props.isOpen}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.blur,
        transition: "0.6s",
      }}
      onClose={() => {
        if (props.canSkip) props.onClose();
      }}
    >
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '440px',
        margin: '0 16px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        outline: 'none',
      }}>

        {/* Header */}
        <div style={{
          backgroundColor: PRIMARY,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 700,
            fontFamily: ff,
            letterSpacing: '0.01em',
          }}>
            Formulário finalizado
          </span>
          <button
            onClick={() => props.onClose()}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '16px',
              lineHeight: 1,
              padding: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{
          padding: '40px 32px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
          {/* Ícone de sucesso */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#f0fdf4',
            border: '2px solid #86efac',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: ff,
              fontSize: '1.2rem',
              fontWeight: 700,
              color: PRIMARY,
              margin: '0 0 6px',
              letterSpacing: '0.02em',
            }}>
              Agradecemos a sua resposta!
            </p>
            <p style={{
              fontFamily: ff,
              fontSize: '0.9rem',
              color: '#6b7280',
              margin: 0,
              lineHeight: 1.5,
            }}>
              Suas respostas foram registradas com sucesso.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '0 32px 24px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <button
            onClick={() => props.onClose()}
            style={{
              backgroundColor: PRIMARY,
              color: '#fff',
              border: 'none',
              borderRadius: '30px',
              padding: '10px 32px',
              fontSize: '0.95rem',
              fontWeight: 600,
              fontFamily: ff,
              cursor: 'pointer',
              transition: 'background-color 200ms',
              boxShadow: '0 4px 12px rgba(109,20,26,0.25)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#921c22'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = PRIMARY; }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
}


