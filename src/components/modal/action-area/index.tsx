import { actionAreaStyle } from './style';
import { TPROPS } from './type';
import ConfirmButton from '@components/button/confirm';

export default function index(props: TPROPS) {
	return (
		<div style={actionAreaStyle}>
			   
			   {props.isPdfDownloadable && (
			   <button onClick={props.onClickDownload} style={{width:'150px',padding:'3px',height:'38px',textTransform:'uppercase',background:'#921c22',borderRadius:'8px',textAlign:'center',cursor:'pointer'}}>
					Baixar PDF
				</button>
			   )}
			{props.onConfirm && (
				<ConfirmButton
					onClick={() => props.onConfirm()}
					isLoading={props.isLoading}
					isDisabled={props.isDisabled}
				/>
			)}
		</div>
	);
}
