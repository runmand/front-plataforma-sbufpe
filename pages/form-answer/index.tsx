import NewMenu from "@components/newMenu/index";
import { useRouter } from "next/router";
import { GET_FORMATTED_FORM_SHOW, GET_USER_RESULT_FROM_FORM_RES } from "../../src/pages/form-answer/type";
import Base from "@components/base-layout/index";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import FormAnswerService from "../../src/pages/form-answer/service";
import SimpleForm from "@components/form/simple/index";
import { ID } from "src/core/types";
import React from "react";
import FormResultModal from "@components/modal/form/result";
import { routerEnum } from "src/core/enums";
import FormResultFeedBack from "@components/modal/FormResultFeedBack";

//TODO: Corrigir ID quando o usuario da F5 na page.
export default function Index() {
    const router = useRouter();
    const [formId, setFormId] = React.useState<ID>(Number(router.query.formId));

    const { enqueueSnackbar } = useSnackbar();
    const formAnwerService = new FormAnswerService();
    const [formattedForm, setFormattedForm] = useState<GET_FORMATTED_FORM_SHOW>();
    const [isOpenFormResult, setIsOpenFormResult] = useState<boolean>(false);
    const [formThanks, setFormThanks] = useState(false);
    const [formResult, setFormResult] = useState<GET_USER_RESULT_FROM_FORM_RES | null>();

    function hasSignedRequiredTerm(id: number): boolean {
        if ([1, 3, 4].includes(id)) return sessionStorage.getItem('tcle_TCLEPROF') === '1';
        if (id === 6 || id === 2) return sessionStorage.getItem('tcle_TCLE') === '1' || sessionStorage.getItem('tcle_TCLE2') === '1';
        return sessionStorage.getItem('tcle_TCLE') === '1';
    }

    useEffect(() => {
        if (!router.isReady) return;

        const id = Number(router.query.formId);
        setFormId(id);

        if (!hasSignedRequiredTerm(id)) {
            enqueueSnackbar("Você precisa assinar os termos obrigatórios antes de responder o formulário.", { variant: "warning" });
            router.replace(routerEnum.FORM);
        }
    }, [router.isReady, router.query.formId, router, enqueueSnackbar]);

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
                <div style={{ paddingTop: "4.5rem" }}>
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
