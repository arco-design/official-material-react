import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '@arco-design/web-react';
import ConfettiButton from '../index';

describe('ConfettiButton', () => {
  it('render content', () => {
    render(
      <ConfettiButton>
        <Button>Hello Arco</Button>
      </ConfettiButton>
    );
  });
});
