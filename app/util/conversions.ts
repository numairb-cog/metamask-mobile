import { hexToBN } from '@metamask/controller-utils';
import { ETH, GWEI, WEI } from './custom-gas';
import {
  conversionUtil,
  addCurrencies,
  subtractCurrencies,
} from './conversion';
import { formatCurrency } from './confirm-tx.js';
import { addHexPrefix } from './number';

/**
 * Converts a hexadecimal value to decimal
 *
 * @param hexValue - The hexadecimal value to convert
 * @returns The decimal representation
 */
export function hexToDecimal(hexValue: string): string {
  return conversionUtil(hexValue, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
  });
}

/**
 * Converts a decimal value to hexadecimal
 *
 * @param decimal - The decimal value to convert
 * @returns The hexadecimal representation
 */
export function decimalToHex(decimal: string | number): string {
  return conversionUtil(decimal, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
  });
}

/**
 * Gets ETH conversion from Wei hex value
 *
 * @param params - Conversion parameters
 * @param params.value - The Wei hex value
 * @param params.fromCurrency - The source currency (default: ETH)
 * @param params.conversionRate - The conversion rate
 * @param params.numberOfDecimals - Number of decimals (default: 6)
 * @returns The formatted conversion string
 */
export function getEthConversionFromWeiHex({
  value,
  fromCurrency = ETH,
  conversionRate,
  numberOfDecimals = 6,
}: {
  value: string;
  fromCurrency?: string;
  conversionRate?: number;
  numberOfDecimals?: number;
}): string | undefined {
  const denominations = [fromCurrency, GWEI, WEI];

  let nonZeroDenomination: string | undefined;

  for (let i = 0; i < denominations.length; i++) {
    const convertedValue = getValueFromWeiHex({
      value,
      conversionRate,
      fromCurrency,
      toCurrency: fromCurrency,
      numberOfDecimals,
      toDenomination: denominations[i],
    });

    if (convertedValue !== '0' || i === denominations.length - 1) {
      nonZeroDenomination = `${convertedValue} ${denominations[i]}`;
      break;
    }
  }

  return nonZeroDenomination;
}

/**
 * Gets value from Wei hex
 *
 * @param params - Conversion parameters
 * @param params.value - The Wei hex value
 * @param params.fromCurrency - The source currency (default: ETH)
 * @param params.toCurrency - The target currency
 * @param params.conversionRate - The conversion rate
 * @param params.numberOfDecimals - Number of decimals
 * @param params.toDenomination - Target denomination
 * @returns The converted value
 */
export function getValueFromWeiHex({
  value,
  fromCurrency = ETH,
  toCurrency,
  conversionRate,
  numberOfDecimals,
  toDenomination,
}: {
  value: string;
  fromCurrency?: string;
  toCurrency?: string;
  conversionRate?: number;
  numberOfDecimals?: number;
  toDenomination?: string;
}): string {
  return conversionUtil(value, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromCurrency,
    toCurrency,
    numberOfDecimals,
    fromDenomination: WEI,
    toDenomination,
    conversionRate,
  });
}

/**
 * Gets Wei hex from decimal value
 *
 * @param params - Conversion parameters
 * @param params.value - The decimal value
 * @param params.fromCurrency - The source currency
 * @param params.conversionRate - The conversion rate
 * @param params.fromDenomination - Source denomination
 * @param params.invertConversionRate - Whether to invert the conversion rate
 * @returns The Wei hex value
 */
export function getWeiHexFromDecimalValue({
  value,
  fromCurrency,
  conversionRate,
  fromDenomination,
  invertConversionRate,
}: {
  value: string | number;
  fromCurrency?: string;
  conversionRate?: number;
  fromDenomination?: string;
  invertConversionRate?: boolean;
}): string {
  return conversionUtil(value, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
    toCurrency: ETH,
    fromCurrency,
    conversionRate,
    invertConversionRate,
    fromDenomination,
    toDenomination: WEI,
  });
}

/**
 * Adds two hex WEI values and returns decimal
 *
 * @param aHexWEI - First hex WEI value
 * @param bHexWEI - Second hex WEI value
 * @returns The sum in decimal
 */
export function addHexWEIsToDec(aHexWEI: string, bHexWEI: string): string {
  return addCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    fromDenomination: 'WEI',
    numberOfDecimals: 6,
  });
}

/**
 * Subtracts two hex WEI values and returns decimal
 *
 * @param aHexWEI - First hex WEI value
 * @param bHexWEI - Second hex WEI value
 * @returns The difference in decimal
 */
export function subtractHexWEIsToDec(aHexWEI: string, bHexWEI: string): string {
  return subtractCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    fromDenomination: 'WEI',
    numberOfDecimals: 6,
  });
}

/**
 * Converts decimal ETH to converted currency
 *
 * @param ethTotal - The ETH total in decimal
 * @param convertedCurrency - The target currency
 * @param conversionRate - The conversion rate
 * @returns The converted currency value
 */
export function decEthToConvertedCurrency(
  ethTotal: string,
  convertedCurrency: string,
  conversionRate: number,
): string {
  return conversionUtil(ethTotal, {
    fromNumericBase: 'dec',
    toNumericBase: 'dec',
    fromCurrency: 'ETH',
    toCurrency: convertedCurrency,
    numberOfDecimals: 2,
    conversionRate,
  });
}

