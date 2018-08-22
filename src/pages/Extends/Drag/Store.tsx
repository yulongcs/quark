import { action, computed, observable } from 'mobx';
import { DraggableData } from 'react-draggable';
import { AppStore } from '../../../stores';
import { IDragTagProps, ITagPositionProps } from './types';

export default class Store {

  public app: AppStore;

  @observable public tagPosition: ITagPositionProps;

  constructor(app: AppStore) {
    this.app = app;

  }

  @action public handleDrag = (e: MouseEvent, data: DraggableData) => {
    this.tagPosition = {
      clientX: e.clientX,
      clientY: e.clientY,
      layerX: data.x + 32, // card-body paddingTop: 32
      layerY: data.y + 24, // card-body paddingLeft: 24
      deltaX: data.deltaX,
      deltaY: data.deltaY
    };
  }

  @computed get dragTagProps(): IDragTagProps {
    const { handleDrag } = this;
    return { handleDrag };
  }

}
