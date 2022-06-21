import React, { CSSProperties, useRef, useState, useLayoutEffect, ReactElement } from 'react';
import { gsap } from 'gsap/all';
import cs from 'classnames';
import useIsFirstRender from './hooks/useIsFirstRender';

export interface AnimationItemProps {
  style?: CSSProperties;
  className?: string | string[];
  content: ReactElement;
  duration?: number;
  delay?: number;
  animate?: boolean;
  onStart?: (index?: number) => void; // 动画播放开始
  onComplete?: (index?: number) => void; // 动画播放结束
  atomSelector?: string;
}

type AnimationInstance = gsap.core.Tween;

function animationOut(target, { duration, delay }, config: gsap.TweenVars = {}): AnimationInstance {
  return gsap.to(target, {
    animationDuration: duration,
    opacity: 0,
    ease: 'power1.inOut',
    delay,
    stagger: {
      amount: duration,
      from: 'random',
    },
    ...config,
  });
}

function animationIn(target, { duration }, config: gsap.TweenVars = {}): AnimationInstance {
  return gsap.from(target, {
    opacity: 0,
    ease: 'power1.inOut',
    stagger: {
      amount: duration,
      from: 'random',
    },
    ...config,
  });
}

export default function AnimationItem(props: AnimationItemProps) {
  const {
    style = {},
    className,
    content,
    duration = 0.5,
    delay = 4,
    animate = true,
    onStart,
    onComplete,
    atomSelector = 'path',
  } = props;
  const isFirstRender = useIsFirstRender();
  const [item, setItem] = useState(content);
  const [updateKey, setUpdateKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const refAnimationInstance = useRef<AnimationInstance>();

  useLayoutEffect(() => {
    refAnimationInstance.current && refAnimationInstance.current.progress(1);
    if (!isFirstRender && animate) {
      const paths = ref.current.querySelectorAll('path');
      refAnimationInstance.current = animationOut(
        paths,
        { duration, delay },
        {
          onComplete() {
            refAnimationInstance.current = null;
            setItem(content);
            setUpdateKey((pre) => pre + 1);
          },
        }
      );
      onStart && onStart();
    } else {
      setItem(content);
    }
  }, [animate, duration, delay, content]);

  useLayoutEffect(() => {
    refAnimationInstance.current && refAnimationInstance.current.progress(1);
    if (!isFirstRender) {
      const paths = ref.current.querySelectorAll(atomSelector);
      refAnimationInstance.current = animationIn(
        paths,
        { duration },
        {
          onComplete() {
            refAnimationInstance.current = null;
            onComplete && onComplete();
          },
        }
      );
    }
  }, [updateKey]);

  return (
    <div ref={ref} style={style} className={cs(className)}>
      {item}
    </div>
  );
}
