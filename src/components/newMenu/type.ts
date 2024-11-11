import { routerEnum } from 'src/core/enums';

export type itemsListType = {
  position: number;
  title: string;
  route?: routerEnum;
  subList?: itemsListType[];  
}
