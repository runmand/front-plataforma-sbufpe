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
import { routerEnum } from 'src/core/enums';
import FormResultFeedBack from '@components/modal/FormResultFeedBack';
import TermRequirementService from 'src/modules/termRequirements/service';

function FormAnswerContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const formIdParam = searchParams.get('formId');
    const [formId, setFormId] = React.useState<ID>(Number(formIdParam));

    const { enqueueSnackbar } = useSnackbar();
    const formAnwerService = new FormAnswerService();
    const termRequirementService = new TermRequirementService();
    const [formattedForm, setFormattedForm] = useState<GET_FORMATTED_FORM_SHOW>();
    const [isOpenFormResult, setIsOpenFormResult] = useState<boolean>(false);
    const [formThanks, setFormThanks] = useState(false);
    const [formResult, setFormResult] = useState<GET_USER_RESULT_FROM_FORM_RES | null>();

    // Segunda checagem (a primeira é o `TcleModal`, em `/form`) pra impedir acesso direto
    // via URL sem passar pelo modal. Antes isso era um mapeamento hardcoded por `idForm`
    // + bypass fixo pro typeId 5 — se dessincronizava toda vez que a config de termos
    // mudava (ex.: um tipo marcado como "isento" no painel admin continuava bloqueado
    // aqui, porque essa tela nunca soube da isenção). Agora usa o mesmo endpoint e a
    // mesma regra de "grupo satisfeito" do `TcleModal` (ver `components/tcle/index.tsx`),
    // então reflete qualquer mudança feita no painel sem precisar editar código de novo.
    useEffect(() => {
        if (formIdParam === null) return;

        const id = Number(formIdParam);
        setFormId(id);

        termRequirementService
            .getForForm(id)
            .then((res) => {
                const requirements = res.data;
                if (res.errors || !requirements) return;

                const groups = requirements.groups ?? [];
                // Nenhuma regra configurada ou tipo isento = nada exigido (fail-open,
                // mesma semântica do `TcleModal`/`FormTermRequirement`).
                if (requirements.exempt || groups.length === 0) return;

                const satisfied = groups.some(
                    (g) => g.variants.length > 0 && g.variants.every((v) => sessionStorage.getItem(`tcle_${v}`) === '1')
                );
                if (!satisfied) {
                    enqueueSnackbar('Você precisa assinar os termos obrigatórios antes de responder o formulário.', { variant: 'warning' });
                    router.replace(routerEnum.FORM);
                }
            })
            .catch(() => {
                // Falha ao consultar não deve travar quem já passou pelo TcleModal.
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
