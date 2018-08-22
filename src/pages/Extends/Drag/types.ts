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
