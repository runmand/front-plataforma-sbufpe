import { useRouter } from 'next/router';
import { GET_FORMATTED_FORM_SHOW } from './type';
import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import { useEffect, useState } from 'react';
import FormAnswerService from './service';
import SimpleForm from '@components/form/simple/index';

export default function Index() {
	const router = useRouter();
	const id = Number(router.query.id);
	const formAnwerService = new FormAnswerService();
	const [formattedForm, setFormattedForm] = useState<GET_FORMATTED_FORM_SHOW>();

	useEffect(() => {
		formAnwerService
			.getFormattedFormShow(id)
			.then(res => setFormattedForm(res.data))
			.catch(e => console.error(e));
	}, []);

	return (
		<Base
			appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
			mainContainerChild={formattedForm && <SimpleForm formattedForm={formattedForm} />}
		/>
	);
}
