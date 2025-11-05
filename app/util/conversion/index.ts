/* Currency Conversion Utility
 * This utility function can be used for converting currency related values within metamask.
 * The caller should be able to pass it a value, along with information about the value's
 * numeric base, denomination and currency, and the desired numeric base, denomination and
 * currency. It should return a single value.
 *
 * The utility passes value along with the options as a single object to the `converter` function.
 * `converter` conditional modifies the supplied `value` property, depending
 * on the accompanying options.
 */

import BigNumber from 'bignumber.js';
import BN from 'bnjs4';

import { stripHexPrefix } from 'ethereumjs-util';

/**
 * Defines the base type of numeric value
 */
type NumericBase = 'hex' | 'dec' | 'BN';

/**
 * Defines which type of denomination a value is in
 */
type EthDenomination = 'WEI' | 'GWEI' | 'ETH';

// Big Number Constants
const BIG_NUMBER_WEI_MULTIPLIER = new BigNumber('1000000000000000000');
const BIG_NUMBER_GWEI_MULTIPLIER = new BigNumber('1000000000');
const BIG_NUMBER_ETH_MULTIPLIER = new BigNumber('1');

// Setter Maps
const toBigNumber: Record<NumericBase, (n: string | BN) => BigNumber> = {
  hex: (n: string | BN) => new BigNumber(stripHexPrefix(n as string), 16),
  dec: (n: string | BN) => new BigNumber(String(n), 10),
  BN: (n: string | BN) => new BigNumber((n as BN).toString(16), 16),
};
const toNormalizedDenomination: Record<
  EthDenomination,
  (bigNumber: BigNumber) => BigNumber
> = {
  WEI: (bigNumber: BigNumber) => bigNumber.div(BIG_NUMBER_WEI_MULTIPLIER),
  GWEI: (bigNumber: BigNumber) => bigNumber.div(BIG_NUMBER_GWEI_MULTIPLIER),
  ETH: (bigNumber: BigNumber) => bigNumber.div(BIG_NUMBER_ETH_MULTIPLIER),
};
const toSpecifiedDenomination: Record<
  EthDenomination,
  (bigNumber: BigNumber) => BigNumber
> = {
  WEI: (bigNumber: BigNumber) =>
    bigNumber.times(BIG_NUMBER_WEI_MULTIPLIER).decimalPlaces(0),
  GWEI: (bigNumber: BigNumber) =>
    bigNumber.times(BIG_NUMBER_GWEI_MULTIPLIER).decimalPlaces(9),
  ETH: (bigNumber: BigNumber) =>
    bigNumber.times(BIG_NUMBER_ETH_MULTIPLIER).decimalPlaces(9),
};
const baseChange: Record<NumericBase, (n: BigNumber) => string | BN> = {
  hex: (n: BigNumber) => n.toString(16),
  dec: (n: BigNumber) => new BigNumber(n).toString(10),
  BN: (n: BigNumber) => new BN(n.toString(16)),
};

// Utility function for checking base types
const isValidBase = (base: number): boolean =>
  Number.isInteger(base) && base > 1;

interface ConverterOptions {
  value: string | BigNumber | BN;
  fromNumericBase?: NumericBase;
  fromDenomination?: EthDenomination;
  fromCurrency?: string | null;
  toNumericBase?: NumericBase;
  toDenomination?: EthDenomination;
  toCurrency?: string | null;
  numberOfDecimals?: number;
  conversionRate?: number | null;
  invertConversionRate?: boolean;
  roundDown?: number;
}

/**
 * Utility method to convert a value between denominations, formats and currencies
 *
 * @param options - Conversion options
 * @returns The converted value
 */
const converter = ({
  value,
  fromNumericBase,
  fromDenomination,
  fromCurrency,
  toNumericBase,
  toDenomination,
  toCurrency,
  numberOfDecimals,
  conversionRate,
  invertConversionRate,
  roundDown,
}: ConverterOptions): string | BigNumber | BN => {
  let convertedValue: BigNumber = fromNumericBase
    ? toBigNumber[fromNumericBase](value as string | BN)
    : (value as BigNumber);

  if (fromDenomination) {
    convertedValue = toNormalizedDenomination[fromDenomination](convertedValue);
  }

  if (fromCurrency !== toCurrency) {
    if (conversionRate === null || conversionRate === undefined) {
      throw new Error(
        `Converting from ${fromCurrency} to ${toCurrency} requires a conversionRate, but one was not provided`,
      );
    }
    let rate = toBigNumber.dec(String(conversionRate));
    if (invertConversionRate) {
      rate = new BigNumber(1.0).div(conversionRate);
    }
    convertedValue = convertedValue.times(rate);
  }

  if (toDenomination) {
    convertedValue = toSpecifiedDenomination[toDenomination](convertedValue);
  }

  if (numberOfDecimals) {
    convertedValue = convertedValue.decimalPlaces(
      numberOfDecimals,
      BigNumber.ROUND_HALF_DOWN,
    );
  }

  if (roundDown) {
    convertedValue = convertedValue.decimalPlaces(
      roundDown,
      BigNumber.ROUND_DOWN,
    );
  }

  if (toNumericBase) {
    return baseChange[toNumericBase](convertedValue);
  }
  return convertedValue;
};

