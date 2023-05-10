import React from 'react';
import { render } from '@testing-library/react';
import EditableTree from '../index';

describe('EditableTree', () => {
  it('render content', () => {
    render(<EditableTree />);
  });
});
