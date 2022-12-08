import { IconButton, Toolbar, Typography } from '@mui/material';
import { TProps } from './type';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { atualPageAreaStyle, atualPageTitleStyle, toolbarStyle } from './style';

export default function Index(props: TProps) {
	return (
		<Toolbar style={toolbarStyle}>
			<IconButton
				size='large'
				edge='start'
				color='inherit'
				aria-label='menu'
				sx={{ mr: 2 }}
			>
				<MenuIcon />
			</IconButton>

			<div style={atualPageAreaStyle}>
				<Typography style={atualPageTitleStyle}>SB - UFPE</Typography>
			</div>

			<IconButton
				size='large'
				aria-label='display more actions'
				edge='end'
				color='inherit'
			>
				<MoreIcon />
			</IconButton>
		</Toolbar>
	);
}
