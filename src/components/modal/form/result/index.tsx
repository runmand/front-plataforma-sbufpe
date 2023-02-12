import { Modal, Typography } from '@mui/material';
import React from 'react';
import { modalStyle, cardStyle, optionsStyle, cardBodyStyle, scoreStyle } from './style';
import { TPROPS } from './type';
import Header from '../../header/index';
import ActionArea from '@components/modal/action-area';
import { theme } from 'src/core/theme';

//TODO: Melhorar o CSS e todos o sistema de formulario.
export default function Index(props: TPROPS) {
	return (
		<Modal
			open={props.isOpen}
			style={modalStyle}
			onClose={() => {
				if (props.canSkip) props.onClose();
			}}
		>
			<div style={cardStyle}>
				<Header title='Resultado' onClose={() => props.onClose()} />

				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<Typography style={{ ...optionsStyle, marginTop: '1rem', fontSize: '1.5rem' }}>
						Pontualção maxíma: &nbsp;<Typography style={scoreStyle}>{props.formResult.maxScore} pts</Typography>
					</Typography>

					<Typography style={{ ...optionsStyle, marginTop: '1rem', fontSize: '1.5rem' }}>
						Pontualção atingida: &nbsp;<Typography style={scoreStyle}>{props.formResult.score} pts</Typography>
					</Typography>
				</div>

				<div style={cardBodyStyle}>
					{props.formResult.domainList.map((domain, index) => (
						<div key={index}>
							<div style={{ ...scoreStyle, marginTop: '2rem', fontSize: '1.8rem' }}>
								<span>{domain.name}</span>
							</div>

							{domain.questionList.map((question, key) => (
								<div key={key}>
									<div>
										<span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{question.title}</span>
									</div>

									<div style={{ marginBottom: '1rem', fontSize: '1.3rem', color: theme.grey }}>
										<span key={key}>{question.recommendationMessage}</span>
									</div>
								</div>
							))}
						</div>
					))}
				</div>

				<ActionArea isLoading={false} onConfirm={() => props.onClose()} />
			</div>
		</Modal>
	);
}
