import { WaterMarkProps } from './index';
import { transformToNumber } from './_utils/transform';
import { isString } from './_utils/is';
import getPixelRatio from './_utils/getPixelRatio';

type CanvasWMProps = WaterMarkProps & {
  container: HTMLElement;
};

const defaultGaps = { x: 200, y: 200 };
const defaultFontStyle: WaterMarkProps['fontStyle'] = {
  fontSize: '14px',
  color: 'rgba(0, 0, 0, 0.12)',
  fontFamily: 'sans-serif',
  fontWeight: 'normal',
};

const commonStyle: string = `
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  pointer-events: none;`;

const prefix = '__wm';

const identify = '__data_vm_identify';

const getIdentifyDom = (container: Element) => {
  const children = container.childNodes;
  for (let i = 0; i < children.length; i++) {
    if (children[i].nodeType === Node.ELEMENT_NODE) {
      const currentDom = children[i] as Element;
      if (currentDom.getAttribute(identify) === identify) {
        return currentDom;
      }
    }
  }
};

const CanvasWM = (params: CanvasWMProps) => {
  const {
    width = 200,
    height = 40,
    content,
    image,
    rotate = -30,
    fontStyle = {},
    gaps = {},
    offsets = {},
    wmId,
    zIndex = 100,
    container,
  } = params;

  const markedWidth = transformToNumber(width);
  const markedHeight = transformToNumber(height);

  const mergedGaps = {
    x: transformToNumber(gaps.x !== undefined ? gaps.x : defaultGaps.x),
    y: transformToNumber(gaps.y !== undefined ? gaps.y : defaultGaps.y),
  };

  const mergedOffset = {
    x: transformToNumber(offsets.x !== undefined ? offsets.x : mergedGaps.x / 2),
    y: transformToNumber(offsets.y !== undefined ? offsets.y : mergedGaps.y / 2),
  };

  const canvasWidth = 2 * mergedOffset.x + markedWidth;
  const canvasHeight = 2 * mergedOffset.y + markedHeight;

  const mergedStyle = {
    ...defaultFontStyle,
    ...fontStyle,
  };

  const watermarkedId = !!wmId || wmId === 0 ? `${prefix}-${wmId}` : undefined;
  const __wm =
    (watermarkedId && document.getElementById(watermarkedId)) || getIdentifyDom(container);
  const watermarkDiv = __wm || document.createElement('div');

  const updateMark = (base64Url: string) => {
    const wmStyle = `
  ${commonStyle}
  z-index:${zIndex};
  background-size:${mergedGaps.x + markedWidth}px ${mergedGaps.y + markedHeight}px;
  background-repeat: repeat;
  background-image:url(${base64Url})`;
    watermarkDiv.setAttribute('style', wmStyle.trim());
    watermarkDiv.setAttribute(identify, identify);
  };

  const canvas = document.createElement('canvas');

  const ctx = canvas.getContext('2d');
  const ratio = getPixelRatio(ctx);

  canvas.setAttribute('width', `${canvasWidth * ratio}px`);
  canvas.setAttribute('height', `${canvasHeight * ratio}px`);
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  ctx.translate(canvasWidth, canvasHeight);
  ctx.scale(ratio, ratio);

  const RotateAngle = (rotate * Math.PI) / 180;
  ctx.rotate(RotateAngle);

  if (isString(content)) {
    const { fontSize, color, fontWeight, fontFamily } = mergedStyle;
    const markedSize = transformToNumber(fontSize);
    ctx.fillStyle = color;

    ctx.font = `${fontWeight} ${markedSize}px ${fontFamily}`;
    ctx.fillText(content as string, -width / 2, -height / 2);
    updateMark(canvas.toDataURL());
  } else if (image) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.src = image;
    img.onload = () => {
      ctx.drawImage(
        img,
        -width / 2,
        -height / 2,
        transformToNumber(width),
        transformToNumber(height)
      );
      updateMark(canvas.toDataURL());
    };
  }

  if (!__wm) {
    container.style.position = 'relative';
    container.insertBefore(watermarkDiv, container.firstChild);
  }

  if (watermarkedId) {
    let mo = new MutationObserver((mutations) => {
      const __wm = document.querySelector(watermarkedId);
      const changedMutations = mutations.filter((record) => {
        const target = record.target;

        if (target && target.isSameNode(container) && container.style.position !== 'relative') {
          container.style.position = 'relative';
        }

        if (target.nodeType === Node.ELEMENT_NODE) {
          const id = (target as Element).id;
          return id === watermarkedId && record.type === 'attributes';
        }
      });

      const isChanged = !__wm || changedMutations.length;
      if (isChanged) {
        mo.disconnect();
        mo = null;
        CanvasWM(params);
      }
    });

    mo.observe(container, {
      attributes: true,
      subtree: true,
      childList: true,
    });
  }
};

export default CanvasWM;
