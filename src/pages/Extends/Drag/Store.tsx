import { action, computed, observable } from 'mobx';
import { DraggableData } from 'react-draggable';
import { AppStore } from '../../../stores';
import { IDragCardDataItem, IDragCardProps, IDragTagProps, ITagPositionProps, ITranslate } from './types';

export default class Store {

  public app: AppStore;

  @observable public tagPosition: ITagPositionProps;
  @observable public dragCardData: IDragCardDataItem[];

  constructor(app: AppStore) {
    this.app = app;

    this.dragCardData = [
      { id: '1', label: '卡片一', translate: { x: 0, y: 0 } },
      { id: '2', label: '卡片二', translate: { x: 0, y: 0 } },
      { id: '3', label: '卡片三', translate: { x: 0, y: 0 } },
      { id: '4', label: '卡片四', translate: { x: 0, y: 0 } },
      { id: '5', label: '卡片五', translate: { x: 0, y: 0 } }
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

  @action public updateDragCardDataItem = (id: string, translate: ITranslate) => {
    for (const item of this.dragCardData) {
      if (item.id === id) {
        item.translate = translate;
        break;
      }
    }
  }

  @action public onDragCardHandler = (handlerName: string, id: string) => (e: MouseEvent, { node, deltaX, deltaY }: DraggableData) => {
    console.log(e);
    const newPosition: ITranslate = { x: 0, y: 0 };
    switch (handlerName) {
      case 'onStart':
        const { offsetParent } = node;
        if (!offsetParent) {
          return;
        }
        const parentRect = offsetParent.getBoundingClientRect();
        const clientRect = node.getBoundingClientRect();
        newPosition.x = clientRect.left - parentRect.left + offsetParent.scrollLeft;
        newPosition.y = clientRect.top - parentRect.top + offsetParent.scrollTop;
        this.updateDragCardDataItem(id, newPosition);
        break;
      case 'onDrag':
        const currentItem = this.dragCardData.filter(i => i.id === id);
        const currentTranslate = currentItem[0] && currentItem[0].translate;
        if (!currentTranslate) {
          throw new Error('onDrag item not exists');
        }
        newPosition.x = currentTranslate.x + deltaX;
        newPosition.y = currentTranslate.y + deltaY;
        this.updateDragCardDataItem(id, newPosition);
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
