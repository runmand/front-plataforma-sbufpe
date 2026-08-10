'use client';

import NewMenu from '@components/newMenu/index';
import { useRouter, useSearchParams } from 'next/navigation';
import { GET_FORMATTED_FORM_SHOW, GET_USER_RESULT_FROM_FORM_RES } from 'src/modules/form-answer/type';
import Base from '@components/base-layout/index';
import { Suspense, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import FormAnswerService from 'src/modules/form-answer/service';
import SimpleForm from '@components/form/simple/index';
import { ID } from 'src/core/types';
import React from 'react';
import FormResultModal from '@components/modal/form/result';
import { localStorageKeyEnum, routerEnum } from 'src/core/enums';
import FormResultFeedBack from '@components/modal/FormResultFeedBack';

function FormAnswerContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const formIdParam = searchParams.get('formId');
    const [formId, setFormId] = React.useState<ID>(Number(formIdParam));

    const { enqueueSnackbar } = useSnackbar();
    const formAnwerService = new FormAnswerService();
    const [formattedForm, setFormattedForm] = useState<GET_FORMATTED_FORM_SHOW>();
    const [isOpenFormResult, setIsOpenFormResult] = useState<boolean>(false);
    const [formThanks, setFormThanks] = useState(false);
    const [formResult, setFormResult] = useState<GET_USER_RESULT_FROM_FORM_RES | null>();

    function hasSignedRequiredTerm(id: number): boolean {
        if ([1, 3, 4, 15].includes(id)) return sessionStorage.getItem('tcle_TCLEPROF') === '1';
        if (id === 6 || id === 2) return sessionStorage.getItem('tcle_TCLE') === '1' || sessionStorage.getItem('tcle_TCLE2') === '1';
        if (id === 16) return sessionStorage.getItem('tcle_TCLEUSAB') === '1';
        return sessionStorage.getItem('tcle_TCLE') === '1';
    }

    useEffect(() => {
        if (formIdParam === null) return;

        const id = Number(formIdParam);
        setFormId(id);

        const typeId = +localStorage.getItem(localStorageKeyEnum.TYPE_ID);

        if (typeId == 5) return;

        if (!hasSignedRequiredTerm(id)) {
            enqueueSnackbar('Você precisa assinar os termos obrigatórios antes de responder o formulário.', { variant: 'warning' });
            router.replace(routerEnum.FORM);
        }
    }, [formIdParam, router, enqueueSnackbar]);

    useEffect(() => {
        if (formId === null || Number.isNaN(formId)) return;

        formAnwerService
            .getFormattedFormShow(formId)
            .then((res) => {
                const sortedData = res.data.questions.sort((a, b) => +b.formQuestionFormRegisterId - +a.formQuestionFormRegisterId);

                sortedData.forEach((el) => {
                    if (el.formQuestionFormRegisterId == 234 && formId == 5) {
                        el.childrenQuestion.sort((a, b) => +a.formQuestionFormRegisterId - +b.formQuestionFormRegisterId);
                    }

                    if (el.formQuestionFormRegisterId == 499 && formId == 6) {
                        el.childrenQuestion.sort((a, b) => +a.formQuestionFormRegisterId - +b.formQuestionFormRegisterId);
                    }
                });

                setFormattedForm(res.data);
            })
            .catch((e) => console.error(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formId]);

    const getUserResultFromForm = () => {
        if (formId === 5) {
            setFormThanks(true);
            return;
        }
        setIsOpenFormResult(true);
        formAnwerService
            .getUserResultFromForm(formId)
            .then((res) => {
                res.data.date = new Date();
                setFormResult(res.data);
            })
            .catch((e) => console.error(e));
    };

    const handleCloseFormResultModal = () => {
        setIsOpenFormResult(false);
        router.push(routerEnum.FORM);
    };

    return (
        <Base
            appBarChild={<NewMenu />}
            mainContainerChild={
                <div style={{ paddingTop: '4.5rem' }}>
                    {formattedForm && (
                        <>
                            <SimpleForm formattedForm={formattedForm} onFinish={() => getUserResultFromForm()} />
                        </>
                    )}

                    {formThanks && (
                        <FormResultFeedBack
                            formId={formId as number}
                            formTitle={formattedForm?.title}
                            isOpen={formThanks}
                            canSkip={true}
                            onClose={() => handleCloseFormResultModal()}
                        />
                    )}

                    {formResult && (
                        <>
                            <FormResultModal
                                formId={formId as number}
                                formTitle={formattedForm.title}
                                formResult={formResult}
                                isOpen={isOpenFormResult}
                                canSkip={true}
                                onClose={() => handleCloseFormResultModal()}
                            />
                            <h1>Teste</h1>
                        </>
                    )}
                </div>
            }
        />
    );
}

export default function Page() {
    useEffect(() => {
        document.title = 'Responder Formulário | GestBucal';
    }, []);

    return (
        <Suspense fallback={null}>
            <FormAnswerContent />
        </Suspense>
    );
}
