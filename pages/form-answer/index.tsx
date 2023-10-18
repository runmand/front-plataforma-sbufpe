import { useRouter } from "next/router";
import {
  GET_FORMATTED_FORM_SHOW,
  GET_USER_RESULT_FROM_FORM_RES,
} from "../../src/pages/form-answer/type";
import Base from "@components/base-layout/index";
import Appbar from "@components/app-bar/index";
import HomeToolbar from "@components/toolbar/home";
import { useEffect, useState } from "react";
import FormAnswerService from "../../src/pages/form-answer/service";
import SimpleForm from "@components/form/simple/index";
import { ID } from "src/core/types";
import React from "react";
import FormResultModal from "@components/modal/form/result";
import { routerEnum } from "src/core/enums";
import styled from "@emotion/styled";

//TODO: Corrigir ID quando o usuario da F5 na page.
export default function Index() {
  const router = useRouter();
  const [formId, setFormId] = React.useState<ID>(Number(router.query.id));
  const formAnwerService = new FormAnswerService();
  const [formattedForm, setFormattedForm] = useState<GET_FORMATTED_FORM_SHOW>();
  const [isOpenFormResult, setIsOpenFormResult] = useState<boolean>(false);
  const [formResult, setFormResult] =
    useState<GET_USER_RESULT_FROM_FORM_RES | null>();

  useEffect(() => {
    formAnwerService
      .getFormattedFormShow(formId)
      .then((res) => setFormattedForm(res.data))
      .catch((e) => console.error(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserResultFromForm = () => {
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
      appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
      mainContainerChild={
        <div style={{ paddingTop: "4.5rem" }}>
          {formattedForm && (
            <SimpleForm
              formattedForm={formattedForm}
              onFinish={() => getUserResultFromForm()}
            />
          )}
          {formResult && (
            <FormResultModal
              formId={formId as number}
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
