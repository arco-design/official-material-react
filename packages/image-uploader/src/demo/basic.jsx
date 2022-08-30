import React from 'react';
import ImageUploader from '@arco-materials/image-uploader';

export default () => {
  return (
    <ImageUploader
      modalProps={{ title: 'Upload Image', icon: null }}
      aspectRatio={16 / 9}
      multiple
      action="https://api.imgbb.com/1/upload"
      data={{
        key: '849e71d05d6f091b3c0424c61d5594be',
      }}
      // defaultFileList={[
      //   {
      //     uid: '-2',
      //     name: 'hello.png',
      //     url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
      //   },
      //   {
      //     uid: '-1',
      //     name: 'world.png',
      //     url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
      //   },
      // ]}
    />
  );
};
