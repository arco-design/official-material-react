import { ReactNode } from 'react';

/**
 * @title GuideTip
 */
export interface GuideTipProps {
  /**
   * @zh 引导步骤
   * @version 1.0.0
   */
  steps?: { title?: ReactNode; content?: ReactNode; target: () => HTMLElement }[];
  /**
   * @zh 是否显示引导气泡
   * @version 1.0.0
   */
  visible?: boolean;
  /**
   * @zh 完成时的回调
   */
  onEnd?: () => void;
}
