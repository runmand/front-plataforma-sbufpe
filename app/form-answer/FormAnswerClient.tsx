'use client';

import { useRouter } from 'next/navigation';
import { GET_FORMATTED_FORM_SHOW, GET_USER_RESULT_FROM_FORM_RES } from 'src/modules/form-answer/type';
import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import { useEffect, useState } from 'react';
import FormAnswerService from 'src/modules/form-answer/service';
import SimpleForm from '@components/form/simple/index';
import FormResultModal from '@components/modal/form/result';
import { routerEnum } from 'src/core/enums';

export default function FormAnswerClient({ formId }: { formId: number }) {
	const router = useRouter();
	const formAnwerService = new FormAnswerService();
	const [formattedForm, setFormattedForm] = useState<GET_FORMATTED_FORM_SHOW>();
	const [isOpenFormResult, setIsOpenFormResult] = useState<boolean>(false);
	const [formResult, setFormResult] = useState<GET_USER_RESULT_FROM_FORM_RES | null>();

	useEffect(() => {
		if (!formId) return;
		formAnwerService
			.getFormattedFormShow(formId)
			.then(res => setFormattedForm(res.data))
			.catch(e => console.error(e));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formId]);

	const getUserResultFromForm = () => {
		setIsOpenFormResult(true);
		formAnwerService
			.getUserResultFromForm(formId)
			.then(res => setFormResult(res.data))
			.catch(e => console.error(e));
	};

	return (
		<Base
			appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
			mainContainerChild={
				<div style={{ paddingTop: '4.5rem' }}>
					{formattedForm && <SimpleForm formattedForm={formattedForm} onFinish={() => getUserResultFromForm()} />}
					{formResult && (
						<FormResultModal
							formId={formId}
							formResult={formResult}
							isOpen={isOpenFormResult}
							canSkip={true}
							onClose={() => {
								setIsOpenFormResult(false);
								router.push(routerEnum.FORM);
							}}
						/>
					)}
				</div>
			}
		/>
	);
}
