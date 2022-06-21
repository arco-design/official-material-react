import React, { useRef, ReactNode, ReactElement } from 'react';
import confetti from 'canvas-confetti';
import { ConfettiButtonProps } from './interface';

// get element's position relative to root element
function getElementPosition(element: HTMLElement, root?: ReactNode) {
  if (!root || !element) {
    return { left: 0, width: 0, height: 0, top: 0 };
  }
  // safari and chrome
  const bodyScroll = (direction) => document.documentElement[direction] || document.body[direction];
  const pageScrollTop =
    root === document.body ? bodyScroll('scrollTop') : (root as Element).scrollTop;
  const pageScrollLeft =
    root === document.body ? bodyScroll('scrollLeft') : (root as Element).scrollLeft;
  const { left, top, width, height } = element.getBoundingClientRect();
  // custom container
  const rootLeft = root === document.body ? 0 : (root as Element).getBoundingClientRect().left;
  const rootTop = root === document.body ? 0 : (root as Element).getBoundingClientRect().top;

  const pTop = top + pageScrollTop - rootTop;
  const pLeft = left + pageScrollLeft - rootLeft;

  return {
    left: pLeft,
    top: pTop,
    width,
    height,
  };
}

function ConfettiButton(props: ConfettiButtonProps) {
  const {
    children,
    disabled,
    particleCount = 60,
    angle = 90,
    startVelocity = 25,
    spread = 70,
    decay = 0.9,
    gravity = 1.2,
    ticks = 150,
    drift = 0,
    colors = ['#F76560', '#FADC19', '#14C9C9', '#722ED1', '#FF9A2E'],
    shapes = ['square'],
    scalar = 1,
  } = props;
  const buttonRef = useRef(null);
  const canvas = useRef(null);
  const timer = useRef(null);

  const container = document.body;

  function createConfetti() {
    const { left, top, width } = getElementPosition(buttonRef.current, container);
    const containerWidth = container.scrollWidth;
    const containerHeight = container.scrollHeight;

    if (!canvas.current) {
      canvas.current = document.createElement('canvas');
      canvas.current.style.width = `${containerWidth}px`;
      canvas.current.style.height = `${containerHeight}px`;
      canvas.current.style.pointerEvents = 'none';
      canvas.current.style.position = 'fixed';
      canvas.current.style.top = '0px';
      canvas.current.style.left = '0px';
      canvas.current.style.zIndex = 9999999;

      container.appendChild(canvas.current);
    }

    const myConfetti = confetti.create(canvas.current, {
      resize: true,
      useWorker: true,
    });
    const innerConfettiProps = props.origin || {
      origin: {
        x: (left + width / 2) / containerWidth,
        y: top / containerHeight,
      },
    };

    return { myConfetti, innerConfettiProps };
  }

  function onClickButton(e) {
    const originOnClick =
      children && (children as ReactElement).props && (children as ReactElement).props.onClick;
    const ret = originOnClick && originOnClick(e);
    if (ret && ret.then) {
      ret
        .then(() => {
          fireConfetti();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      fireConfetti();
    }

    function fireConfetti() {
      if (disabled) {
        return;
      }
      clearTimeout(timer.current);

      const { myConfetti, innerConfettiProps } = createConfetti();

      myConfetti({
        ...innerConfettiProps,
        particleCount,
        angle,
        startVelocity,
        spread,
        decay,
        gravity,
        ticks,
        drift,
        colors,
        shapes,
        scalar,
      });
      timer.current = setTimeout(() => {
        myConfetti.reset();
        document.body.removeChild(canvas.current);
        canvas.current = null;
      }, 3000);
    }
  }

  return React.cloneElement(children as ReactElement, { ref: buttonRef, onClick: onClickButton });
}

export default ConfettiButton;
