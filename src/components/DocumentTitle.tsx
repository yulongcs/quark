/**
 * DocumentTitle 动态设置html title
 * 
 *  create at 2018/08/10
 *  create by vdfor
 */

import * as React from 'react';

interface IProps {
  title: string;
}

class DocumentTitle extends React.Component<IProps> {

  public setTitle = () => {
    document.title = this.props.title;
  }

  public componentDidMount() {
    this.setTitle();
  }

  public render() {
    return null;
  }
}

export default DocumentTitle;
