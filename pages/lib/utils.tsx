import React from 'react';
import type { ReactElement } from 'react';

// A utility function to clone an element and merge style & className.
export function cloneElement(element: ReactElement, props: Record<string, any>): ReactElement {
  // Ensure element.props exists before trying to access its properties
  const elementProps = element.props || {};

  // Merge styles if both element and props have style properties
  if (props.style && elementProps.style) {
    props.style = { ...elementProps.style, ...props.style };
  }

  // Merge classNames if both element and props have className properties
  if (props.className && elementProps.className) {
    props.className = `${elementProps.className} ${props.className}`;
  }

  // Clone the element with the new props
  return React.cloneElement(element, props);
}
