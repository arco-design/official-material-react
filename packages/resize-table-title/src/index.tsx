/* eslint-disable no-use-before-define */
import { TableColumnProps } from '@arco-design/web-react';
import React, { useState } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';

import type { ResizeTableTitleProps } from './interface';

const ResizeTableTitle = (props: ResizeTableTitleProps) => {
  const { onResize, fixed, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} style={{ borderLeft: '1px solid #e5e8ef' }} />;
  }

  return (
    <Resizable
      className="am-react-resizable"
      width={width}
      height={0}
      handle={(resizeHandle) => (
        <span
          className={`am-react-resizable-handle am-react-resizable-handle-${resizeHandle}`}
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

export type { ResizeTableTitleProps };

export default ResizeTableTitle;
