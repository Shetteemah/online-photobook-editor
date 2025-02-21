import * as React from 'react';
import PropTypes from 'prop-types';

import Resizable from './Resizable';
import { resizableProps } from "./propTypes";
import type { ResizeCallbackData, ResizableBoxState } from './propTypes';

type ResizableBoxProps = {
  width: number;
  height: number;
  style?: React.CSSProperties;
  children?: React.ReactElement;
  handle?: React.ReactNode;
  handleSize?: [number, number];
  onResize?: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;
  onResizeStart?: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;
  onResizeStop?: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;
  draggableOpts?: object;
  minConstraints?: [number, number];
  maxConstraints?: [number, number];
  lockAspectRatio?: boolean;
  axis?: 'both' | 'x' | 'y' | 'none';
  resizeHandles?: string[];
  transformScale?: number;
};

const ResizableBox = React.forwardRef<HTMLDivElement, ResizableBoxProps>(
  (props, ref) => {
    const {
      handle,
      handleSize,
      onResize: onResizeProp, // Rename prop onResize to onResizeProp
      onResizeStart,
      onResizeStop,
      draggableOpts,
      minConstraints,
      maxConstraints,
      lockAspectRatio,
      axis,
      style,
      resizeHandles,
      transformScale,
      width,
      height,
      ...restProps
    } = props;

    const [size, setSize] = React.useState({ width, height });

    // Rename the local function to avoid the conflict
    const handleResize = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
      const { size } = data;
      if (onResizeProp) {
        e.persist?.();
        setSize(size);
        onResizeProp(e, data);
      } else {
        setSize(size);
      }
    };

    React.useEffect(() => {
      setSize({ width, height });
    }, [width, height]);

    return (
      <Resizable
        axis={axis}
        draggableOpts={draggableOpts}
        handle={handle}
        handleSize={handleSize}
        height={size.height}
        lockAspectRatio={lockAspectRatio}
        maxConstraints={maxConstraints}
        minConstraints={minConstraints}
        onResizeStart={onResizeStart}
        onResize={handleResize} // Use handleResize instead of onResize
        onResizeStop={onResizeStop}
        resizeHandles={resizeHandles}
        transformScale={transformScale}
        width={size.width}
      >
        <div
          ref={ref} // Forward the ref to this div
          {...restProps}
          style={{ ...style, width: `${size.width}px`, height: `${size.height}px` }}
        >
          {props.children}
        </div>
      </Resizable>
    );
  }
);

export default ResizableBox;
