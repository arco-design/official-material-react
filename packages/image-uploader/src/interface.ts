import Cropper from 'cropperjs';
import { ConfirmProps } from '@arco-design/web-react/es/Modal/confirm';
import { UploadProps } from '@arco-design/web-react';
import { ReactNode } from 'react';
import { UploadInstance } from '@arco-design/web-react/es/Upload';

/**
 * @title ImageUploaderHandle
 */
export type ImageUploaderHandle = {
  /**
   * @zh Arco Upload 示例
   * @eh Instance of Arco Upload
   */
  upload: UploadInstance;
  /**
   * @zh 获取裁剪过的图片数据
   * @en Get the data for cropped image
   */
  getCroppedImage: () => string;
};

/**
 * @title ImageCropUploader
 */
export interface ImageUploaderProps extends UploadProps {
  /**
   * @zh 上传服务器接口地址
   * @en Uploading url
   */
  action?: string;
  /**
   * @zh 接受文件类型
   * @en type of accept file
   * @defaultValue 'image/*'
   */
  accept?: string;
  /**
   * @zh 裁剪区形状
   * @en Shape of crop area
   * @defaultValue 'react'
   */
  shape?: 'rect' | 'round';
  /**
   * @zh 宽度与高度的比例
   * @en Aspect ratio of crop area , width / height
   */
  aspectRatio?: number;
  /**
   * @zh 宽度与高度比例的默认值
   * @en The default aspect ratio of crop area , width / height
   * @defaultValue 1
   */
  initialAspectRatio?: number;
  /**
   * @zh 是否需要缩放图片
   * @en Whether need to scale the picture
   * @defaultValue true
   */
  scale?: boolean;
  /**
   * @zh 是否需要旋转图片
   * @en Whether need to rotate the picture
   * @defaultValue true
   */
  rotate?: boolean;
  /**
   * @zh 图片质量
   * @en Quality of cropped image
   * @defaultValue 1
   */
  quality?: number;
  /**
   * @zh 图片裁剪标题
   * @en Title of the cropper
   * @version 1.1.0
   */
  cropperTitle?: ReactNode;
  /**
   * @zh 裁剪框旁边的附加内容
   * @en Content on the side of cropper box
   */
  extraCropperContent?: ReactNode;
  /**
   * @zh 触发裁剪时的回调
   * @en Callback for image cropped
   */
  onCrop?: () => void;
  /**
   * @zh 裁剪就绪时的回调
   * @en Callback for cropper ready
   */
  onCropperReady?: () => void;
  /**
   * @zh 裁剪组件额外属性
   * @en additional props of crop component
   */
  cropperProps?: Partial<Cropper.Options>;
  /**
   * @zh 对话框额外属性
   * @en additional props of modal component
   */
  modalProps?: Partial<ConfirmProps>;
}
