import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Upload, Modal } from '@arco-design/web-react';
import { UploadInstance, UploadItem } from '@arco-design/web-react/es/Upload';
import { ImageUploaderProps } from './interface';
import Cropper, { CropperHandle } from './Cropper';
import dataUrlToFile from './utils/dataUrlToFile';

type ImageInfo = { type: string; indexInFileList: number; dataURL: string; croppedDataURL: string };

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
    defaultFileList,
    ...rest
  } = props;

  const refCropper = useRef<CropperHandle>(null);
  const refUpload = useRef<UploadInstance>(null);

  const [fileList, setFileList] = useState<UploadItem[]>(defaultFileList || []);
  const [indexCropping, setIndexCropping] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);

  // Images need to be cropped
  const imagesToCrop = useMemo<Array<ImageInfo>>(() => {
    const result: ImageInfo[] = [];

    fileList.forEach(({ status, originFile }, index) => {
      if (status === 'init') {
        const dataURL = URL.createObjectURL(originFile);
        result.push({
          type: originFile.type,
          indexInFileList: index,
          dataURL,
          croppedDataURL: dataURL,
        });
      }
    });

    return result;
  }, [JSON.stringify(fileList)]);

  useEffect(() => {
    setModalVisible(!!imagesToCrop.length);
  }, [imagesToCrop.length]);

  useEffect(() => {
    if (!modalVisible) {
      setIndexCropping(0);
    }
  }, [modalVisible]);

  const updateCroppingImage = (croppedDataURL: string) => {
    if (croppedDataURL) {
      imagesToCrop[indexCropping].croppedDataURL = croppedDataURL;
    }
  };

  const updateFileList = () => {
    const _fileList = [...fileList];
    imagesToCrop.forEach(({ indexInFileList, type, dataURL, croppedDataURL }) => {
      if (croppedDataURL !== dataURL) {
        _fileList[indexInFileList].originFile = dataUrlToFile(croppedDataURL, type);
      }
    });
    setFileList(_fileList);
  };

  return (
    <div className={`${prefixCls}`}>
      <Modal
        visible={modalVisible}
        {...modalProps}
        className={`${prefixCls}-modal-cropper${
          modalProps?.className ? ` ${modalProps.className}` : ''
        }`}
        onCancel={() => {
          setModalVisible(false);
          setFileList(fileList.filter(({ status }) => status !== 'init'));
          modalProps?.onCancel?.();
        }}
        onOk={() => {
          setModalVisible(false);
          updateCroppingImage(refCropper.current?.getCroppedImage());
          updateFileList();
          // Submit form after file is updated
          setTimeout(() => {
            refUpload.current?.submit();
          }, 0);
          modalProps?.onOk?.();
        }}
      >
        {imagesToCrop.length ? (
          <>
            <div className={`${prefixCls}-modal-cropper-main`}>
              {imagesToCrop.length > 1 ? (
                <ol className={`${prefixCls}-indicator`}>
                  {imagesToCrop.map(({ croppedDataURL }, index) => (
                    <li
                      key={index}
                      className={`${prefixCls}-indicator-item${
                        indexCropping === index ? ` ${prefixCls}-indicator-item-active` : ''
                      }`}
                      onClick={() => {
                        updateCroppingImage(refCropper.current?.getCroppedImage());
                        setIndexCropping(index);
                      }}
                    >
                      <img alt="image_snapshot" src={croppedDataURL} />
                    </li>
                  ))}
                </ol>
              ) : null}

              <Cropper
                ref={refCropper}
                prefixCls={prefixCls}
                quality={quality}
                image={imagesToCrop[indexCropping].dataURL}
                imageType={imagesToCrop[indexCropping].type}
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
        listType="picture-card"
        accept={accept}
        action={action}
        fileList={fileList}
        onPreview={(file) => {
          Modal.info({
            className: `${prefixCls}-modal-preview`,
            icon: null,
            title: file.name,
            content: (
              <img
                className={`${prefixCls}-modal-preview-img`}
                alt="image_preview"
                src={file.url || URL.createObjectURL(file.originFile)}
              />
            ),
          });
        }}
        {...rest}
        onChange={(fileList, file) => {
          setFileList(fileList);
          rest.onChange?.(fileList, file);
        }}
      />
    </div>
  );
}

export default React.forwardRef<unknown, ImageUploaderProps>(ImageUploader);

export { ImageUploaderProps };
