import React, { CSSProperties, useRef, useState, useEffect, ReactElement } from 'react';
import shuffle from 'lodash.shuffle';
import cs from 'classnames';
import AnimateItem from './animateItem';

/**
 * @title AnimateWall
 */
interface AnimateWallProps {
  /**
   * @zh 开始动画的回调，入参是当前开始动画的元素索引
   */
  onStart?: (index: number) => void;
  /**
   * @zh 动画完成的回调
   */
  onComplete?: (index: number) => void;
  /**
   * @zh 动画墙的元素数组。传入的是一个组件而不是render后的结果， 最少需要传入 `2` 个元素，一直进行替换
   */
  elementList?: ReactElement[];
  className?: string | string[];
  style?: CSSProperties;
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
   * @zh 渐显/渐隐 动画所生效的最小元素的选择器，例如 如果是svg，实际动画作用在这个 `svg` 下的所有`<path/>`下
   * @defaultValue path
   */
  atomSelector?: string;
  /**
   * @zh 这个动画墙所展示的元素个数，默认是 `elementList.length - 1`
   * @defaultValue elementList.length - 1
   */
  count?: number;
}

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
  const classNames = cs('products', className);
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
    <div className={classNames} style={style}>
      <ul className={'products-logo-wall'} style={{ marginTop: 24 }}>
        {displayList.map((icon, index) => {
          const CurrentLogo: any = elementList[icon];
          const animate =
            !recordRef.current.inAnimation && recordRef.current.animationIcon === icon;
          return (
            <li className={'products-logo-wall-item'} key={index}>
              <AnimateItem
                duration={duration}
                delay={delay}
                atomSelector={atomSelector}
                content={React.cloneElement(<CurrentLogo />)}
                animate={animate}
                className={'products-logo-wall-item-logo'}
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
    </div>
  );
}

export default AnimateWall;
