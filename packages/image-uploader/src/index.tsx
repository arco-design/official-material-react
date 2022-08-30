import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Upload, Modal } from '@arco-design/web-react';
import { UploadInstance, UploadItem } from '@arco-design/web-react/es/Upload';
import { ImageUploaderProps } from './interface';
import Cropper, { CropperHandle } from './Cropper';

function ImageUploader(props: ImageUploaderProps, ref) {
  const prefixCls = 'am-image-uploader';
  const {
    accept = 'image/*',
    action = '/',
    shape = 'rect',
    initialAspectRatio = 1,
    quality = 1,
    rotate = true,
    scale = true,
    aspectRatio,
    extraCropperContent,
    onCrop,
    cropperProps,
    modalProps,
    ...rest
  } = props;

  const refCropper = useRef<CropperHandle>(null);
  const refUpload = useRef<UploadInstance>(null);

  const [fileList, setFileList] = useState<UploadItem[]>([]);
  const [indexCropping, setIndexCropping] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);

  // Images new added
  const newImageList = useMemo<Array<{ type: string; dataURL: string }>>(() => {
    return fileList
      .filter(({ status }) => status === 'init')
      .map(({ originFile }) => ({
        type: originFile.type,
        dataURL: URL.createObjectURL(originFile),
      }));
  }, [JSON.stringify(fileList)]);
  const imageCropping = newImageList[indexCropping];

  useEffect(() => {
    setModalVisible(!!newImageList.length);
  }, [newImageList.length]);

  const updateCurrentCroppingFiles = (file: File) => {
    if (file) {
      const _fileList = [...fileList];
      _fileList[indexCropping].originFile = file;
      setFileList(_fileList);
    }
  };

  return (
    <div>
      <Modal
        visible={modalVisible}
        {...modalProps}
        className={`${prefixCls}-modal-cropper${
          modalProps?.className ? ` ${modalProps.className}` : ''
        }`}
        onCancel={() => {
          setModalVisible(false);
          modalProps?.onCancel?.();
        }}
        onOk={() => {
          setModalVisible(false);
          updateCurrentCroppingFiles(refCropper.current?.getCroppedImage('file') as File);
          modalProps?.onOk?.();
          // Submit form after file is updated
          setTimeout(() => {
            refUpload.current?.submit();
          }, 0);
        }}
      >
        {imageCropping ? (
          <>
            <div className={`${prefixCls}-modal-cropper-main`}>
              <ol className={`${prefixCls}-indicator`}>
                {newImageList.map(({ dataURL }, index) => (
                  <li
                    key={index}
                    className={`${prefixCls}-indicator-item${
                      indexCropping === index ? ` ${prefixCls}-indicator-item-active` : ''
                    }`}
                    onClick={() => {
                      updateCurrentCroppingFiles(
                        refCropper.current?.getCroppedImage('file') as File
                      );
                      setIndexCropping(index);
                    }}
                  >
                    <img alt="image_snapshot" src={dataURL} />
                  </li>
                ))}
              </ol>
              <Cropper
                ref={refCropper}
                prefixCls={prefixCls}
                quality={quality}
                image={imageCropping.dataURL}
                imageType={imageCropping.type}
                shape={shape}
                aspectRatio={aspectRatio}
                initialAspectRatio={initialAspectRatio}
                scale={scale}
                rotate={rotate}
                onCrop={onCrop}
                cropperProps={cropperProps}
              />
            </div>

            {extraCropperContent}
          </>
        ) : null}
      </Modal>
      <Upload
        ref={(_ref) => {
          ref = _ref;
          refUpload.current = ref;
        }}
        autoUpload={false}
        accept={accept}
        listType="picture-card"
        action={action}
        fileList={fileList}
        onChange={setFileList}
        onPreview={(file) => {
          Modal.info({
            className: `${prefixCls}-modal-preview`,
            icon: null,
            title: file.name,
            content: (
              <img
                className={`${prefixCls}-preview-img`}
                alt="image_preview"
                src={file.url || URL.createObjectURL(file.originFile)}
              />
            ),
          });
        }}
        {...rest}
      />
    </div>
  );
}

export default React.forwardRef<unknown, ImageUploaderProps>(ImageUploader);

export { ImageUploaderProps };
