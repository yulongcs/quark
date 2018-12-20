/**
 * DocumentTitle set html title
 * 
 *  create by vdfor at 2018/08/10
 */

import * as React from 'react';

interface IProps {
  title: string;
}

class DocumentTitle extends React.PureComponent<IProps> {

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
