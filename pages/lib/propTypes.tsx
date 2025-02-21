import PropTypes from 'prop-types';
import { DraggableCore } from "react-draggable";
import type { ReactElement, ElementConfig } from 'react';

// Define ReactRef in TypeScript
export type ReactRef<T extends HTMLElement> = {
  current: T | null;
};

export type Axis = 'both' | 'x' | 'y' | 'none';
export type ResizeHandleAxis = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';
export type ResizableState = void;
export type ResizableBoxState = {
  width: number;
  height: number;
  propsWidth: number;
  propsHeight: number;
};
export type DragCallbackData = {
  node: HTMLElement;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
};
export type ResizeCallbackData = {
  node: HTMLElement;
  size: { width: number; height: number };
  handle: ResizeHandleAxis;
};

// <Resizable> defaultProps type
export type DefaultProps = {
  axis: Axis;
  handleSize: [number, number];
  lockAspectRatio: boolean;
  minConstraints: [number, number];
  maxConstraints: [number, number];
  resizeHandles: ResizeHandleAxis[];
  transformScale: number;
};

// <Resizable> Props type
export type Props = DefaultProps & {
  children: ReactElement;
  className?: string | null;
  draggableOpts?: ElementConfig<typeof DraggableCore> | null;
  height: number;
  handle?: ReactElement | ((resizeHandleAxis: ResizeHandleAxis, ref: ReactRef<HTMLElement>) => ReactElement);
  onResizeStop?: ((e: React.SyntheticEvent, data: ResizeCallbackData) => any) | null;
  onResizeStart?: ((e: React.SyntheticEvent, data: ResizeCallbackData) => any) | null;
  onResize?: ((e: React.SyntheticEvent, data: ResizeCallbackData) => any) | null;
  width: number;
};

// Define resizableProps for PropTypes validation
export const resizableProps: Record<string, any> = {
  axis: PropTypes.oneOf(['both', 'x', 'y', 'none']),
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  draggableOpts: PropTypes.shape({
    allowAnyClick: PropTypes.bool,
    cancel: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    enableUserSelectHack: PropTypes.bool,
    offsetParent: PropTypes.node,
    grid: PropTypes.arrayOf(PropTypes.number),
    handle: PropTypes.string,
    nodeRef: PropTypes.object,
    onStart: PropTypes.func,
    onDrag: PropTypes.func,
    onStop: PropTypes.func,
    onMouseDown: PropTypes.func,
    scale: PropTypes.number,
  }),
  height: (...args) => {
    const [props] = args;
    if (props.axis === 'both' || props.axis === 'y') {
      return PropTypes.number.isRequired(...args);
    }
    return PropTypes.number(...args);
  },
  handle: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  handleSize: PropTypes.arrayOf(PropTypes.number),
  lockAspectRatio: PropTypes.bool,
  maxConstraints: PropTypes.arrayOf(PropTypes.number),
  minConstraints: PropTypes.arrayOf(PropTypes.number),
  onResizeStop: PropTypes.func,
  onResizeStart: PropTypes.func,
  onResize: PropTypes.func,
  resizeHandles: PropTypes.arrayOf(PropTypes.oneOf(['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'])),
  transformScale: PropTypes.number,
  width: (...args) => {
    const [props] = args;
    if (props.axis === 'both' || props.axis === 'x') {
      return PropTypes.number.isRequired(...args);
    }
    return PropTypes.number(...args);
  },
};
