import React from 'react';
import { Button } from '@arco-design/web-react';
import { render } from '@testing-library/react';
import TriggerEffect from '../index';

describe('TriggerEffect', () => {
  it('render content', () => {
    render(
      <TriggerEffect>
        <Button>Hello Arco</Button>
      </TriggerEffect>
    );
  });
});
