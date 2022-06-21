import { CSSProperties } from 'react';

/**
 * @title WatermarkProps
 */
export interface WatermarkProps {
  style?: CSSProperties;
  className?: string;
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
   */
  image?: string;
  /**
   * @zh 水印的文字内容
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
   * @zh 水印唯一标示id, 传入唯一标示id后, 将会监听水印变化确保水印不被删除。
   */
  wmId?: string | number;
  /**
   * @zh 添加水印的容器 `wrapper`，会把水印 `dom` 作为 `container` 的第一个子节点展示，不设置会自动包上一层`div`
   */
  getContainer?: () => Element;
}
