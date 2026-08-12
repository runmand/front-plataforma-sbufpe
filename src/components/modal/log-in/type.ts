import { loginTypeEnum } from "src/core/enums";

export type TPROPS = {
  isOpen: boolean;
  canSkip?: boolean;
  onClose: () => void;
  openSignupModal: () => void;
  openContact: () => void;
};

export type HANDLE_LOGIN = {
  login: string;
  pwd: string;
  loginType: loginTypeEnum;
};

export type HANDLE_LOGIN_RES = {
  token: string;
  user_type: USER_TYPE_RESPONSE;
  user_id: number;
};

export type USER_TYPE_RESPONSE = {
  typeId: number;
};
