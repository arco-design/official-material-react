import React, { ReactNode } from 'react';

export const ProRadioGroupContext = React.createContext<{
  type?: string;
  maskRender?: (dom: ReactNode, checked: boolean) => ReactNode;
}>({});
