import AppConstants from '../../core/AppConstants';
import { AvatarAccountType } from '../../component-library/components/Avatars/Avatar/variants/AvatarAccount/AvatarAccount.types';

interface SettingsState {
  searchEngine: string;
  primaryCurrency: string;
  lockTime: number;
  avatarAccountType: AvatarAccountType;
  hideZeroBalanceTokens: boolean;
  basicFunctionalityEnabled: boolean;
  deepLinkModalDisabled: boolean;
  showHexData?: boolean;
  showCustomNonce?: boolean;
  showFiatOnTestnets?: boolean;
  deviceNotificationEnabled?: boolean;
}

const initialState: SettingsState = {
  searchEngine: AppConstants.DEFAULT_SEARCH_ENGINE,
  primaryCurrency: 'ETH',
  lockTime: -1,
  avatarAccountType: AvatarAccountType.Maskicon,
  hideZeroBalanceTokens: false,
  basicFunctionalityEnabled: true,
  deepLinkModalDisabled: false,
};

interface SetSearchEngineAction {
  type: 'SET_SEARCH_ENGINE';
  searchEngine: string;
}

interface SetLockTimeAction {
  type: 'SET_LOCK_TIME';
  lockTime: number;
}

interface SetShowHexDataAction {
  type: 'SET_SHOW_HEX_DATA';
  showHexData: boolean;
}

interface SetShowCustomNonceAction {
  type: 'SET_SHOW_CUSTOM_NONCE';
  showCustomNonce: boolean;
}

interface SetHideZeroBalanceTokensAction {
  type: 'SET_HIDE_ZERO_BALANCE_TOKENS';
  hideZeroBalanceTokens: boolean;
}

interface SetAvatarAccountTypeAction {
  type: 'SET_AVATAR_ACCOUNT_TYPE';
  avatarAccountType: AvatarAccountType;
}

interface SetPrimaryCurrencyAction {
  type: 'SET_PRIMARY_CURRENCY';
  primaryCurrency: string;
}

interface SetShowFiatOnTestnetsAction {
  type: 'SET_SHOW_FIAT_ON_TESTNETS';
  showFiatOnTestnets: boolean;
}

interface ToggleBasicFunctionalityAction {
  type: 'TOGGLE_BASIC_FUNCTIONALITY';
  basicFunctionalityEnabled: boolean;
}

interface ToggleDeviceNotificationsAction {
  type: 'TOGGLE_DEVICE_NOTIFICATIONS';
  deviceNotificationEnabled: boolean;
}

interface SetDeepLinkModalDisabledAction {
  type: 'SET_DEEP_LINK_MODAL_DISABLED';
  deepLinkModalDisabled: boolean;
}

type SettingsAction =
  | SetSearchEngineAction
  | SetLockTimeAction
  | SetShowHexDataAction
  | SetShowCustomNonceAction
  | SetHideZeroBalanceTokensAction
  | SetAvatarAccountTypeAction
  | SetPrimaryCurrencyAction
  | SetShowFiatOnTestnetsAction
  | ToggleBasicFunctionalityAction
  | ToggleDeviceNotificationsAction
  | SetDeepLinkModalDisabledAction;

/* eslint-disable @typescript-eslint/default-param-last */
const settingsReducer = (
  state: SettingsState = initialState,
  action: SettingsAction,
): SettingsState => {
  switch (action.type) {
    case 'SET_SEARCH_ENGINE':
      return {
        ...state,
        searchEngine: action.searchEngine,
      };
    case 'SET_LOCK_TIME':
      return {
        ...state,
        lockTime: action.lockTime,
      };
    case 'SET_SHOW_HEX_DATA':
      return {
        ...state,
        showHexData: action.showHexData,
      };
    case 'SET_SHOW_CUSTOM_NONCE':
      return {
        ...state,
        showCustomNonce: action.showCustomNonce,
      };
    case 'SET_HIDE_ZERO_BALANCE_TOKENS':
      return {
        ...state,
        hideZeroBalanceTokens: action.hideZeroBalanceTokens,
      };
    case 'SET_AVATAR_ACCOUNT_TYPE':
      return {
        ...state,
        avatarAccountType: action.avatarAccountType,
      };
    case 'SET_PRIMARY_CURRENCY':
      return {
        ...state,
        primaryCurrency: action.primaryCurrency,
      };
    case 'SET_SHOW_FIAT_ON_TESTNETS':
      return {
        ...state,
        showFiatOnTestnets: action.showFiatOnTestnets,
      };
    case 'TOGGLE_BASIC_FUNCTIONALITY':
      return {
        ...state,
        basicFunctionalityEnabled: action.basicFunctionalityEnabled,
      };
    case 'TOGGLE_DEVICE_NOTIFICATIONS':
      return {
        ...state,
        deviceNotificationEnabled: action.deviceNotificationEnabled,
      };
    case 'SET_DEEP_LINK_MODAL_DISABLED':
      return {
        ...state,
        deepLinkModalDisabled: action.deepLinkModalDisabled,
      };
    default:
      return state;
  }
};
/* eslint-enable @typescript-eslint/default-param-last */

export default settingsReducer;
