import React from 'react';
import { render } from '@testing-library/react';
import VerificationCode from '../index';

describe('VerificationCode', () => {
  it('render content', () => {
    render(<VerificationCode />);
  });
});
