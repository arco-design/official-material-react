/* eslint-disable no-use-before-define */
import { TableColumnProps } from '@arco-design/web-react';
import React, { CSSProperties, ReactNode, useState } from 'react';
import { Resizable, ResizableProps, ResizeCallbackData } from 'react-resizable';

import './style/index.less';

/**
 * @title ResizeTableTitle
 */
export interface ResizeTableTitleProps extends ResizableProps {
  /**
   * @zh Arco Column的定位属性，固定头和列到左边或者右边
   * @defaultValue -
   * @version 1.0.0
   */
  fixed?: string;
  /**
   * @zh 组件上的style样式
   * @defaultValue {}
   * @version 1.0.0
   */
  style?: CSSProperties;
}

const ResizeTableTitle: ReactNode = (props: ResizeTableTitleProps) => {
  const { onResize, fixed, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} style={{ borderLeft: '1px solid #e5e8ef' }} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={(resizeHandle) => (
        <span
          className={`react-resizable-handle react-resizable-handle-${resizeHandle}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      )}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th
        {...restProps}
        style={fixed ? { ...restProps.style, position: 'sticky' } : { ...restProps.style }}
      />
    </Resizable>
  );
};

export const resizeCols = (originColumns: TableColumnProps[]) => {
  const [columns, setColumns] = useState(
    originColumns.map((column: TableColumnProps, index: number) => {
      if (column.width) {
        return {
          ...column,
          onHeaderCell: (col: TableColumnProps) => ({
            width: col.width,
            fixed: col?.fixed,
            onResize: handleResize(index),
          }),
        };
      }
      return column;
    })
  );

  const handleResize = (index: number) => {
    return (_: React.SyntheticEvent, { size }: ResizeCallbackData) => {
      setColumns((prevColumns) => {
        const nextColumns = [...prevColumns];
        nextColumns[index] = { ...nextColumns[index], width: size.width };
        return nextColumns;
      });
    };
  };

  return columns;
};

export default ResizeTableTitle;
