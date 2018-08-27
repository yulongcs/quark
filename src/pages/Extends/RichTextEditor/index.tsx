import { Card } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { constants } from '../../../common';
import { AppStore } from '../../../stores';
import Store from './Store';

const { RICH_TEXT_EDITOR_COLORS } = constants;

interface IProps {
  app: AppStore;
}

@inject('app')
@observer
class Container extends React.Component<IProps> {
  public store: Store;

  constructor(props: IProps) {
    super(props);
    this.store = new Store(props.app);
  }

  public componentDidMount() {
    this.store.init();
  }

  public render() {
    const { handleRawChange, content } = this.store;

    const editorProps = {
      height: 500,
      contentFormat: 'raw' as any,
      placeholder: 'Hello world!',
      initialContent: content as any,
      // onChange: this.handleChange,
      onRawChange: handleRawChange,
      colors: RICH_TEXT_EDITOR_COLORS,
      media: {
        image: true, // 图片插入功能
        video: true, // 视频插入功能
        audio: true, // 音频插入功能
        externalMedias: { // 可插入的外部网络媒体类型
          image: true,
          audio: true,
          video: true,
          embed: false
        }
      }
    };

    return (
      <Card bordered={false}>
        <BraftEditor {...editorProps} />
      </Card>
    );
  }
}

export default Container;
