import * as React from 'react';
import { DraggableCore } from 'react-draggable';
import { cloneElement } from './utils';
import { resizableProps } from './propTypes';
import type { ResizeHandleAxis, DefaultProps, Props, ReactRef, DragCallbackData } from './propTypes';

// The base <Resizable> component.
// This component does not have state and relies on the parent to set its props based on callback data.
export default class Resizable extends React.Component<Props, void> {
  static propTypes = resizableProps;

  static defaultProps: DefaultProps = {
    axis: 'both',
    handleSize: [20, 20],
    lockAspectRatio: false,
    minConstraints: [20, 20],
    maxConstraints: [Infinity, Infinity],
    resizeHandles: ['se'],
    transformScale: 1,
  };

  handleRefs: { [key: ResizeHandleAxis]: ReactRef<HTMLElement> } = {};
  lastHandleRect: ClientRect | null = null;
  slack: [number, number] | null = null;

  componentWillUnmount() {
    this.resetData();
  }

  resetData() {
    this.lastHandleRect = null;
    this.slack = null;
  }

  // Clamp width and height within provided constraints
  runConstraints(width: number, height: number): [number, number] {
    const { minConstraints, maxConstraints, lockAspectRatio } = this.props;
    if (!minConstraints && !maxConstraints && !lockAspectRatio) return [width, height];

    if (lockAspectRatio) {
      const ratio = this.props.width / this.props.height;
      const deltaW = width - this.props.width;
      const deltaH = height - this.props.height;

      if (Math.abs(deltaW) > Math.abs(deltaH * ratio)) {
        height = width / ratio;
      } else {
        width = height * ratio;
      }
    }

    const [oldW, oldH] = [width, height];
    let [slackW, slackH] = this.slack || [0, 0];
    width += slackW;
    height += slackH;

    if (minConstraints) {
      width = Math.max(minConstraints[0], width);
      height = Math.max(minConstraints[1], height);
    }
    if (maxConstraints) {
      width = Math.min(maxConstraints[0], width);
      height = Math.min(maxConstraints[1], height);
    }

    this.slack = [slackW + (oldW - width), slackH + (oldH - height)];

    return [width, height];
  }

  resizeHandler(
    handlerName: 'onResize' | 'onResizeStart' | 'onResizeStop',
    axis: ResizeHandleAxis
  ): Function {
    return (e: React.SyntheticEvent, { node, deltaX, deltaY }: DragCallbackData) => {
      if (handlerName === 'onResizeStart') this.resetData();

      const canDragX = (this.props.axis === 'both' || this.props.axis === 'x') && axis !== 'n' && axis !== 's';
      const canDragY = (this.props.axis === 'both' || this.props.axis === 'y') && axis !== 'e' && axis !== 'w';
      if (!canDragX && !canDragY) return;

      const axisV = axis[0];
      const axisH = axis[axis.length - 1];

      const handleRect = node.getBoundingClientRect();
      if (this.lastHandleRect != null) {
        if (axisH === 'w') {
          const deltaLeftSinceLast = handleRect.left - this.lastHandleRect.left;
          deltaX += deltaLeftSinceLast;
        }
        if (axisV === 'n') {
          const deltaTopSinceLast = handleRect.top - this.lastHandleRect.top;
          deltaY += deltaTopSinceLast;
        }
      }
      this.lastHandleRect = handleRect;

      if (axisH === 'w') deltaX = -deltaX;
      if (axisV === 'n') deltaY = -deltaY;

      let width = this.props.width + (canDragX ? deltaX / this.props.transformScale : 0);
      let height = this.props.height + (canDragY ? deltaY / this.props.transformScale : 0);

      [width, height] = this.runConstraints(width, height);

      const dimensionsChanged = width !== this.props.width || height !== this.props.height;

      const cb = typeof this.props[handlerName] === 'function' ? this.props[handlerName] : null;
      if (cb && (handlerName !== 'onResize' || dimensionsChanged)) {
        e.persist?.();
        cb(e, { node, size: { width, height }, handle: axis });
      }

      if (handlerName === 'onResizeStop') this.resetData();
    };
  }

  renderResizeHandle(handleAxis: ResizeHandleAxis, ref: ReactRef<HTMLElement>): React.ReactNode {
    const { handle } = this.props;
    if (!handle) {
      return <span className={`react-resizable-handle react-resizable-handle-${handleAxis}`} ref={ref} />;
    }
    if (typeof handle === 'function') {
      return handle(handleAxis, ref);
    }
    const isDOMElement = typeof handle.type === 'string';
    const props = {
      ref,
      ...(isDOMElement ? {} : { handleAxis }),
    };
    return React.cloneElement(handle, props);
  }

  render(): React.ReactNode {
    const {
      children,
      className,
      draggableOpts,
      width,
      height,
      handle,
      handleSize,
      lockAspectRatio,
      axis,
      minConstraints,
      maxConstraints,
      onResize,
      onResizeStop,
      onResizeStart,
      resizeHandles,
      transformScale,
      ...p
    } = this.props;
  
    // Check if children.props.children is defined and if it is an array or single element
    const childElements = React.Children.toArray(children.props?.children);
  
    return cloneElement(children, {
      ...p,
      className: `${className ? `${className} ` : ''}react-resizable`,
      children: [
        ...childElements, // Safely handle single or multiple children
        ...resizeHandles.map((handleAxis) => {
          const ref = this.handleRefs[handleAxis] ?? (this.handleRefs[handleAxis] = React.createRef());
          return (
            <DraggableCore
              {...draggableOpts}
              nodeRef={ref}
              key={`resizableHandle-${handleAxis}`}
              onStop={this.resizeHandler('onResizeStop', handleAxis)}
              onStart={this.resizeHandler('onResizeStart', handleAxis)}
              onDrag={this.resizeHandler('onResize', handleAxis)}
            >
              {this.renderResizeHandle(handleAxis, ref)}
            </DraggableCore>
          );
        }),
      ],
    });
  }
}
