import { ReactElement } from "react";

export type PlanejaProps = {
  id?: string;
  title?: string;
  description?: string;
  yesDescr?: string;
  noDescr?: string;
  noHasJustify?: boolean;
  campoMensagem?: ReactElement;
  respondido?: string;
}