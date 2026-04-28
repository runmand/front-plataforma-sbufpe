import React, { useEffect } from "react";
import { TPROPS } from "./type";
import { ResultFormPdf } from "@components/FormResultPdf";
import { useRouter } from 'next/router';
import { pdf } from "@react-pdf/renderer";
import { routerEnum, containerBodyTypeEnum } from "src/core/enums";

const ff = { display: "'Lora', Georgia, serif", body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif" };
const C = { primary: '#6D141A', secondary: '#921c22', text: '#1c1917', muted: '#78716c', border: '#e7e5e4', borderLight: '#f5f5f4', white: '#fff', bg: '#FAF7F2' };

export default function Index(props: TPROPS) {
  const router = useRouter();

  async function downloadPdf() {
    const localStorageAnswer = localStorage.getItem("selectedAnswer");
    const blob = await pdf(
      <ResultFormPdf
        domainList={props.formResult.domainList}
        maxScore={props.formResult.maxScore}
        score={props.formResult.score}
        date={new Date(props.formResult.date)}
        answer={JSON.parse(localStorageAnswer)}
        formTitle={props.formTitle}
      />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = new Date() + "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const handleQuestion = () => {
    router.push({ pathname: routerEnum.INITIAL, query: { containerBody: containerBodyTypeEnum.COLLECTION } });
  };

  useEffect(() => {
    localStorage.setItem("lastFormSubmited", props.formId + "");
  }, [props.formId]);

  if (!props.isOpen) return null;

  const dateStr = new Date(props.formResult.date).toLocaleDateString("pt-BR");
  const pct = props.formResult.maxScore > 0 ? Math.round((props.formResult.score / props.formResult.maxScore) * 100) : 0;

  return (
    <>
      <style>{`@keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>

      {/* Overlay */}
      <div
        onClick={() => { if (props.canSkip) props.onClose(); }}
        style={{ position: 'fixed', inset: 0, zIndex: 1200, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
      >
        {/* Card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ background: C.white, borderRadius: '20px', width: '100%', maxWidth: '600px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 64px rgba(0,0,0,0.18)', animation: 'fadeInScale 0.22s cubic-bezier(0.4,0,0.2,1)', overflow: 'hidden' }}
        >
          {/* Header */}
          <div style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div>
              <p style={{ fontFamily: ff.body, fontSize: '11px', color: 'rgba(255,255,255,0.6)', margin: '0 0 2px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Resultado</p>
              <h2 style={{ fontFamily: ff.display, fontSize: '17px', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.3 }}>
                {props.formTitle} — {dateStr}
              </h2>
            </div>
            <button
              onClick={() => props.onClose()}
              style={{ border: 'none', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', cursor: 'pointer', padding: '6px', display: 'flex', color: '#fff', transition: 'background 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Scores */}
          <div style={{ padding: '24px 24px 0', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Pontuação Máxima', value: `${props.formResult.maxScore} pts` },
                { label: 'Pontuação Atingida', value: `${props.formResult.score} pts` },
              ].map(({ label, value }) => (
                <div key={label} style={{ flex: 1, background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: '12px', padding: '14px 16px' }}>
                  <p style={{ fontFamily: ff.body, fontSize: '11px', color: C.muted, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</p>
                  <p style={{ fontFamily: ff.display, fontSize: '22px', fontWeight: 700, color: C.primary, margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ height: '6px', background: C.borderLight, borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`, borderRadius: '3px', transition: 'width 0.6s ease' }} />
              </div>
              <p style={{ fontFamily: ff.body, fontSize: '12px', color: C.muted, margin: '4px 0 0', textAlign: 'right' }}>{pct}% do total</p>
            </div>

            {/* Link referências */}
            <button
              onClick={handleQuestion}
              style={{ width: '100%', padding: '12px', border: `1.5px solid ${C.border}`, borderRadius: '10px', background: C.white, cursor: 'pointer', fontFamily: ff.body, fontSize: '13px', fontWeight: 600, color: C.primary, textAlign: 'center', marginBottom: '16px', transition: 'all 0.15s', letterSpacing: '0.04em' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.bg; e.currentTarget.style.borderColor = C.primary; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.white; e.currentTarget.style.borderColor = C.border; }}
            >
              Acesse as referências em nosso acervo →
            </button>
          </div>

          {/* Domain list */}
          {props.formResult.domainList.length > 0 && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px', borderTop: `1px solid ${C.border}` }}>
              {props.formResult.domainList.map((domain, i) => (
                <div key={i} style={{ paddingTop: '20px', paddingBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ width: '4px', height: '18px', background: `linear-gradient(180deg, ${C.primary}, ${C.secondary})`, borderRadius: '2px', flexShrink: 0 }} />
                    <p style={{ fontFamily: ff.display, fontSize: '15px', fontWeight: 700, color: C.text, margin: 0 }}>{domain.name}</p>
                  </div>
                  {domain.questionList.map((q, j) => (
                    <div key={j} style={{ paddingLeft: '12px', marginBottom: '14px', borderLeft: `2px solid ${C.borderLight}` }}>
                      <p style={{ fontFamily: ff.body, fontSize: '14px', fontWeight: 600, color: C.text, margin: '0 0 4px' }}>{q.title}</p>
                      <p style={{ fontFamily: ff.body, fontSize: '13px', color: C.muted, margin: 0, lineHeight: 1.5 }}>{q.recommendationMessage}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Footer actions */}
          <div style={{ padding: '16px 24px', borderTop: `1px solid ${C.border}`, display: 'flex', gap: '10px', justifyContent: 'flex-end', flexShrink: 0 }}>
            {props.formId !== 2 && (
              <button
                onClick={downloadPdf}
                style={{ padding: '10px 20px', borderRadius: '10px', border: `1.5px solid ${C.border}`, background: C.white, color: C.text, fontFamily: ff.body, fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
              >
                Baixar PDF
              </button>
            )}
            <button
              onClick={() => props.onClose()}
              style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`, color: '#fff', fontFamily: ff.body, fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em', boxShadow: '0 4px 12px rgba(109,20,26,0.25)', transition: 'opacity 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              CONFIRMAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

