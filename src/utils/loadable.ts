import * as Loadable from 'react-loadable';
import LoadingComponent from '../pages/Loading';

export default (entry: any) => {
  return Loadable({
    delay: 200, // 200ms
    loader: entry,
    loading: LoadingComponent,
    timeout: 10000 // 10s
  });
};
