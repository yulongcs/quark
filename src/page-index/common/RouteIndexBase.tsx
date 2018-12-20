import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppContext } from '.';

// interface IProps<P> extends RouteComponentProps { }

class RouteIndexBaseComponent<P extends RouteComponentProps> extends React.PureComponent<P, any> {
  public static contextType = AppContext;

  constructor(props: P) {
    super(props);
  }

  public componentDidMount() {
    console.log(this.context.route);
    this.context.route = this.props.match.path;
    // console.log(this.context);
  }
}

export default RouteIndexBaseComponent;
