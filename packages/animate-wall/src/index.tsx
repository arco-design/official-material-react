import React, { useRef, useState, useEffect } from 'react';
import shuffle from 'lodash.shuffle';
import cs from 'classnames';

import AnimateItem from './animateItem';
import type { AnimateWallProps } from './interface';

const PREFIX_CLS = 'am-animate-wall';

// 获得一个打乱的位置数组
function getReplaceOrderList(len: number) {
  const array = new Array(len).fill(null).map((_, index) => index);
  return shuffle(array);
}

// 获取一个候补替换数组，与当前元素数组完全互异，但是长度相同。
function getNotCurrentList(allList: number[], currentList: number[]) {
  const notItemList = allList.filter((icon) => !currentList.includes(icon));
  const result = new Array(allList.length).fill(null);
  result.forEach((_, index) => {
    result[index] = notItemList[index % notItemList.length];
  });
  return result;
}

function AnimateWall(props: AnimateWallProps) {
  const {
    style,
    className,
    elementList = [],
    duration,
    delay,
    atomSelector,
    onStart,
    onComplete,
    count = Math.max(elementList.length - 1, 0),
  } = props;

  const allList = elementList.map((_, index) => index);
  const [displayList, setDisplayList] = useState([]);
  const recordRef = useRef<{
    indexOfAll: number;
    indexOfReplace: number;
    replaceOrderList: number[];
    animationIcon: number;
    inAnimation: boolean;
  }>({
    indexOfAll: 0,
    indexOfReplace: 0,
    replaceOrderList: [],
    animationIcon: null,
    inAnimation: false,
  });

  function onAnimationComplete() {
    const { indexOfAll, indexOfReplace, replaceOrderList } = recordRef.current;

    const notCurrentList = getNotCurrentList(allList, displayList);
    const replaceIndex = replaceOrderList[indexOfReplace];
    const replaceIcon = notCurrentList[indexOfAll];

    recordRef.current.animationIcon = replaceIcon;

    setDisplayList((pre) => {
      pre[replaceIndex] = replaceIcon;
      return [...pre];
    });

    const nextIndexOfAll = (indexOfAll + 1) % notCurrentList.length;
    const nextIndexOfReplace = (indexOfReplace + 1) % replaceOrderList.length;

    recordRef.current.indexOfAll = nextIndexOfAll;
    recordRef.current.indexOfReplace = nextIndexOfReplace;

    if (indexOfReplace === 0) {
      const nextReplaceOrderList = getReplaceOrderList(replaceOrderList.length);
      if (replaceIndex === nextReplaceOrderList[nextIndexOfReplace]) {
        [nextReplaceOrderList[0], nextReplaceOrderList[1]] = [
          nextReplaceOrderList[1],
          nextReplaceOrderList[0],
        ];
      }
      recordRef.current.replaceOrderList = nextReplaceOrderList;
    }
  }

  useEffect(() => {
    const displayList = allList.slice(0, count);
    recordRef.current.indexOfAll = count;
    recordRef.current.replaceOrderList = getReplaceOrderList(count);
    setDisplayList(displayList);

    setTimeout(() => {
      onAnimationComplete();
    }, 800);
  }, []);

  return (
    <ul className={cs(PREFIX_CLS, className)} style={style}>
      {displayList.map((icon, index) => {
        const CurrentLogo: any = elementList[icon];
        const animate = !recordRef.current.inAnimation && recordRef.current.animationIcon === icon;
        return (
          <li className={`${PREFIX_CLS}-item`} key={index}>
            <AnimateItem
              duration={duration}
              delay={delay}
              atomSelector={atomSelector}
              content={React.cloneElement(<CurrentLogo />)}
              animate={animate}
              className={`${PREFIX_CLS}-item-logo`}
              onStart={() => {
                if (icon !== recordRef.current.animationIcon) return;
                recordRef.current.inAnimation = true;
                onStart && onStart(index);
              }}
              onComplete={() => {
                if (icon !== recordRef.current.animationIcon) return;
                recordRef.current.inAnimation = false;
                onAnimationComplete();
                onComplete && onComplete(index);
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default AnimateWall;

export type { AnimateWallProps };
