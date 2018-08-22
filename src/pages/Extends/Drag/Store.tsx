import { action, computed, observable } from 'mobx';
import { DraggableData } from 'react-draggable';
import { AppStore } from '../../../stores';
import { IDragCardDataItem, IDragCardProps, IDragTagProps, ITagPositionProps } from './types';

export default class Store {

  public app: AppStore;

  @observable public tagPosition: ITagPositionProps;
  @observable public dragCardData: IDragCardDataItem[];

  constructor(app: AppStore) {
    this.app = app;

    this.dragCardData = [
      { id: '1', label: '卡片一' },
      { id: '2', label: '卡片二' },
      { id: '3', label: '卡片三' },
      { id: '4', label: '卡片四' },
      { id: '5', label: '卡片五' }
    ];
  }

  @action public handleTagDrag = (e: MouseEvent, data: DraggableData) => {
    this.tagPosition = {
      clientX: e.clientX,
      clientY: e.clientY,
      layerX: data.x + 32, // card-body paddingTop: 32
      layerY: data.y + 24, // card-body paddingLeft: 24
      deltaX: data.deltaX,
      deltaY: data.deltaY
    };
  }

  @action public onDragCardHandler = (handlerName: string) => (e: MouseEvent, data: DraggableData) => {
    switch (handlerName) {
      case 'onDragStart':
        console.log(e, data);
        break;
      default:
        throw new Error('onDragHandler called with unrecognized handlerName: ' + handlerName);
    }
  }

  @computed get dragTagProps(): IDragTagProps {
    const { handleTagDrag } = this;
    return { handleDrag: handleTagDrag };
  }

  @computed get dragCardProps(): IDragCardProps {
    const { dragCardData, onDragCardHandler } = this;
    return {
      data: dragCardData,
      onHandler: onDragCardHandler
    };
  }

}
