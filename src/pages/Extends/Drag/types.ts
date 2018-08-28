import { DraggableData } from 'react-draggable';

export interface IDragTagProps {
  handleDrag:  (e: MouseEvent, data: DraggableData) => void;
}

export interface ITagPositionProps {
  clientX: number;
  clientY: number;
  layerX: number;
  layerY: number;
  deltaX: number;
  deltaY: number;
}

export interface ITranslate {
  x: number;
  y: number;
}

export interface IDragCardDataItem {
  id: string;
  label: string;
  translate: ITranslate;
}

export interface IDragCardProps {
  data: IDragCardDataItem[];
  onHandler:(handlerName: string, id: string) => (e: MouseEvent, data: DraggableData) => void;
}
