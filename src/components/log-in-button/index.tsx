import Button from '@mui/material/Button/Button';
import { button } from './style';
import { TProps } from './type';

export default function Index(props: TProps) {
	return (
		<Button
			style={button}
			onClick={() => {
				props.onClick();
			}}
		>
			Log in
		</Button>
	);
}
