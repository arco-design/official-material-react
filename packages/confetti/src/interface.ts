import { ReactNode } from 'react';

/**
 * @title ConfettiButton
 */
export interface ConfettiButtonProps {
  children?: ReactNode;
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean;
  /**
   * @zh 要发射的五彩纸屑数量。
   * @en The number of confetti to launch.
   * @defaultValue 60
   */
  particleCount?: number;
  /**
   * @zh 发射五彩纸屑的角度，以度为单位。 90 是直线上升。
   * @en The angle in which to launch the confetti, in degrees. 90 is straight up.
   * @defaultValue 90
   */
  angle?: number;
  /**
   * @zh 五彩纸屑可以偏离中心多远，以度为单位。 45 表示五彩纸屑将以定义的正负 22.5 度角发射。
   * @en How far off center the confetti can go, in degrees. 45 means the confetti will launch at the defined angle plus or minus 22.5 degrees.
   * @defaultValue 70
   */
  spread?: number;
  /**
   * @zh 五彩纸屑开始移动的速度，以像素为单位。
   * @en How fast the confetti will start going, in pixels.
   * @defaultValue 25
   */
  startVelocity?: number;
  /**
   * @zh 五彩纸屑会以多快的速度消失。 将此数字保持在 0 和 1 之间，否则五彩纸屑会加速消失。 如果你不确定的话，尽量不要改变它。
   * @en How quickly the confetti will lose speed. Keep this number between 0 and 1, otherwise the confetti will gain speed. Better yet, just never change it.
   */
  decay?: number;
  /**
   * @zh 五彩纸屑被拉下的速度有多快。 1 是全重力，0.5 是半重力等。 如果你愿意，你甚至可以使粒子上升。
   * @en How quickly the particles are pulled down. 1 is full gravity, 0.5 is half gravity, etc., but there are no limits. You can even make particles go up if you'd like.
   * @defaultValue 1.2
   */
  gravity?: number;
  /**
   * @zh 五彩纸屑会向一侧漂移多少。 默认值为 0，这意味着它们会直线下降。 左边使用负数，右边使用正数。
   * @en How much to the side the confetti will drift. The default is 0, meaning that they will fall straight down. Use a negative number for left and positive number for right.
   * @defaultValue 0
   */
  drift?: number;
  /**
   * @zh 五彩纸屑会移动多少次。
   * @en How many times the confetti will move.
   * @defaultValue 150
   */
  ticks?: number;
  /**
   * @zh
   * 从哪里开始发射纸屑。 如果您愿意，可以随意在屏幕外启动。
   * origin.x：页面上的 x 位置，0 为左边缘，1 为右边缘。
   * origin.y：页面上的 y 位置，0 为顶边，1 为底边。
   * @en
   * Where to start firing confetti from. Feel free to launch off-screen if you'd like.
   * origin.x: The x position on the page, with 0 being the left edge and 1 being the right edge.
   * origin.y: The y position on the page, with 0 being the top edge and 1 being the bottom edge.
   */
  origin?: { x?: number; y?: number };
  /**
   * @zh 十六进制格式的颜色字符串数组.
   * @en An array of color strings, in the HEX format.
   * @defaultValue ['#F76560', '#FADC19', '#14C9C9', '#722ED1', '#FF9A2E']
   */
  colors?: string[];
  /**
   * @zh
   * 五彩纸屑的一系列形状。 可能的值为正方形和圆形。默认是在均匀混合中使用两种形状。
   * 你甚至可以通过提供诸如 ['circle', 'circle', 'square'] 之类的值来更改组合，以使用三分之二的圆和三分之一的正方形。
   * @en
   * An array of shapes for the confetti. The possible values are square and circle.
   * The default is to use both shapes in an even mix.
   * You can even change the mix by providing a value such as ['circle', 'circle', 'square'] to use two third circles and one third squares.
   * @defaultValue ["square"]
   */
  shapes?: string[];
  /**
   * @zh 每个五彩纸屑粒子的比例缩放。
   * @en Scale factor for each confetti particle. Use decimals to make the confetti smaller.
   * @defaultValue 1
   */
  scalar?: number;
}
