import * as React from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {
    censoTermIntro,
    censoTermSections,
    censoTermDeclarationHeading,
    censoTermDeclarationIntro,
    censoTermAcceptLabel,
    censoTermDeclineLabel,
    censoTermResearcher,
} from "@components/tcle-censo/content";

export default function Index() {
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
                        TCLE do Censo CEO/SESB
                    </h1>
                    <p className="text-sm text-gb-muted leading-relaxed mt-1.5 max-w-[560px] mx-auto">
                        Termo de Consentimento Livre e Esclarecido referente à coleta de dados virtual do Censo Nacional dos CEO e SESB.
                    </p>
                </div>

                {/* Content card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 font-body" style={{ border: "1px solid #e7e5e4" }}>
                    <div className="mb-6 pb-5" style={{ borderBottom: "1px solid #e7e5e4" }}>
                        <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-gb-primary mb-2">
                            Coleta de dados virtual
                        </span>
                        <h2 className="font-display text-[22px] sm:text-[26px] font-bold text-gb-text leading-tight tracking-tight">
                            Termo de Consentimento Livre e Esclarecido — TCLE
                        </h2>
                    </div>

                    <div className="space-y-5">
                        {censoTermIntro.map((text, i) => (
                            <p key={`intro-${i}`} className="text-[14.5px] text-gb-text leading-relaxed text-justify" style={{ textIndent: "1.5rem" }}>
                                {text}
                            </p>
                        ))}

                        {censoTermSections.map((section) => (
                            <div key={section.heading}>
                                <h3 className="text-[11px] font-bold tracking-widest uppercase text-gb-label mb-2">
                                    {section.heading}
                                </h3>
                                {section.paragraphs.map((p, i) => (
                                    <p key={i} className="text-[14.5px] text-gb-text leading-relaxed text-justify mb-2" style={{ textIndent: "1.5rem" }}>
                                        {p}
                                    </p>
                                ))}
                            </div>
                        ))}

                        <div>
                            <h3 className="text-[11px] font-bold tracking-widest uppercase text-gb-label mb-2">
                                {censoTermDeclarationHeading}
                            </h3>
                            <p className="text-[14.5px] text-gb-text leading-relaxed text-justify mb-3" style={{ textIndent: "1.5rem" }}>
                                {censoTermDeclarationIntro}
                            </p>
                            <p className="text-[14.5px] text-gb-text leading-relaxed mb-1">☐ {censoTermAcceptLabel}</p>
                            <p className="text-[14.5px] text-gb-text leading-relaxed">☐ {censoTermDeclineLabel}</p>
                        </div>

                        <p className="text-[13px] text-gb-muted text-right pt-4" style={{ borderTop: "1px solid #e7e5e4" }}>
                            {censoTermResearcher}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