/**
 * Converts decimal GWEI to hex WEI
 *
 * @param decGWEI - The decimal GWEI value
 * @returns The hex WEI value
 */
export function decGWEIToHexWEI(decGWEI: string | number): string {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
    fromDenomination: 'GWEI',
    toDenomination: 'WEI',
  });
}

/**
 * Converts hex GWEI to hex WEI
 *
 * @param decGWEI - The hex GWEI value
 * @returns The hex WEI value
 */
export function hexGWEIToHexWEI(decGWEI: string): string {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'hex',
    fromDenomination: 'GWEI',
    toDenomination: 'WEI',
  });
}

/**
 * Converts hex WEI to decimal GWEI
 *
 * @param decGWEI - The hex WEI value
 * @returns The decimal GWEI value
 */
export function hexWEIToDecGWEI(decGWEI: string): string {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    toDenomination: 'GWEI',
  });
}

/**
 * Converts decimal ETH to decimal WEI
 *
 * @param decEth - The decimal ETH value
 * @returns The decimal WEI value
 */
export function decETHToDecWEI(decEth: string | number): string {
  return conversionUtil(decEth, {
    fromNumericBase: 'dec',
    toNumericBase: 'dec',
    fromDenomination: 'ETH',
    toDenomination: 'WEI',
  });
}

/**
 * Converts hex WEI to decimal ETH
 *
 * @param hexWEI - The hex WEI value
 * @returns The decimal ETH value
 */
export function hexWEIToDecETH(hexWEI: string): string {
  return conversionUtil(hexWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    toDenomination: 'ETH',
  });
}

/**
 * Adds two hex values
 *
 * @param aHexWEI - First hex value
 * @param bHexWEI - Second hex value
 * @returns The sum in hex
 */
export function addHexes(aHexWEI: string, bHexWEI: string): string {
  return addCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    toNumericBase: 'hex',
    numberOfDecimals: 6,
  });
}

/**
 * Sums an array of hex WEI values
 *
 * @param hexWEIs - Array of hex WEI values
 * @returns The sum in hex
 */
export function sumHexWEIs(hexWEIs: string[]): string {
  return hexWEIs.filter(Boolean).reduce(addHexes);
}

/**
 * Sums hex WEI values to unformatted fiat
 *
 * @param hexWEIs - Array of hex WEI values
 * @param convertedCurrency - The target currency
 * @param conversionRate - The conversion rate
 * @returns The unformatted fiat value
 */
export function sumHexWEIsToUnformattedFiat(
  hexWEIs: string[],
  convertedCurrency: string,
  conversionRate: number,
): string {
  const hexWEIsSum = sumHexWEIs(hexWEIs);
  const convertedTotal = decEthToConvertedCurrency(
    getValueFromWeiHex({
      value: hexWEIsSum,
      toCurrency: 'ETH',
      numberOfDecimals: 4,
    }),
    convertedCurrency,
    conversionRate,
  );
  return convertedTotal;
}

/**
 * Sums hex WEI values to renderable fiat
 *
 * @param hexWEIs - Array of hex WEI values
 * @param convertedCurrency - The target currency
 * @param conversionRate - The conversion rate
 * @returns The formatted fiat value
 */
export function sumHexWEIsToRenderableFiat(
  hexWEIs: string[],
  convertedCurrency: string,
  conversionRate: number,
): string {
  const convertedTotal = sumHexWEIsToUnformattedFiat(
    hexWEIs,
    convertedCurrency,
    conversionRate,
  );
  return formatCurrency(convertedTotal, convertedCurrency);
}

/**
 * Formats ETH fee
 *
 * @param ethFee - The ETH fee value
 * @param currencySymbol - The currency symbol (default: 'ETH')
 * @param showLessThan - Whether to show less than for zero values
 * @returns The formatted fee string
 */
export function formatETHFee(
  ethFee: string,
  currencySymbol = 'ETH',
  showLessThan?: boolean,
): string {
  if (showLessThan && ethFee === '0') return `< 0.000001 ${currencySymbol}`;
  return `${ethFee} ${currencySymbol}`;
}

/**
 * Sums hex WEI values to renderable ETH
 *
 * @param hexWEIs - Array of hex WEI values
 * @returns The formatted ETH value
 */
export function sumHexWEIsToRenderableEth(hexWEIs: string[]): string {
  const hexWEIsSum = hexWEIs.filter(Boolean).reduce(addHexes);
  return formatETHFee(
    getValueFromWeiHex({
      value: hexWEIsSum,
      toCurrency: 'ETH',
      numberOfDecimals: 6,
    }),
  );
}

/**
 * Multiplies two hex values
 *
 * @param hex1 - First hex value
 * @param hex2 - Second hex value
 * @returns The product in hex
 */
export function multiplyHexes(hex1: string, hex2: string): string {
  return hexToBN(hex1).mul(hexToBN(hex2)).toString(16);
}

/**
 * Converts decimal to prefixed hex
 *
 * @param decimal - The decimal value
 * @returns The prefixed hex value
 */
export function decimalToPrefixedHex(decimal: string | number): string {
  return addHexPrefix(decimalToHex(decimal));
}
