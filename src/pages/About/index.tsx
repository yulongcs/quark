import * as React from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';
import { RootStore } from '../../stores/rootStore';

interface Props {
  rootStore: RootStore;
}

@inject('rootStore')
@observer
class AboutComponent extends React.Component<Props, {}> {

  @observable title: string = 'About Page';

  @action changeTitle = () => {
    this.title = '单例组件';
  }

  showRootIndicator = () => {
    this.props.rootStore.updateIndicator({ show: true });
  }

  render() {

    return (
      <div>
        <h1>{this.title}</h1>
        <h1>Root Indicator:
          {this.props.rootStore.indicator.show ? <span>{this.props.rootStore.indicator.text}</span> : null}
        </h1>
        <Button type="primary" onClick={this.changeTitle}>change</Button>
        <br />
        <br />
        <Button type="primary" onClick={this.showRootIndicator}>show root</Button>
      </div>
    );
  }

}

export default AboutComponent; 
