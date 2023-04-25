import React, { useEffect, useMemo, useState } from 'react';
import { Button, Popover } from '@arco-design/web-react';

import type { GuideTipProps } from './interface';

const GuideTip = (props: GuideTipProps) => {
  // 使用自定义的类名前缀
  const prefixCls = 'm-guide-tip';
  const { steps = [], visible } = props;
  // 标识当前展示的气泡内容索引
  const [currentIndex, setCurrentIndex] = useState(-1);

  const current = steps[currentIndex];

  // 通过一定方式计算出 target 的位置，并应用在占位元素上，从而让弹出层能准确指向 target
  const targetStyle = useMemo(() => {
    if (!visible) {
      return;
    }
    const target = steps[currentIndex]?.target?.();
    if (target) {
      const { width, height, left, top } = target.getBoundingClientRect();
      return { width, height, left, top };
    }
  }, [currentIndex, visible]);

  useEffect(() => {
    if (!visible) {
      setCurrentIndex(-1);
    } else {
      setCurrentIndex(0);
    }
  }, [visible]);

  return (
    <Popover
      popupVisible={visible}
      className={prefixCls}
      title={current?.title}
      content={
        <div>
          <div>{current?.content}</div>
          <div className={`${prefixCls}-footer`}>
            {currentIndex > 0 && (
              <Button
                size="mini"
                type="primary"
                className={`${prefixCls}-prev-btn`}
                onClick={() => {
                  setCurrentIndex(Math.max(currentIndex - 1, 0));
                }}
              >
                上一步
              </Button>
            )}
            {currentIndex < steps.length - 1 ? (
              <Button
                size="mini"
                className={`${prefixCls}-next-btn`}
                onClick={() => {
                  setCurrentIndex(Math.min(currentIndex + 1, steps.length - 1));
                }}
              >
                下一步
              </Button>
            ) : (
              <Button size="mini" className={`${prefixCls}-done-btn`} onClick={props.onEnd}>
                完成
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className={`${prefixCls}-target`} style={targetStyle} />
    </Popover>
  );
};

export type { GuideTipProps };

export default GuideTip;
