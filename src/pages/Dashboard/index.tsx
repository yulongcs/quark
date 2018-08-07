import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppStore } from '../../stores';
import Store from './Store';

interface IProps {
  app?: AppStore;
}

@inject('app')
@observer
class Container extends React.Component<IProps> {

  public store: Store;

  constructor(props: IProps) {
    super(props);
    this.store = new Store(props.app as AppStore);
  }

  public render() {

    return (
     <p>hello</p>
    );
  }
}

export default Container; 
