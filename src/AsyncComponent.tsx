import * as React from 'react';

interface State {
  component: any;
}

const asyncComponent = (importComponent: any) => {

  class AsyncComponent extends React.Component<{}, State> {

    constructor(props: {}) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C
        ? <C {...this.props} />
        : null;
    }

  }

  return AsyncComponent;
};

export default asyncComponent;
