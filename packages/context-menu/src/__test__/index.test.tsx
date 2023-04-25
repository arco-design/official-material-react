import React from 'react';
import { render } from '@testing-library/react';
import ContextMenu from '../index';

describe('ContextMenu', () => {
  it('render content', () => {
    render(<ContextMenu children={null} />);
  });
});
