import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Slider } from '@arco-design/web-react';
import { IconMinus, IconPlus, IconRefresh, IconRotateRight } from '@arco-design/web-react/icon';
import ReactCropper from 'react-cropper';
import { ImageUploaderProps } from './interface';

interface CropperProps
  extends Pick<
    ImageUploaderProps,
    | 'shape'
    | 'aspectRatio'
    | 'initialAspectRatio'
    | 'scale'
    | 'rotate'
    | 'cropperProps'
    | 'quality'
    | 'onCrop'
    | 'onCropperReady'
  > {
  prefixCls: string;
  image: string;
  imageType: string;
}

export type CropperHandle = {
  getCroppedImage: () => string;
};

function Cropper(props: CropperProps, ref) {
  const {
    prefixCls: propPrefixCls,
    image,
    shape,
    aspectRatio,
    initialAspectRatio,
    imageType,
    rotate,
    scale: needScale,
    quality,
    cropperProps,
    onCrop,
    onCropperReady,
  } = props;
  const prefixCls = `${propPrefixCls}-cropper`;

  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  // eslint-disable-next-line no-undef
  const refCropperInstance = useRef<Cropper>(null);
  const refCropperFactory = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (shape === 'round') {
      document.styleSheets[0].insertRule(`.cropper-view-box,
            .cropper-face {
                border-radius: 50%;
            }`);
    }
  }, [image, shape]);

  useEffect(() => {
    refCropperInstance.current?.rotateTo(rotation);
  }, [rotation]);

  useEffect(() => {
    refCropperInstance.current?.scale(scale);
  }, [scale]);

  const getCroppedImage: CropperHandle['getCroppedImage'] = () => {
    return refCropperInstance.current?.getCroppedCanvas().toDataURL(imageType, quality);
  };

  useImperativeHandle<unknown, CropperHandle>(
    ref,
    () => {
      return {
        getCroppedImage,
      };
    },
    []
  );

  return (
    <div className={prefixCls}>
      <ReactCropper
        guides={false}
        initialAspectRatio={initialAspectRatio}
        aspectRatio={aspectRatio}
        src={image}
        ref={refCropperFactory}
        ready={() => {
          refCropperInstance.current = (refCropperFactory.current as any).cropper;
          onCropperReady?.();
        }}
        crop={onCrop}
        style={{ height: 340 }}
        {...cropperProps}
      />

      <div className={`${prefixCls}-operation`}>
        <IconRefresh
          className={`${prefixCls}-operation-reset`}
          onClick={() => {
            setScale(1);
            setRotation(0);
          }}
        />
        {needScale && (
          <div className={`${prefixCls}-operation-scale`}>
            <IconMinus />
            <Slider
              step={0.1}
              min={0.1}
              max={4}
              value={scale}
              formatTooltip={(scale) => `${~~(scale * 100)}%`}
              onChange={(value: number) => setScale(value)}
            />
            <IconPlus />
          </div>
        )}
        {rotate && (
          <IconRotateRight
            className={`${prefixCls}-operation-rotate`}
            onClick={() => setRotation((rotation + 90) % 360)}
          />
        )}
      </div>
    </div>
  );
}

export default React.forwardRef<unknown, CropperProps>(Cropper);
