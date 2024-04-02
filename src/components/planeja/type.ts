import { ReactElement } from "react";

export type PlanejaQuestionProps = {
  id: number;
  title: string;
  description?: string;
  yesDescr: string;
  noDescr: string;
  noHasJustify: boolean;
  campoMensagem?: ReactElement;
}