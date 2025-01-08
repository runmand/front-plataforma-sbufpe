import { Refresh } from '@mui/icons-material';

import {RefreshData } from './styled';

type Props = {
  click: () => void
}

export default function Index(props: Props) {

return(
  <RefreshData onClick={props.click}>
    <Refresh />
  </RefreshData>
);
}