import { Dimensions, PixelRatio } from 'react-native';

// baseModel 0
const IPHONE_6_WIDTH = 375;
const IPHONE_6_HEIGHT = 667;

// baseModel 1
const IPHONE_11_PRO_WIDTH = 375;
const IPHONE_11_PRO_HEIGHT = 812;

// baseModel 2
const IPHONE_11_PRO_MAX_WIDTH = 414;
const IPHONE_11_PRO_MAX_HEIGHT = 896;

/**
 * Device dimensions
 */
interface DeviceDimensions {
  width: number;
  height: number;
}

/**
 * Scaling options
 */
interface ScaleOptions {
  factor?: number;
  scaleVertical?: boolean;
  scaleUp?: boolean;
  baseSize?: number;
  baseModel?: number;
}

/**
 * Gets the base model dimensions based on the model number
 *
 * @param baseModel - The base model number (0, 1, or 2)
 * @returns The width and height of the base model
 */
const getBaseModel = (baseModel?: number): DeviceDimensions => {
  if (baseModel === 1) {
    return { width: IPHONE_11_PRO_WIDTH, height: IPHONE_11_PRO_HEIGHT };
  } else if (baseModel === 2) {
    return { width: IPHONE_11_PRO_MAX_WIDTH, height: IPHONE_11_PRO_MAX_HEIGHT };
  }

  return { width: IPHONE_6_WIDTH, height: IPHONE_6_HEIGHT };
};

/**
 * Gets the current and base screen sizes
 *
 * @param scaleVertical - Whether to scale vertically
 * @param baseModel - The base model number
 * @returns The current size and base screen size
 */
const _getSizes = (
  scaleVertical?: boolean,
  baseModel?: number,
): { currSize: number; baseScreenSize: number } => {
  const { width, height } = Dimensions.get('window');
  const CURR_WIDTH = width < height ? width : height;
  const CURR_HEIGHT = height > width ? height : width;

  let currSize = CURR_WIDTH;
  let baseScreenSize = getBaseModel(baseModel).width;

  if (scaleVertical) {
    currSize = CURR_HEIGHT;
    baseScreenSize = getBaseModel(baseModel).height;
  }

  return { currSize, baseScreenSize };
};

/**
 * Scales a size based on the current device dimensions
 *
 * @param size - The size to scale
 * @param options - Scaling options
 * @returns The scaled size
 */
const scale = (size: number, options: ScaleOptions = {}): number => {
  const {
    factor = 1,
    scaleVertical = false,
    scaleUp = false,
    baseSize = undefined,
    baseModel,
  } = options;

  const { currSize, baseScreenSize } = _getSizes(scaleVertical, baseModel);
  const sizeScaled = ((baseSize || currSize) / baseScreenSize) * size;

  if (sizeScaled <= size || scaleUp) {
    return PixelRatio.roundToNearestPixel(size + (sizeScaled - size) * factor);
  }

  return size;
};

/**
 * Scales a size vertically based on the current device dimensions
 *
 * @param size - The size to scale
 * @param options - Scaling options
 * @returns The scaled size
 */
const scaleVertical = (size: number, options?: ScaleOptions): number =>
  scale(size, { scaleVertical: true, ...options });

export default { scale, scaleVertical, IPHONE_6_WIDTH, IPHONE_6_HEIGHT };
