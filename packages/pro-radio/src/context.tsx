import React, { ReactNode } from 'react';

export const PropRadioGroupContext = React.createContext<{
  type?: string;
  maskRender?: (dom: ReactNode, checked: boolean) => ReactNode;
}>({});
