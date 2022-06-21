import React, { useMemo, useState } from 'react';
import { Form, Input, Radio, Button, InputNumber, Typography } from '@arco-design/web-react';
import WaterMark from '@arco-materials/watermark';

const defaultValue = {
  content: '机密！严禁外传！',
  gapsX: 200,
  gapsY: 200,
  offsetX: 100,
  offsetY: 100,
  fontSize: '14px',
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  color: 'rgba(0,0,0,0.12)',
  rotate: '-20',
};

export default () => {
  const [formRef] = Form.useForm();

  const [config, setConfig] = useState(defaultValue);

  const wmProps = useMemo(() => {
    const {
      content,
      gapsX,
      gapsY,
      offsetX,
      offsetY,
      rotate,
      fontSize,
      fontWeight,
      fontFamily,
      color,
    } = config;
    return {
      content,
      rotate,
      gaps: {
        x: gapsX,
        y: gapsY,
      },
      offsets: {
        x: offsetX,
        y: offsetY,
      },
      fontStyle: {
        color,
        fontSize,
        fontFamily,
        fontWeight,
      },
    };
  }, [config]);

  return (
    <>
      <WaterMark content={'机密！严禁外传！'} {...wmProps}>
        <Typography.Paragraph code>{JSON.stringify(wmProps)}</Typography.Paragraph>
        <Form form={formRef} style={{ width: '900px' }}>
          <Form.Item label="文字内容" field="content" initialValue={defaultValue.content}>
            <Input />
          </Form.Item>
          <Form.Item label="水平间距(gaps.x)" field="gapsX" initialValue={defaultValue.gapsX}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="垂直间距(gaps.y)" field="gapsY" initialValue={defaultValue.gapsY}>
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="水平偏移(offsets.x)"
            field="offsetX"
            initialValue={defaultValue.offsetX}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="垂直偏移(offsets.y)"
            field="offsetY"
            initialValue={defaultValue.offsetY}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item label="字体大小" field="fontSize" initialValue={defaultValue.fontSize}>
            <Radio.Group options={['10px', '14px', '18px', '24px']} />
          </Form.Item>
          <Form.Item label="字重" field="fontWeight" initialValue={defaultValue.fontWeight}>
            <Radio.Group options={['normal', 'bold', 'lighter']} />
          </Form.Item>
          <Form.Item label="字族" field="fontFamily" initialValue={defaultValue.fontFamily}>
            <Radio.Group options={['sans-serif', 'serif']} />
          </Form.Item>
          <Form.Item label="颜色" field="color" initialValue={defaultValue.color}>
            <Radio.Group>
              <Radio value={'rgba(0,0,0,0.02)'}>极浅</Radio>
              <Radio value={'rgba(0,0,0,0.08)'}>浅</Radio>
              <Radio value={'rgba(0,0,0,0.12)'}>正常</Radio>
              <Radio value={'rgba(0,0,0,0.2)'}>深</Radio>
              <Radio value={'rgba(0,0,0,0.3)'}>极深</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="旋转角度" field="rotate" initialValue={defaultValue.rotate}>
            <Radio.Group>
              <Radio value={'45'}>45度</Radio>
              <Radio value={'0'}>0度</Radio>
              <Radio value={'-20'}>-20度</Radio>
              <Radio value={'-45'}>-45度</Radio>
              <Radio value={'-90'}>-90度</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label=" ">
            <Button
              type="primary"
              onClick={() => {
                const values = formRef.getFieldsValue();
                setConfig(values);
              }}
            >
              更新水印
            </Button>
          </Form.Item>
        </Form>
      </WaterMark>
    </>
  );
};
