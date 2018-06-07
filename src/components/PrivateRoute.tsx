// import { observer } from 'mobx-react';
// import * as React from 'react';
// import { Redirect, Route } from 'react-router-dom';
// import rootStore from '../rootStore';
// import { getCredentials } from '../utils/helper';

// const PrivateRoute = observer(({ component: Component, exact = false, path }) => {
//   const { authed } = rootStore;
//   // storage credentials
//   const credentials = getCredentials();

//   const isAuthenticated =  credentials && credentials.user && credentials.access_token && authed;

//   /* tslint:disable */
//   return (
//     <Route
//       exact={exact}
//       path={path}
//       render={props => {
//         // props.rootStore = rootStore;
//         return (
//           isAuthenticated ? (
//             <Component {...props} />
//           ) : (
//               <Redirect
//                 to={{
//                   pathname: '/login',
//                   state: { from: props.location }
//                 }}
//               />
//             )
//         );
//       }}
//     />
//   );
// });

// /* tslint:enable */
// export default PrivateRoute;


import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCredentials } from '../utils/helper';

interface IProps {
  component: any;
  exact?: boolean;
  path: string;
}

const PrivateRoute: React.SFC<IProps> = ({ component: Component, exact = false, path }) => {
  // storage credentials
  const credentials = getCredentials();

  const isAuthenticated =  credentials && credentials.user && credentials.access_token;
  // const isAuthenticated = true;

  /* tslint:disable */
  return (
    <Route
      exact={exact}
      path={path}
      render={props => {
        return (
          isAuthenticated ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
              />
            )
        );
      }}
    />
  );
};

/* tslint:enable */
export default PrivateRoute;
