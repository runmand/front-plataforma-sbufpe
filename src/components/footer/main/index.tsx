import { copyRightStyle, footerStyle, linkStyle } from './style';

//TODO: Corrigir path dos links.
export default function Index() {
	return (
		<div style={footerStyle}>
			<a
				href={'/'}
				style={linkStyle}
			>
				GestBucal
			</a>

			<a
				href={'/'}
				style={linkStyle}
			>
				Termos de Serviços
			</a>

			<a
				href={'/'}
				style={linkStyle}
			>
				Privacidade
			</a>

			<span style={copyRightStyle}>&copy; 2022 Tear Technology</span>
		</div>
	);
}
