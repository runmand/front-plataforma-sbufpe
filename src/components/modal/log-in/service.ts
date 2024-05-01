import { http } from "src/core/axios";
import { loginTypeEnum } from "src/core/enums";
import { RESPONSE } from "src/core/types";
import { HANDLE_LOGIN, HANDLE_LOGIN_RES } from "./type";

export default class LoginService {
  private path = "/login";

  handleLogin = async ({
    login,
    pwd,
    loginType,
  }: HANDLE_LOGIN): Promise<RESPONSE<HANDLE_LOGIN_RES>> => {
    const auth = btoa(`${login}:${pwd}`);
    const config = { headers: { authorization: `Basic ${auth}` } };

    const observer = {
      [loginTypeEnum.CPF]: async () =>
        await http.patch(`${this.path}/cpf`, {}, config),
      [loginTypeEnum.DDI_DDD_CELLPHONE]: async () =>
        await http.patch(`${this.path}/cellphone`, {}, config),
      [loginTypeEnum.EMAIL]: async () =>
        await http.patch(`${this.path}/email`, {}, config),
      [loginTypeEnum.USERNAME]: async () =>
        await http.patch(`${this.path}/username`, {}, config),
    };

    return await observer[loginType]();
  };
}
