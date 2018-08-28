import * as Loadable from 'react-loadable';
import Loading from '../pages/Loading';

export default (entry: any) => {
  return Loadable({
    delay: 200, // 200ms
    loader: entry,
    loading: Loading,
    timeout: 10000 // 10s
  });
};
