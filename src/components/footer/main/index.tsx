'use client';

import * as React from "react";
import { routerEnum } from "src/core/enums";
import { useRouter } from "next/navigation";

const ff = { body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif" };

const links = [
    { label: "quem somos", url: routerEnum.TEAM },
    { label: "faq",        url: routerEnum.FAQ },
    { label: "contato",    url: routerEnum.CONTACTUS },
    { label: "tcle",       url: routerEnum.TCLE },
    { label: "acervo",     url: "/collection" },
];

export default function Index() {
    const router = useRouter();

    const [isMobile, setIsMobile] = React.useState(false);
    React.useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <footer style={{
            backgroundColor: '#6D141A',
            width: '100%',
            padding: isMobile ? '12px 16px' : '0 32px',
            minHeight: '44px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: isMobile ? '8px' : '0',
        }}>
            {/* Left — brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
                </svg>
                <span style={{
                    fontFamily: ff.body,
                    fontSize: '13px',
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.85)',
                    letterSpacing: '0.01em',
                }}>
                    GESTBUCAL SD &copy; 2023–{new Date().getFullYear()}
                </span>
            </div>

            {/* Center — nav links (hidden on mobile) */}
            {!isMobile && (
                <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                    {links.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => router.push(link.url)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontFamily: ff.body,
                                fontSize: '13px',
                                color: 'rgba(255,255,255,0.82)',
                                padding: 0,
                                transition: 'color 0.15s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.82)'; }}
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>
            )}

            {/* Right — SAC */}
            <span style={{
                fontFamily: ff.body,
                fontSize: '13px',
                color: 'rgba(255,255,255,0.82)',
                flexShrink: 0,
            }}>
                SAC: (81) 3194-4900
            </span>
        </footer>
    );
}
