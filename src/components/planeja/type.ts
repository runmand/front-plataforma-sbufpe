import { ReactElement } from "react";

export type PlanejaQuestionProps = {
  id: number;
  invisible: boolean;
  title: string;
  description?: string;
  yesDescr: string;
  noDescr: string;
  noHasJustify: boolean;
  campoMensagem?: ReactElement;
}

export type PlanejaTextProps = {
  invisible: boolean;
  title?: string;
  texto?: string;
  elemento?: ReactElement;
}

export type PlanejaPagPros = {
  invisible: boolean;
  elemento?: ReactElement;
}