interface ConversionUtilOptions {
  fromCurrency?: string | null;
  toCurrency?: string | null;
  fromNumericBase?: NumericBase;
  toNumericBase?: NumericBase;
  fromDenomination?: EthDenomination;
  toDenomination?: EthDenomination;
  numberOfDecimals?: number;
  conversionRate?: number | null;
  invertConversionRate?: boolean;
}

const conversionUtil = (
  value: string | BigNumber | BN,
  {
    fromCurrency = null,
    toCurrency = fromCurrency,
    fromNumericBase,
    toNumericBase,
    fromDenomination,
    toDenomination,
    numberOfDecimals,
    conversionRate,
    invertConversionRate,
  }: ConversionUtilOptions,
): string | BigNumber | BN | number => {
  if (fromCurrency !== toCurrency && !conversionRate) {
    return 0;
  }
  return converter({
    fromCurrency,
    toCurrency,
    fromNumericBase,
    toNumericBase,
    fromDenomination,
    toDenomination,
    numberOfDecimals,
    conversionRate,
    invertConversionRate,
    value: value || '0',
  });
};

const getBigNumber = (value: string | BigNumber, base: number): BigNumber => {
  if (!isValidBase(base)) {
    throw new Error('Must specify valid base');
  }

  // We don't include 'number' here, because BigNumber will throw if passed
  // a number primitive it considers unsafe.
  if (typeof value === 'string' || value instanceof BigNumber) {
    return new BigNumber(value, base);
  }

  return new BigNumber(String(value), base);
};

interface CurrencyOptions extends Partial<ConverterOptions> {
  aBase?: number;
  bBase?: number;
  multiplicandBase?: number;
  multiplierBase?: number;
}

const addCurrencies = (
  a: string | BigNumber,
  b: string | BigNumber,
  options: CurrencyOptions = {},
): string | BigNumber | BN => {
  const { aBase, bBase, ...conversionOptions } = options;

  if (
    aBase === undefined ||
    bBase === undefined ||
    !isValidBase(aBase) ||
    !isValidBase(bBase)
  ) {
    throw new Error('Must specify valid aBase and bBase');
  }
  const value = getBigNumber(a, aBase).plus(getBigNumber(b, bBase));

  return converter({
    value,
    ...conversionOptions,
  });
};

const subtractCurrencies = (
  a: string | BigNumber,
  b: string | BigNumber,
  options: CurrencyOptions = {},
): string | BigNumber | BN => {
  const { aBase, bBase, ...conversionOptions } = options;

  if (
    aBase === undefined ||
    bBase === undefined ||
    !isValidBase(aBase) ||
    !isValidBase(bBase)
  ) {
    throw new Error('Must specify valid aBase and bBase');
  }

  const value = getBigNumber(a, aBase).minus(getBigNumber(b, bBase));

  return converter({
    value,
    ...conversionOptions,
  });
};

const multiplyCurrencies = (
  a: string | BigNumber | number,
  b: string | BigNumber | number,
  options: CurrencyOptions = {},
): string | BigNumber | BN => {
  const { multiplicandBase, multiplierBase, ...conversionOptions } = options;

  if (
    multiplicandBase === undefined ||
    multiplierBase === undefined ||
    !isValidBase(multiplicandBase) ||
    !isValidBase(multiplierBase)
  ) {
    throw new Error('Must specify valid multiplicandBase and multiplierBase');
  }

  const value = getBigNumber(String(a), multiplicandBase).times(
    getBigNumber(String(b), multiplierBase),
  );

  return converter({
    value,
    ...conversionOptions,
  });
};

const conversionGreaterThan = (
  firstProps: ConverterOptions,
  secondProps: ConverterOptions,
): boolean => {
  const firstValue = converter({ ...firstProps }) as BigNumber;
  const secondValue = converter({ ...secondProps }) as BigNumber;

  return firstValue.gt(secondValue);
};

const conversionLessThan = (
  firstProps: ConverterOptions,
  secondProps: ConverterOptions,
): boolean => {
  const firstValue = converter({ ...firstProps }) as BigNumber;
  const secondValue = converter({ ...secondProps }) as BigNumber;

  return firstValue.lt(secondValue);
};

const conversionMax = (
  firstProps: ConverterOptions,
  secondProps: ConverterOptions,
): string | BigNumber | BN => {
  const firstIsGreater = conversionGreaterThan(
    { ...firstProps },
    { ...secondProps },
  );

  return firstIsGreater ? firstProps.value : secondProps.value;
};

const conversionGTE = (
  firstProps: ConverterOptions,
  secondProps: ConverterOptions,
): boolean => {
  const firstValue = converter({ ...firstProps }) as BigNumber;
  const secondValue = converter({ ...secondProps }) as BigNumber;
  return firstValue.greaterThanOrEqualTo(secondValue);
};

const conversionLTE = (
  firstProps: ConverterOptions,
  secondProps: ConverterOptions,
): boolean => {
  const firstValue = converter({ ...firstProps }) as BigNumber;
  const secondValue = converter({ ...secondProps }) as BigNumber;
  return firstValue.lessThanOrEqualTo(secondValue);
};

const toNegative = (
  n: string | BigNumber | number,
  options: CurrencyOptions = {},
): string | BigNumber | BN => multiplyCurrencies(n, -1, options);

export {
  conversionUtil,
  addCurrencies,
  multiplyCurrencies,
  conversionGreaterThan,
  conversionLessThan,
  conversionGTE,
  conversionLTE,
  conversionMax,
  toNegative,
  subtractCurrencies,
};
