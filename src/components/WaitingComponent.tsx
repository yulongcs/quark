import * as React from 'react';
import Loading from './Loading';

const { Suspense } = React;

const WaitingComponent = (Component: any, iprops: any = {}) => (props: any) => (
  <Suspense fallback={<Loading style={{ height: '100vh' }} />}>
    <Component {...props} {...iprops} />
  </Suspense>
);

export default WaitingComponent;
