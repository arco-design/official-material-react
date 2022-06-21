import React, { useRef, useEffect, cloneElement, ReactNode } from 'react';

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

const TriggerEffect = (props: TriggerEffectProps) => {
  const { children, duration = 600, type = 'ripple', waveProps = {} } = props;

  const ref = useRef(null);
  const wrapper = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    if (type === 'ripple') {
      ref.current.addEventListener('click', addRippleEffect);
    }
    if (type === 'wave') {
      ref.current.addEventListener('click', addWaveEffect);
    }

    return () => {
      if (type === 'ripple') {
        ref.current.removeEventListener('click', addRippleEffect);
      }
      if (type === 'wave') {
        ref.current.removeEventListener('click', addWaveEffect);
      }
    };
  }, []);

  function addRippleEffect(e) {
    clearTimeout(timer.current);
    timer.current = null;

    const { clientX, clientY } = e;
    if (!wrapper.current) {
      wrapper.current = document.createElement('span');
      wrapper.current.setAttribute('class', 'arco-te-ripple-wrapper');
      ref.current.appendChild(wrapper.current);
    }

    const canvas = document.createElement('span');
    canvas.setAttribute('class', 'arco-te-ripple');

    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const longSide = width >= height ? width : height;
    const canvasWidth = longSide * 2;
    const offsetX = clientX - left - longSide;
    const offsetY = clientY - top - longSide;

    canvas.setAttribute(
      'style',
      `width:${canvasWidth}px;height:${canvasWidth}px;left:${offsetX}px;top:${offsetY}px;animation-duration:${duration}ms;`
    );

    wrapper.current.appendChild(canvas);

    canvas.setAttribute('class', 'arco-te-ripple arco-te-ripple-visible');

    setTimeout(() => {
      wrapper.current.removeChild(canvas);
    }, duration);

    timer.current = setTimeout(() => {
      ref.current.removeChild(wrapper.current);
      wrapper.current = null;
    }, duration + 50);
  }

  function addWaveEffect() {
    clearTimeout(timer.current);
    timer.current = null;

    const canvas = document.createElement('span');
    canvas.setAttribute('class', 'arco-te-wave');

    ref.current.appendChild(canvas);

    const waveColor = waveProps.color || '#0288d1';
    canvas.setAttribute('style', `outline-color:${waveColor};animation-duration:${duration}ms;`);

    setTimeout(() => {
      ref.current.removeChild(canvas);
    }, duration);
  }

  const child = React.Children.only(children) as any;

  return cloneElement(child, {
    ...child.props,
    ref: (node) => {
      ref.current = node;
      const { ref: originRef } = child;
      if (typeof originRef === 'function') {
        originRef(node);
      } else if (originRef !== null) {
        originRef.current = node;
      }
    },
  });
};

export default TriggerEffect;
