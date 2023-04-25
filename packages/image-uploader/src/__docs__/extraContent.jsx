import React, { useRef, useState } from 'react';
import ImageUploader from '@arco-materials/image-uploader';

export default () => {
  const refImageUploader = useRef(null);
  const refCropHandlerTimer = useRef(null);
  const [croppedImageData, setCroppedImageData] = useState(null);

  const cropHandler = () => {
    refCropHandlerTimer.current && clearTimeout(refCropHandlerTimer.current);
    refCropHandlerTimer.current = setTimeout(() => {
      setCroppedImageData(refImageUploader.current.getCroppedImage());
    }, 500);
  };

  return (
    <ImageUploader
      ref={refImageUploader}
      modalProps={{ title: 'Upload Image', icon: null }}
      aspectRatio={16 / 9}
      name="image"
      action="https://api.imgbb.com/1/upload"
      data={{
        key: '849e71d05d6f091b3c0424c61d5594be',
      }}
      extraCropperContent={
        <div style={{ position: 'relative', width: 300, padding: 16 }}>
          <h6 style={{ margin: '0 0 16px 0' }}>Cropped Image</h6>
          {croppedImageData ? (
            <img
              alt="cropped_image"
              src={croppedImageData}
              style={{ maxWidth: '100%', border: '1px solid lightgray' }}
            />
          ) : null}
        </div>
      }
      onCrop={cropHandler}
      defaultFileList={[
        {
          uid: '-2',
          name: 'hello.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        },
      ]}
    />
  );
};
