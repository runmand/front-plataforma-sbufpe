import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { localStorageKeyEnum, routerEnum } from 'src/core/enums';
import LoginModal from '@components/modal/log-in/index';
import SignupModal from '@components/modal/sign-up/index';
import DrawerMenu from '@components/menu/drawer/index';
import { MENU_ITEM } from '@components/menu/items/type';
import { itemsDrawer } from './itensMenu';

/* ─── Design tokens ─────────────────────────────────────────────────────────── */
const C = {
	primary:     '#6D141A',
	primaryDark: '#4E0E13',
	secondary:   '#921c22',
	white:       '#fff',
	text:        '#1c1917',
	muted:       '#a8a29e',
	border:      '#e7e5e4',
	borderLight: '#f5f5f4',
};
const ff = {
	display: "'Lora', Georgia, serif",
	body:    "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif",
};
const btnBase: React.CSSProperties = {
	border: 'none', cursor: 'pointer', fontFamily: ff.body, transition: 'all 0.25s ease', outline: 'none',
};

/* ─── SVGs ───────────────────────────────────────────────────────────────────── */
const SvgChev = () => (
	<svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
		<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
	</svg>
);

/* ─── NavDropdown ────────────────────────────────────────────────────────────── */
function NavDropdown({ title, items }: { title: string; items: { label: string; route: string }[] }) {
	const [open, setOpen] = React.useState(false);
	const ref = React.useRef<HTMLDivElement>(null);
	const router = useRouter();

	React.useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);

	return (
		<div ref={ref} style={{ position: 'relative' }}>
			<button
				onClick={() => setOpen(!open)}
				style={{ ...btnBase, display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.88)', background: 'transparent', borderRadius: '8px' }}
				onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
				onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.88)'; }}
			>
				{title}
				<span style={{ display: 'inline-flex', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
					<SvgChev />
				</span>
			</button>
			{open && (
				<div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, minWidth: '210px', background: C.white, borderRadius: '12px', overflow: 'hidden', zIndex: 200, boxShadow: '0 20px 50px -12px rgba(0,0,0,0.18)', border: `1px solid ${C.borderLight}` }}>
					{items.map((item, i) => (
						<button key={i}
							onClick={() => { router.push(item.route); setOpen(false); }}
							style={{ ...btnBase, display: 'block', width: '100%', textAlign: 'left', padding: '13px 20px', fontSize: '14px', color: C.text, background: 'transparent', borderBottom: i < items.length - 1 ? `1px solid ${C.borderLight}` : 'none' }}
							onMouseEnter={(e) => { e.currentTarget.style.background = C.borderLight; e.currentTarget.style.color = C.primary; }}
							onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.text; }}
						>
							{item.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

/* ─── Main Navbar ────────────────────────────────────────────────────────────── */
export default function Index() {
	const router = useRouter();
	const [scrolled,      setScrolled]      = React.useState(false);
	const [isMobile,      setIsMobile]      = React.useState(false);
	const [haveLogin,     setHaveLogin]     = React.useState(false);
	const [isOpenLogin,   setIsOpenLogin]   = React.useState(false);
	const [isOpenSignup,  setIsOpenSignup]  = React.useState(false);
	const [drawerOpen,    setDrawerOpen]    = React.useState(false);
	const [menu,          setMenu]          = React.useState<MENU_ITEM[]>(itemsDrawer);

	React.useEffect(() => {
		const onScroll  = () => setScrolled(window.scrollY > 30);
		const onResize  = () => { setIsMobile(window.innerWidth < 1024); };
		onResize();
		window.addEventListener('scroll',  onScroll);
		window.addEventListener('resize',  onResize);
		return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
	}, []);

	React.useEffect(() => {
		setHaveLogin(!!localStorage.getItem(localStorageKeyEnum.TOKEN));

		const id = Number(localStorage.getItem('typeId'));
		if (id <= 2 || id == 5) {
			setMenu(prev => [
				...prev,
				{ id: 7, title: 'Nossos Dados: Exportar', url: routerEnum.DATA },
			]);
		}

		const onLogin = () => setIsOpenLogin(true);
		window.addEventListener('clickLoginEvent', onLogin);
		return () => window.removeEventListener('clickLoginEvent', onLogin);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem(localStorageKeyEnum.TOKEN);
		localStorage.removeItem(localStorageKeyEnum.TYPE_ID);
		router.push(routerEnum.INITIAL);
		setHaveLogin(false);
	};

	const menuList = [
		{ title: 'Acervo',     items: [{ label: 'Artigos', route: routerEnum.ARTICLES }, { label: 'InformeSBPE', route: '/informes' }] },
		{ title: 'Quem Somos', items: [{ label: 'Quem Somos?', route: routerEnum.TEAM }, { label: 'O que é GestBucal SD?', route: routerEnum.PROJECT }] },
		{ title: 'Contato',    items: [{ label: 'Contato', route: routerEnum.CONTACTUS }] },
		{ title: 'F.A.Q',      items: [{ label: 'Perguntas Frequentes', route: routerEnum.FAQ }] },
	];

	return (
		<>
			<style>{`
				@keyframes fadeDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
			`}</style>

			<nav style={{
				position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
				background: scrolled ? 'rgba(109,20,26,0.96)' : C.primary,
				backdropFilter: scrolled ? 'blur(16px)' : 'none',
				boxShadow: scrolled ? '0 4px 24px rgba(109,20,26,0.2)' : 'none',
				transition: 'all 0.35s ease',
			}}>
				<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

					{/* Logo */}
					<button onClick={() => router.push(routerEnum.INITIAL)} style={{ ...btnBase, display: 'flex', alignItems: 'center', gap: '10px', background: 'transparent', padding: 0 }}>
						<Image src="/logo-transparent.png" alt="GestBucal" width={38} height={38} style={{ borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} />
						<span style={{ fontFamily: ff.display, color: '#fff', fontWeight: 700, fontSize: '19px' }}>
							GestBucal<span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300, marginLeft: '4px' }}>SD</span>
						</span>
					</button>

					{/* Desktop nav links */}
					{!isMobile && (
						<div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
							<button
								onClick={() => router.push(routerEnum.INITIAL)}
								style={{ ...btnBase, padding: '8px 14px', fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.88)', background: 'transparent', borderRadius: '8px' }}
								onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
								onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.88)'; }}
							>Início</button>
							{menuList.map((m, i) => <NavDropdown key={i} title={m.title} items={m.items} />)}
						</div>
					)}

					{/* Auth buttons / Menu+Logout — sempre visíveis */}
					{!haveLogin && (
						<div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '10px' }}>
							<button
								onClick={() => setIsOpenLogin(true)}
								style={{ ...btnBase, padding: isMobile ? '7px 14px' : '9px 24px', fontSize: '14px', fontWeight: 600, color: '#fff', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '100px' }}
								onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
								onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'transparent'; }}
							>Entrar</button>
							{!isMobile && (
								<button
									onClick={() => setIsOpenSignup(true)}
									style={{ ...btnBase, padding: '9px 24px', fontSize: '14px', fontWeight: 700, color: C.primary, background: '#fff', borderRadius: '100px', boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
									onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.18)'; }}
									onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.12)'; }}
								>Cadastrar</button>
							)}
						</div>
					)}

					{haveLogin && (
						<div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '10px' }}>
							<button
								onClick={() => setDrawerOpen(true)}
								style={{ ...btnBase, padding: '8px 14px', fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.88)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px' }}
							>☰ Menu</button>
							<button
								onClick={handleLogout}
								style={{ ...btnBase, padding: isMobile ? '7px 12px' : '9px 20px', fontSize: '14px', fontWeight: 600, color: '#fff', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '100px' }}
								onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
								onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
							>→ Sair</button>
						</div>
					)}
				</div>
			</nav>

			{/* Modals */}
			<LoginModal
				isOpen={isOpenLogin}
				canSkip={true}
				onClose={() => setIsOpenLogin(false)}
				openSignupModal={() => { setIsOpenLogin(false); setIsOpenSignup(true); }}
				openContact={() => router.push(routerEnum.CONTACTUS)}
			/>
			<SignupModal
				isOpen={isOpenSignup}
				canSkip={true}
				onClose={() => setIsOpenSignup(false)}
				openTclePage={() => router.push(routerEnum.TCLE)}
			/>
			<DrawerMenu
				isOpen={drawerOpen}
				menuItems={menu}
				onClose={() => setDrawerOpen(false)}
			/>
		</>
	);
}
