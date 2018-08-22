import { Card } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import { tools } from '../../../../utils';
import { IPreviewProps } from '../types';
import { DefaultContent } from './';

@observer
class Preview extends React.Component<IPreviewProps> {

  private contentBox: any;

  constructor(props: IPreviewProps) {
    super(props);

    this.contentBox = React.createRef();
  }

  public toggleEditing = () => {
    this.props.setCodeValue(this.contentBox.current.innerHTML);
    this.props.toggleEditing(true);
  }

  public render() {
    const { code, isEditing } = this.props;
    return (
      <Card
        bordered={false}
        style={{ marginTop: isEditing ? '16px' : '0' }}
        extra={!isEditing && <a onClick={this.toggleEditing}>HTML模式编辑</a>}
      >
        {!isEditing ?
          <section ref={this.contentBox}>
            <DefaultContent />
          </section>
          :
          <section dangerouslySetInnerHTML={{ __html: tools.escape(code) }} />
        }
      </Card>
    );
  }
}

export default Preview;
