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

export interface IDragCardDataItem {
  id: string;
  label: string;
}

export interface IDragCardProps {
  data: IDragCardDataItem[];
  onHandler:(handlerName: string) => (e: MouseEvent, data: DraggableData) => void;
}
