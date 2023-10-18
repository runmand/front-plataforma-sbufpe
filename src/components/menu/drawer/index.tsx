import { Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TPROPS } from './type';
import ListMenu from '@components/menu/list/index';
import { modalStyle } from './style';
import FormAnswerService from 'src/pages/form-answer/service';
import { ResultFormPdf } from '@components/FormResultPdf';
import { pdf } from '@react-pdf/renderer';
import { FormResultProps } from '@components/FormResultPdf/FormResultProps.types';

//TODO: Permitir configuração da posição do drawer menu
export default function Index(props: TPROPS) {
	const [formData, setFormData] = useState<FormResultProps>()
	const formAnwerService = new FormAnswerService();
	

	async function getFormResult(formId:number){
		try{
			
			const {data:formResult} = await formAnwerService.getUserResultFromForm(formId)
			console.log(formResult)
			setFormData(formResult)
		}catch(err:any){
			console.error(err)
		}
	}

	async function downloadPdf(){
		const localStorageAnswer = localStorage.getItem('selectedAnswer')
		const blob = await pdf(
			<ResultFormPdf
			domainList={formData.domainList}
		maxScore={formData.maxScore}
		score={formData.score}	
		answer={JSON.parse(localStorageAnswer)}
			/>
		  ).toBlob();
	
		  // Create a URL for the blob object
		  const url = URL.createObjectURL(blob);
		  // Create an anchor element and set its href to the PDF URL
		  const a = document.createElement("a");
		  a.href = url;
	
		  // Set the anchor element's download attribute to the PDF file name
		  a.download = new Date()+"";
	
		  // Append the anchor element to the document body
		  document.body.appendChild(a);
	
		  // Click the anchor element to initiate the download
		  a.click();
	
		  // Remove the anchor element from the document body
		  document.body.removeChild(a);
	}

	useEffect(() => {
		const formIdFromLocalStorage = localStorage.getItem('lastFormSubmited')
		if(formIdFromLocalStorage){
			getFormResult(Number(formIdFromLocalStorage))
		}
	
	},[])

	return (
		<Drawer
			anchor={'left'}
			open={props.isOpen}
			onClose={() => props.onClose()}
			style={modalStyle}
		>
			<ListMenu items={props.menuItems} />
			{formData && (
			<button onClick={() => downloadPdf()} style={{padding:'3px',height:'38px',textTransform:'uppercase',background:'#921c22',borderRadius:'8px',textAlign:'center',cursor:'pointer',width:'90%',margin:'0 auto'}}>
					Baixar PDF
				</button>
			)}
		</Drawer>
	);
}
