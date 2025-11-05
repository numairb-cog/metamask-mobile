import { Dimensions, Platform } from 'react-native';
import { hasNotch, getApiLevel } from 'react-native-device-info';

/**
 * Device utility class for detecting device characteristics
 */
export default class Device {
  /**
   * Gets the device width
   *
   * @returns The device width in pixels
   */
  static getDeviceWidth(): number {
    return Dimensions.get('window').width;
  }

  /**
   * Gets the device height
   *
   * @returns The device height in pixels
   */
  static getDeviceHeight(): number {
    return Dimensions.get('window').height;
  }

  /**
   * Checks if the device is iOS
   *
   * @returns True if the device is iOS
   */
  static isIos(): boolean {
    return Platform.OS === 'ios';
  }

  /**
   * Checks if the device is Android
   *
   * @returns True if the device is Android
   */
  static isAndroid(): boolean {
    return Platform.OS === 'android';
  }

  /**
   * Checks if the device is an iPad
   *
   * @returns True if the device is an iPad
   */
  static isIpad(): boolean {
    return this.getDeviceWidth() >= 1000 || this.getDeviceHeight() >= 1000;
  }

  /**
   * Checks if the device is in landscape orientation
   *
   * @returns True if the device is in landscape
   */
  static isLandscape(): boolean {
    return this.getDeviceWidth() > this.getDeviceHeight();
  }

  /**
   * Checks if the device is an iPhone 5
   *
   * @returns True if the device is an iPhone 5
   */
  static isIphone5(): boolean {
    return this.getDeviceWidth() === 320;
  }

  /**
   * Checks if the device is an iPhone 5S
   *
   * @returns True if the device is an iPhone 5S
   */
  static isIphone5S(): boolean {
    return this.getDeviceWidth() === 320;
  }

  /**
   * Checks if the device is an iPhone 6
   *
   * @returns True if the device is an iPhone 6
   */
  static isIphone6(): boolean {
    return this.getDeviceWidth() === 375;
  }

  /**
   * Checks if the device is an iPhone 6 Plus
   *
   * @returns True if the device is an iPhone 6 Plus
   */
  static isIphone6Plus(): boolean {
    return this.getDeviceWidth() === 414;
  }

  /**
   * Checks if the device is an iPhone 6S Plus
   *
   * @returns True if the device is an iPhone 6S Plus
   */
  static isIphone6SPlus(): boolean {
    return this.getDeviceWidth() === 414;
  }

  /**
   * Checks if the device is an iPhone X or newer
   *
   * @returns True if the device is an iPhone X or newer
   */
  static isIphoneX(): boolean {
    return this.getDeviceWidth() >= 375 && this.getDeviceHeight() >= 812;
  }

  /**
   * Checks if the device is an iPad 9.7" in portrait orientation
   *
   * @returns True if the device is an iPad 9.7" in portrait
   */
  static isIpadPortrait9_7(): boolean {
    return this.getDeviceHeight() === 1024 && this.getDeviceWidth() === 736;
  }

  /**
   * Checks if the device is an iPad 9.7" in landscape orientation
   *
   * @returns True if the device is an iPad 9.7" in landscape
   */
  static isIpadLandscape9_7(): boolean {
    return this.getDeviceHeight() === 736 && this.getDeviceWidth() === 1024;
  }

  /**
   * Checks if the device is an iPad 10.5" in portrait orientation
   *
   * @returns True if the device is an iPad 10.5" in portrait
   */
  static isIpadPortrait10_5(): boolean {
    return this.getDeviceHeight() === 1112 && this.getDeviceWidth() === 834;
  }

  /**
   * Checks if the device is an iPad 10.5" in landscape orientation
   *
   * @returns True if the device is an iPad 10.5" in landscape
   */
  static isIpadLandscape10_5(): boolean {
    return this.getDeviceWidth() === 1112 && this.getDeviceHeight() === 834;
  }

  /**
   * Checks if the device is an iPad 12.9" in portrait orientation
   *
   * @returns True if the device is an iPad 12.9" in portrait
   */
  static isIpadPortrait12_9(): boolean {
    return this.getDeviceWidth() === 1024 && this.getDeviceHeight() === 1366;
  }

  /**
   * Checks if the device is an iPad 12.9" in landscape orientation
   *
   * @returns True if the device is an iPad 12.9" in landscape
   */
  static isIpadLandscape12_9(): boolean {
    return this.getDeviceWidth() === 1366 && this.getDeviceHeight() === 1024;
  }

  /**
   * Checks if the device is a small device
   *
   * @returns True if the device height is less than 600
   */
  static isSmallDevice(): boolean {
    return this.getDeviceHeight() < 600;
  }

  /**
   * Checks if the device is a medium device
   *
   * @returns True if the device height is less than 736
   */
  static isMediumDevice(): boolean {
    return this.getDeviceHeight() < 736;
  }

  /**
   * Checks if the device is a large device
   *
   * @returns True if the device height is greater than 736
   */
  static isLargeDevice(): boolean {
    return this.getDeviceHeight() > 736;
  }

  /**
   * Checks if the device has a notch
   *
   * @returns True if the device has a notch
   */
  static hasNotch(): boolean {
    return hasNotch();
  }

  /**
   * Gets the device API level (Android only)
   *
   * @returns The device API level
   */
  static async getDeviceAPILevel(): Promise<number> {
    const apiLevel = await getApiLevel();
    return apiLevel;
  }
}
