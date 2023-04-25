import React from 'react';
import { Card, Button, Space } from '@arco-design/web-react';
import TriggerEffect from '@arco-materials/trigger-effect';

const RippleButton = function (props) {
  const { children, ...rest } = props;
  return (
    <TriggerEffect>
      <Button {...rest}>{children}</Button>
    </TriggerEffect>
  );
};

const WaveButton = function (props) {
  const { children, waveProps, ...rest } = props;
  return (
    <TriggerEffect type="wave" waveProps={waveProps}>
      <Button {...rest}>{children}</Button>
    </TriggerEffect>
  );
};

function Demo() {
  return (
    <div>
      <Card title="Ripple" style={{ marginBottom: 20 }}>
        <Space>
          <RippleButton type="primary" size="large">
            Primary
          </RippleButton>
          <RippleButton type="outline" size="large">
            Outline
          </RippleButton>
          <RippleButton type="primary" status="danger" size="large">
            Warning
          </RippleButton>
          <RippleButton type="primary" status="warning" size="large">
            Warning
          </RippleButton>
          <RippleButton type="secondary" size="large">
            Secondary
          </RippleButton>
          <RippleButton type="dashed" size="large">
            Dashed
          </RippleButton>
        </Space>
      </Card>
      <Card title="Wave">
        <Space>
          <WaveButton type="primary" size="large">
            Primary
          </WaveButton>
          <WaveButton type="outline" size="large">
            Outline
          </WaveButton>
          <WaveButton
            type="primary"
            status="danger"
            size="large"
            waveProps={{ color: 'rgb(var(--danger-6))' }}
          >
            Warning
          </WaveButton>
          <WaveButton
            type="primary"
            status="warning"
            size="large"
            waveProps={{ color: 'rgb(var(--warning-6))' }}
          >
            Warning
          </WaveButton>
          <WaveButton type="secondary" size="large" waveProps={{ color: 'currentColor' }}>
            Secondary
          </WaveButton>
          <WaveButton type="dashed" size="large" waveProps={{ color: 'currentColor', width: 20 }}>
            Dashed
          </WaveButton>
        </Space>
      </Card>
    </div>
  );
}

export default () => {
  return <Demo />;
};
