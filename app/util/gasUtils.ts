import BigNumber from 'bignumber.js';

/**
 * The increment value for gas limit adjustments
 */
export const GAS_LIMIT_INCREMENT: BigNumber = new BigNumber(1000);

/**
 * The increment value for gas price adjustments
 */
export const GAS_PRICE_INCREMENT: BigNumber = new BigNumber(1);

/**
 * The minimum gas limit value
 */
export const GAS_LIMIT_MIN: BigNumber = new BigNumber(21000);

/**
 * The minimum gas price value
 */
export const GAS_PRICE_MIN: BigNumber = new BigNumber(0);
