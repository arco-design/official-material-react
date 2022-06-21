import { ReactNode } from 'react';

/**
 * @title TriggerEffect
 */
export interface TriggerEffectProps {
  children?: ReactNode;
  /**
   * @zh 动画的类型
   * @defaultValue ripple
   */
  type?: 'ripple' | 'wave';
  /**
   * @zh 触发动画的方式
   * @defaultValue click
   */
  trigger?: 'hover' | 'click';
  /**
   * @zh 动画持续的时长
   * @defaultValue 600
   */
  duration?: number;
  /**
   * @zh wave 类型的动画配置
   * @defaultValue {color: '#0288d1'}
   */
  waveProps?: { color?: string };
}
