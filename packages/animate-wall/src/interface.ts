import { CSSProperties, ReactElement } from 'react';

/**
 * @title AnimateWall
 */
export interface AnimateWallProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 一个动画的持续时间，单位是秒
   * @defaultValue 0.5
   */
  duration?: number;
  /**
   * @zh 两个动画的间隔时间，单位是秒
   * @defaultValue 4
   */
  delay?: number;
  /**
   * @zh 这个动画墙所展示的元素个数，默认是 `elementList.length - 1`
   * @defaultValue elementList.length - 1
   */
  count?: number;
  /**
   * @zh 渐显/渐隐 动画所生效的最小元素的选择器，例如 如果是svg，实际动画作用在这个 `svg` 下的所有`<path/>`下
   * @defaultValue path
   */
  atomSelector?: string;
  /**
   * @zh 动画墙的元素数组。传入的是一个组件而不是render后的结果， 最少需要传入 `2` 个元素，一直进行替换
   */
  elementList?: ReactElement[];
  /**
   * @zh 开始动画的回调，入参是当前开始动画的元素索引
   */
  onStart?: (index: number) => void;
  /**
   * @zh 动画完成的回调
   */
  onComplete?: (index: number) => void;
}
