import React from 'react';
import { render } from '@testing-library/react';
import ImageUploader from '../index';

describe('GuideTip', () => {
  it('render content', () => {
    render(<ImageUploader />);
  });
});
