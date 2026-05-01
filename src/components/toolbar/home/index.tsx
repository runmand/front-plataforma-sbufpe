import React, { useEffect, useState } from 'react';
import DrawerMenu from '@components/menu/drawer/index';
import { localStorageKeyEnum, routerEnum } from 'src/core/enums';
import { useRouter } from 'next/router';

const ff = { display: "'Lora', Georgia, serif", body: "'Source Sans 3', -apple-system, sans-serif" };
const btn: React.CSSProperties = { border: 'none', cursor: 'pointer', background: 'transparent', fontFamily: ff.body, transition: 'all 0.2s ease', outline: 'none' };

export default function Index() {
  const router = useRouter();
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);
  const [menu, setMenu] = useState([
    { id: 1, title: 'Questionários',           url: routerEnum.FORM },
    { id: 3, title: 'Planeja SD - Teórico',    url: routerEnum.PLANEJA },
    { id: 4, title: 'Planeja SD - Prático',    url: routerEnum.PLANEJA_PRATICO },
    { id: 5, title: 'Nossos dados: APS',       url: routerEnum.DATAAPS },
    { id: 6, title: 'Nossos dados: CEO',       url: routerEnum.DATACEO },
  ]);

  useEffect(() => {
    const id = Number(localStorage.getItem('typeId'));
    if (id <= 2) {
      setMenu(prev => [...prev, { id: 7, title: 'Exportar Dados', url: routerEnum.DATA }]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(localStorageKeyEnum.TOKEN);
    localStorage.removeItem(localStorageKeyEnum.TYPE_ID);
    router.push(routerEnum.INITIAL);
  };

  return (
    <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

      {/* Hamburger */}
      <button
        onClick={() => setIsDrawerMenuOpen(true)}
        style={{ ...btn, padding: '8px', color: 'rgba(255,255,255,0.85)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Title */}
      <span style={{ fontFamily: ff.display, fontSize: '18px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
        GestBucal<span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300, marginLeft: '4px' }}>SD</span>
      </span>

      {/* Sair */}
      <button
        onClick={handleLogout}
        style={{ ...btn, display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '14px', fontWeight: 600, color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '100px' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Sair
      </button>

      <DrawerMenu isOpen={isDrawerMenuOpen} menuItems={menu} onClose={() => setIsDrawerMenuOpen(false)} />
    </div>
  );
}
