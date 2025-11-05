import BigNumber from 'bignumber.js';
import BN from 'bnjs4';
import { addHexPrefix } from './number';

import {
  conversionUtil,
  addCurrencies,
  multiplyCurrencies,
  conversionGreaterThan,
} from './conversion';
import I18n from '../../locales/i18n';
import { getIntlNumberFormatter } from './intl';

const NON_ISO4217_CRYPTO_CODES = [
  '1ST',
  'DASH',
  'MYST',
  'PTOY',
  'QTUM',
  'SC',
  'SNGLS',
  'STORJ',
  'STEEM',
  'TIME',
  'TRST',
  'USDC',
  'USDT',
  'WINGS',
  'ZEC',
];

/**
 * Increases the last gas price by 10%
 *
 * @param lastGasPrice - The last gas price in hex format
 * @returns The increased gas price in hex format
 */
export function increaseLastGasPrice(lastGasPrice?: string): string {
  return addHexPrefix(
    multiplyCurrencies(lastGasPrice || '0x0', 1.1, {
      multiplicandBase: 16,
      multiplierBase: 10,
      toNumericBase: 'hex',
    }) as string,
  );
}

/**
 * Compares two hex values
 *
 * @param a - First hex value
 * @param b - Second hex value
 * @returns True if a is greater than b
 */
export function hexGreaterThan(a: string, b: string): boolean {
  return conversionGreaterThan(
    { value: a, fromNumericBase: 'hex' },
    { value: b, fromNumericBase: 'hex' },
  );
}

/**
 * Calculates the total gas cost in hex format
 *
 * @param params - Gas parameters
 * @param params.gasLimit - Gas limit in hex format
 * @param params.gasPrice - Gas price in hex format
 * @returns The total gas cost in hex format
 */
export function getHexGasTotal({
  gasLimit,
  gasPrice,
}: {
  gasLimit?: string;
  gasPrice?: string;
}): string {
  return addHexPrefix(
    multiplyCurrencies(gasLimit || '0x0', gasPrice || '0x0', {
      toNumericBase: 'hex',
      multiplicandBase: 16,
      multiplierBase: 16,
    }) as string,
  );
}

/**
 * Adds multiple ETH amounts together
 *
 * @param args - ETH amounts to add
 * @returns The sum of all ETH amounts
 */
export function addEth(
  ...args: (string | BigNumber)[]
): string | BigNumber | BN {
  return args.reduce((acc, ethAmount) =>
    addCurrencies(acc, ethAmount, {
      toNumericBase: 'dec',
      numberOfDecimals: 6,
      aBase: 10,
      bBase: 10,
    }),
  );
}

/**
 * Adds multiple fiat amounts together
 *
 * @param args - Fiat amounts to add
 * @returns The sum of all fiat amounts
 */
export function addFiat(
  ...args: (string | BigNumber)[]
): string | BigNumber | BN {
  return args.reduce((acc, fiatAmount) =>
    addCurrencies(acc, fiatAmount, {
      toNumericBase: 'dec',
      numberOfDecimals: 2,
      aBase: 10,
      bBase: 10,
    }),
  );
}

/**
 * Converts a value from WEI hex to the specified currency and denomination
 *
 * @param params - Conversion parameters
 * @param params.value - Value in WEI hex format
 * @param params.fromCurrency - Source currency (default: 'ETH')
 * @param params.toCurrency - Target currency
 * @param params.conversionRate - Conversion rate
 * @param params.numberOfDecimals - Number of decimal places
 * @param params.toDenomination - Target denomination
 * @returns The converted value
 */
export function getValueFromWeiHex({
  value,
  fromCurrency = 'ETH',
  toCurrency,
  conversionRate,
  numberOfDecimals,
  toDenomination,
}: {
  value: string | BigNumber | BN;
  fromCurrency?: string;
  toCurrency?: string;
  conversionRate?: number;
  numberOfDecimals?: number;
  toDenomination?: 'WEI' | 'GWEI' | 'ETH';
}): string | BigNumber | BN | number {
  return conversionUtil(value, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromCurrency,
    toCurrency,
    numberOfDecimals,
    fromDenomination: 'WEI',
    toDenomination,
    conversionRate,
  });
}

/**
 * Calculates the transaction fee
 *
 * @param params - Transaction fee parameters
 * @param params.value - Value in BN format
 * @param params.fromCurrency - Source currency (default: 'ETH')
 * @param params.toCurrency - Target currency
 * @param params.conversionRate - Conversion rate
 * @param params.numberOfDecimals - Number of decimal places
 * @returns The transaction fee
 */
export function getTransactionFee({
  value,
  fromCurrency = 'ETH',
  toCurrency,
  conversionRate,
  numberOfDecimals,
}: {
  value: string | BigNumber | BN;
  fromCurrency?: string;
  toCurrency?: string;
  conversionRate?: number;
  numberOfDecimals?: number;
}): string | BigNumber | BN | number {
  return conversionUtil(value, {
    fromNumericBase: 'BN',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    fromCurrency,
    toCurrency,
    numberOfDecimals,
    conversionRate,
  });
}

/**
 * Formats a currency value according to locale and currency code
 *
 * @param value - The value to format
 * @param currencyCode - The currency code
 * @returns The formatted currency string
 */
export function formatCurrency(
  value: string | number,
  currencyCode: string,
): string {
  const upperCaseCurrencyCode = currencyCode.toUpperCase();

  const formatedCurrency = NON_ISO4217_CRYPTO_CODES.includes(
    upperCaseCurrencyCode,
  )
    ? `${Number(value)} ${upperCaseCurrencyCode}`
    : getIntlNumberFormatter(I18n.locale, {
        currency: upperCaseCurrencyCode,
        style: 'currency',
      }).format(Number(value));

  return formatedCurrency;
}

/**
 * Converts a token value to fiat currency
 *
 * @param params - Conversion parameters
 * @param params.value - Token value
 * @param params.fromCurrency - Source currency (default: 'ETH')
 * @param params.toCurrency - Target currency
 * @param params.conversionRate - ETH to fiat conversion rate
 * @param params.contractExchangeRate - Token to ETH exchange rate
 * @returns The fiat value or 0 if no exchange rate
 */
export function convertTokenToFiat({
  value,
  fromCurrency = 'ETH',
  toCurrency,
  conversionRate,
  contractExchangeRate,
}: {
  value: string | BigNumber | BN;
  fromCurrency?: string;
  toCurrency?: string;
  conversionRate: number;
  contractExchangeRate?: number;
}): string | BigNumber | BN | number {
  if (!contractExchangeRate) return 0;
  const totalExchangeRate = conversionRate * contractExchangeRate;

  return conversionUtil(value, {
    fromNumericBase: 'dec',
    toNumericBase: 'dec',
    fromCurrency,
    toCurrency,
    numberOfDecimals: 2,
    conversionRate: totalExchangeRate,
  });
}

/**
 * Rounds the given decimal string to 4 significant digits
 *
 * @param decimalString - The base-ten number to round
 * @returns The rounded number, or the original number if no rounding was necessary
 */
export function roundExponential(decimalString: string): string {
  const PRECISION = 4;
  const bigNumberValue = new BigNumber(decimalString);

  // In JS, numbers with exponentials greater than 20 get displayed as an exponential.
  return bigNumberValue.e > 20
    ? bigNumberValue.toPrecision(PRECISION)
    : decimalString;
}
