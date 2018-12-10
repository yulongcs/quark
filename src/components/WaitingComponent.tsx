import * as React from 'react';

const { Suspense } = React;

const WaitingComponent = (Component: any) => (props: any) => (
  <Suspense fallback={<h1>Loading...</h1>}>
    <Component {...props} />
  </Suspense>
);

export default WaitingComponent;
