import { Card, Modal, Typography } from '@mui/material';
import React from 'react';
import { modalStyle, cardStyle, optionsStyle, optionsLinkStyle } from './style';
import { TPROPS } from './type';
import Header from '../../header/index';
import ActionArea from '@components/modal/action-area';

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

				<Typography style={{ ...optionsStyle, marginTop: '1rem' }}>
					Pontualção maxíma: &nbsp;<Typography style={optionsLinkStyle}>{props.formResult.maxScore} pts</Typography>
				</Typography>

				<Typography style={optionsStyle}>
					Pontualção atingida: &nbsp;<Typography style={optionsLinkStyle}>{props.formResult.score} pts</Typography>
				</Typography>

				{props.formResult.domainList.map((domain, index) => (
					<Card key={index} style={{ maxHeight: '100px' }}>
						<Typography variant='h5'>{domain.name}</Typography>
						{domain.questionList.map((question, key) => (
							<div key={key}>
								<Typography>{question.title}</Typography>

								<Typography key={key}>{question.recommendationMessage}</Typography>
							</div>
						))}
					</Card>
				))}

				<ActionArea isLoading={false} onConfirm={() => props.onClose()} />
			</div>
		</Modal>
	);
}
