import React, { CSSProperties, PropsWithChildren, useEffect, useRef, useCallback } from 'react';
import { findDOMNode } from 'react-dom';
import CanvasWM from './watermark';
import omit from 'lodash.omit';

/**
 * @title WaterMark
 */
export interface WaterMarkProps {
  /**
   * @zh 添加水印的容器 `wrapper`，会把水印 `dom` 作为 `container` 的第一个子节点展示，不设置会自动包上一层`div`
   */
  getContainer?: () => Element;
  /**
   * @zh 水印的z-index
   * @defaultValue 100
   */
  zIndex?: string;
  /**
   * @zh 单个水印的宽度
   * @defaultValue 200
   */
  width?: number | string;
  /**
   * @zh 单个水印的高度
   * @defaultValue 40
   */
  height?: number | string;
  /**
   * @zh 单个水印旋转角度
   * @defaultValue -20
   */
  rotate?: number;
  /**
   * @zh 水印图片源，优先级比文字内容高
   * @defaultValue
   */
  image?: string;
  /**
   * @zh 水印的文字内容
   * @defaultValue ``
   */
  content?: string;
  /**
   * @zh 水印文字样式
   * @defaultValue {color:`rgba(0, 0, 0, 0.12)`, fontFamily: `sans-serif`, fontSize: `14px`, fontWeight: `normal` }
   */
  fontStyle?: {
    color?: string;
    fontFamily?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
  };
  /**
   * @zh 水印间的间距
   * @defaultValue {x: 200, y: 200}
   */
  gaps?: {
    x?: number | string;
    y?: number | string;
  };
  /**
   * @zh 水印相对于 `container` 容器的偏移量。
   * @defaultValue {x: `gaps.x / 2`, `gaps.y / 2` }
   */
  offsets?: {
    x?: number | string;
    y?: number | string;
  };
  /**
   * @zh 不指定容器时，容器的类名
   * @defaultValue ``
   */
  style?: CSSProperties;

  /**
   * @zh 不指定容器时，容器的样式
   * @defaultValue ``
   */
  className?: string;

  /**
   * @zh 水印唯一标示id, 传入唯一标示id后, 将会监听水印变化确保水印不被删除。
   * @defaultValue
   */
  wmId?: string | number;
}

const WaterMark = (props: PropsWithChildren<WaterMarkProps>) => {
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

  if (!!container()) {
    return <></>;
  }

  return (
    <div className={className} style={style} ref={containerRef}>
      {children}
    </div>
  );
};

export default React.memo(WaterMark);
