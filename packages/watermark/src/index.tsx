import React, { PropsWithChildren, useEffect, useRef, useCallback } from 'react';
import { findDOMNode } from 'react-dom';
import omit from 'lodash.omit';
import CanvasWM from './watermark';
import type { WatermarkProps } from './interface';

const Watermark = (props: PropsWithChildren<WatermarkProps>) => {
  const { children, className, style, getContainer } = props;

  const containerRef = useRef<HTMLDivElement>();

  const container = useCallback(() => {
    if (getContainer && getContainer()) {
      return findDOMNode(getContainer()) as HTMLElement;
    }
  }, [getContainer]);

  useEffect(() => {
    const params = omit(props, ['container', 'style', 'className', 'children']);

    if (container()) {
      CanvasWM({
        ...params,
        container: container(),
      });
    } else {
      CanvasWM({
        ...params,
        container: containerRef.current,
      });
    }
  }, [
    props.width,
    props.height,
    props.content,
    props.image,
    props.zIndex,
    props.rotate,
    props.wmId,
    container,
    JSON.stringify(props.gaps),
    JSON.stringify(props.fontStyle),
    JSON.stringify(props.offsets),
  ]);

  if (container()) {
    return <></>;
  }

  return (
    <div className={className} style={style} ref={containerRef}>
      {children}
    </div>
  );
};

export default React.memo(Watermark);

export type { WatermarkProps };
