'use client';

import NewMenu from '@components/newMenu/index';
import { useRouter, useSearchParams } from 'next/navigation';
import { GET_FORMATTED_FORM_SHOW, GET_USER_RESULT_FROM_FORM_RES } from 'src/modules/form-answer/type';
import Base from '@components/base-layout/index';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { CircularProgress } from '@mui/material';
import FormAnswerService from 'src/modules/form-answer/service';
import SimpleForm from '@components/form/simple/index';
import React from 'react';
import FormResultModal from '@components/modal/form/result';
import { routerEnum } from 'src/core/enums';
import FormResultFeedBack from '@components/modal/FormResultFeedBack';
import TermRequirementService from 'src/modules/termRequirements/service';

function FormAnswerContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const formIdParam = searchParams.get('formId');
    const parsedFormId = formIdParam && formIdParam.trim() !== '' ? Number(formIdParam) : NaN;
    const formId: number | null = Number.isInteger(parsedFormId) && parsedFormId > 0 ? parsedFormId : null;

    const { enqueueSnackbar } = useSnackbar();
    const [formattedForm, setFormattedForm] = useState<GET_FORMATTED_FORM_SHOW>();
    const [loading, setLoading] = useState<boolean>(formId !== null);
    const [loadError, setLoadError] = useState<boolean>(false);
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
        if (formId === null) return;

        new TermRequirementService()
            .getForForm(formId)
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
    }, [formId, router, enqueueSnackbar]);

    const fetchForm = useCallback(async () => {
        if (formId === null) {
            setLoading(false);
            return;
        }

        try {
            const res = await new FormAnswerService().getFormattedFormShow(formId);
            if (!res?.data || !Array.isArray(res.data.questions)) {
                setLoadError(true);
                return;
            }

            const sortedData = res.data.questions.sort((a, b) => +b.formQuestionFormRegisterId - +a.formQuestionFormRegisterId);

            sortedData.forEach((el) => {
                if (el.formQuestionFormRegisterId == 234 && formId == 5) {
                    el.childrenQuestion?.sort((a, b) => +a.formQuestionFormRegisterId - +b.formQuestionFormRegisterId);
                }

                if (el.formQuestionFormRegisterId == 499 && formId == 6) {
                    el.childrenQuestion?.sort((a, b) => +a.formQuestionFormRegisterId - +b.formQuestionFormRegisterId);
                }
            });

            setFormattedForm(res.data);
            setLoadError(false);
        } catch (e) {
            console.error(e);
            setLoadError(true);
        } finally {
            setLoading(false);
        }
    }, [formId]);

    const handleRetry = useCallback(() => {
        setLoading(true);
        setLoadError(false);
        void fetchForm();
    }, [fetchForm]);

    useEffect(() => {
        let active = true;
        Promise.resolve().then(() => {
            if (active) void fetchForm();
        });
        return () => {
            active = false;
        };
    }, [fetchForm]);

    const getUserResultFromForm = () => {
        if (formId === null) return;
        if (formId === 5) {
            setFormThanks(true);
            return;
        }
        setIsOpenFormResult(true);
        new FormAnswerService()
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
                <div style={{ paddingTop: '4.5rem', minHeight: '70vh' }}>
                    {formId === null ? (
                        <div
                            style={{
                                minHeight: '65vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '24px',
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: '460px',
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    border: '1px solid #e7e5e4',
                                    borderRadius: '16px',
                                    padding: '32px 24px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                                }}
                            >
                                <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '22px', color: '#1c1917', margin: '0 0 10px' }}>
                                    Formulário não encontrado
                                </h2>
                                <p style={{ fontSize: '14px', color: '#78716c', margin: '0 0 24px', lineHeight: 1.6 }}>
                                    O identificador do formulário informado é inválido ou não foi encontrado. Volte para a lista e selecione um formulário válido.
                                </p>
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <button
                                        type="button"
                                        onClick={() => router.push(routerEnum.FORM)}
                                        style={{
                                            padding: '10px 24px',
                                            borderRadius: '100px',
                                            border: 'none',
                                            backgroundColor: '#6D141A',
                                            color: '#fff',
                                            fontSize: '14px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Voltar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : loading ? (
                        <div
                            style={{
                                minHeight: '65vh',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '16px',
                                padding: '24px',
                            }}
                        >
                            <CircularProgress sx={{ color: '#6D141A' }} size={36} aria-label="Carregando formulário" />
                            <span style={{ fontSize: '15px', color: '#1c1917' }}>Carregando formulário...</span>
                        </div>
                    ) : loadError ? (
                        <div
                            style={{
                                minHeight: '65vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '24px',
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: '460px',
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    border: '1px solid #e7e5e4',
                                    borderRadius: '16px',
                                    padding: '32px 24px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                                }}
                            >
                                <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '22px', color: '#1c1917', margin: '0 0 10px' }}>
                                    Não foi possível carregar o formulário
                                </h2>
                                <p style={{ fontSize: '14px', color: '#78716c', margin: '0 0 24px', lineHeight: 1.6 }}>
                                    Ocorreu um problema ao carregar as perguntas. Verifique sua conexão e tente novamente.
                                </p>
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <button
                                        type="button"
                                        onClick={handleRetry}
                                        style={{
                                            padding: '10px 24px',
                                            borderRadius: '100px',
                                            border: 'none',
                                            backgroundColor: '#6D141A',
                                            color: '#fff',
                                            fontSize: '14px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Tentar novamente
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => router.push(routerEnum.FORM)}
                                        style={{
                                            padding: '10px 20px',
                                            borderRadius: '100px',
                                            border: '1px solid #e7e5e4',
                                            backgroundColor: '#fff',
                                            color: '#57534e',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Voltar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : !formattedForm || formattedForm.questions.length === 0 ? (
                        <div
                            style={{
                                minHeight: '65vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '24px',
                                color: '#78716c',
                                fontSize: '15px',
                            }}
                        >
                            Este formulário não possui perguntas disponíveis no momento.
                        </div>
                    ) : (
                        <SimpleForm formattedForm={formattedForm} onFinish={() => getUserResultFromForm()} />
                    )}

                    {formThanks && formId !== null && (
                        <FormResultFeedBack
                            formId={formId}
                            formTitle={formattedForm?.title}
                            isOpen={formThanks}
                            canSkip={true}
                            onClose={() => handleCloseFormResultModal()}
                        />
                    )}

                    {formResult && formattedForm && formId !== null && (
                        <FormResultModal
                            formId={formId}
                            formTitle={formattedForm.title}
                            formResult={formResult}
                            isOpen={isOpenFormResult}
                            canSkip={true}
                            onClose={() => handleCloseFormResultModal()}
                        />
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
        <Suspense
            fallback={
                <div
                    style={{
                        minHeight: '70vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CircularProgress sx={{ color: '#6D141A' }} size={36} aria-label="Carregando formulário" />
                </div>
            }
        >
            <FormAnswerContent />
        </Suspense>
    );
}
