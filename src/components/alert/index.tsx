import { TPROPS } from './type';

const ff = { body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif", display: "'Lora', Georgia, serif" };
const C = { primary: '#6D141A', secondary: '#921c22', text: '#1c1917', muted: '#78716c', border: '#e7e5e4', white: '#fff', bg: '#FAF7F2' };

export default function AlertDialog(props: TPROPS) {
	if (!props.isOpen) return null;

	const handleOnCancel = () => {
		props.onCancel?.();
		props.onClose();
	};

	return (
		<>
			<style>{`@keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>

			{/* Overlay */}
			<div
				onClick={() => { if (props.canSkip) props.onClose(); }}
				style={{ position: 'fixed', inset: 0, zIndex: 1200, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
			>
				{/* Dialog */}
				<div
					onClick={(e) => e.stopPropagation()}
					style={{ background: C.white, borderRadius: '20px', padding: '36px 32px 28px', maxWidth: '440px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.18)', animation: 'fadeInScale 0.2s cubic-bezier(0.4,0,0.2,1)' }}
				>
					{/* Accent bar */}
					<div style={{ width: '40px', height: '3px', background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`, borderRadius: '2px', marginBottom: '20px' }} />

					{/* Title */}
					<h2 style={{ fontFamily: ff.display, fontSize: '20px', fontWeight: 700, color: C.text, margin: '0 0 12px', lineHeight: 1.3 }}>
						{props.title}
					</h2>

					{/* Message */}
					{props.msg && (
						<p style={{ fontFamily: ff.body, fontSize: '14px', color: C.muted, margin: '0 0 28px', lineHeight: 1.6 }}>
							{props.msg}
						</p>
					)}

					{/* Actions */}
					<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
						{props.onCancel && (
							<button
								onClick={handleOnCancel}
								disabled={props.isLoading}
								style={{ padding: '10px 22px', borderRadius: '10px', border: `1.5px solid ${C.border}`, background: C.white, color: C.text, fontFamily: ff.body, fontSize: '14px', fontWeight: 600, cursor: props.isLoading ? 'not-allowed' : 'pointer', opacity: props.isLoading ? 0.5 : 1, transition: 'all 0.15s' }}
								onMouseEnter={(e) => { if (!props.isLoading) e.currentTarget.style.borderColor = C.primary; }}
								onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; }}
							>
								Cancelar
							</button>
						)}

						{props.onConfirm && (
							<button
								onClick={() => props.onConfirm()}
								disabled={props.isLoading}
								style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', background: props.isLoading ? C.muted : `linear-gradient(135deg, ${C.primary}, ${C.secondary})`, color: C.white, fontFamily: ff.body, fontSize: '14px', fontWeight: 700, cursor: props.isLoading ? 'not-allowed' : 'pointer', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.15s', boxShadow: props.isLoading ? 'none' : '0 4px 12px rgba(109,20,26,0.25)' }}
								onMouseEnter={(e) => { if (!props.isLoading) e.currentTarget.style.opacity = '0.88'; }}
								onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
							>
								{props.isLoading ? (
									<>
										<svg style={{ animation: 'spin 0.8s linear infinite' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
											<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
										</svg>
										Enviando...
									</>
								) : 'CONFIRMAR'}
							</button>
						)}
					</div>
				</div>
			</div>
			<style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
		</>
	);
}
