interface SetSearchEngineAction {
  type: 'SET_SEARCH_ENGINE';
  searchEngine: string;
}

export function setSearchEngine(searchEngine: string): SetSearchEngineAction {
  return {
    type: 'SET_SEARCH_ENGINE',
    searchEngine,
  };
}

interface SetShowHexDataAction {
  type: 'SET_SHOW_HEX_DATA';
  showHexData: boolean;
}

export function setShowHexData(showHexData: boolean): SetShowHexDataAction {
  return {
    type: 'SET_SHOW_HEX_DATA',
    showHexData,
  };
}

interface SetShowCustomNonceAction {
  type: 'SET_SHOW_CUSTOM_NONCE';
  showCustomNonce: boolean;
}

export function setShowCustomNonce(
  showCustomNonce: boolean,
): SetShowCustomNonceAction {
  return {
    type: 'SET_SHOW_CUSTOM_NONCE',
    showCustomNonce,
  };
}

interface SetShowFiatOnTestnetsAction {
  type: 'SET_SHOW_FIAT_ON_TESTNETS';
  showFiatOnTestnets: boolean;
}

export function setShowFiatOnTestnets(
  showFiatOnTestnets: boolean,
): SetShowFiatOnTestnetsAction {
  return {
    type: 'SET_SHOW_FIAT_ON_TESTNETS',
    showFiatOnTestnets,
  };
}

interface SetHideZeroBalanceTokensAction {
  type: 'SET_HIDE_ZERO_BALANCE_TOKENS';
  hideZeroBalanceTokens: boolean;
}

export function setHideZeroBalanceTokens(
  hideZeroBalanceTokens: boolean,
): SetHideZeroBalanceTokensAction {
  return {
    type: 'SET_HIDE_ZERO_BALANCE_TOKENS',
    hideZeroBalanceTokens,
  };
}

interface SetLockTimeAction {
  type: 'SET_LOCK_TIME';
  lockTime: number;
}

export function setLockTime(lockTime: number): SetLockTimeAction {
  return {
    type: 'SET_LOCK_TIME',
    lockTime,
  };
}

interface SetPrimaryCurrencyAction {
  type: 'SET_PRIMARY_CURRENCY';
  primaryCurrency: string;
}

export function setPrimaryCurrency(
  primaryCurrency: string,
): SetPrimaryCurrencyAction {
  return {
    type: 'SET_PRIMARY_CURRENCY',
    primaryCurrency,
  };
}

interface SetAvatarAccountTypeAction {
  type: 'SET_AVATAR_ACCOUNT_TYPE';
  avatarAccountType: string;
}

export function setAvatarAccountType(
  avatarAccountType: string,
): SetAvatarAccountTypeAction {
  return {
    type: 'SET_AVATAR_ACCOUNT_TYPE',
    avatarAccountType,
  };
}

interface SetBasicFunctionalityAction {
  type: 'TOGGLE_BASIC_FUNCTIONALITY';
  basicFunctionalityEnabled: boolean;
}

// Plain action creator for state updates (used during store initialization)
export function setBasicFunctionality(
  basicFunctionalityEnabled: boolean,
): SetBasicFunctionalityAction {
  return {
    type: 'TOGGLE_BASIC_FUNCTIONALITY',
    basicFunctionalityEnabled,
  };
}

// Thunk action creator for user-initiated toggles (includes MultichainAccountService integration)
export function toggleBasicFunctionality(basicFunctionalityEnabled: boolean) {
  return async (dispatch: (action: SetBasicFunctionalityAction) => void) => {
    // First dispatch the Redux state update
    dispatch(setBasicFunctionality(basicFunctionalityEnabled));

    // Only call MultichainAccountService if State 2 (BIP-44 multichain accounts) is enabled
    // to prevent unwanted account alignment from running
    const { isMultichainAccountsState2Enabled } = await import(
      '../../multichain-accounts/remote-feature-flag'
    );
    if (isMultichainAccountsState2Enabled()) {
      // Call MultichainAccountService to update provider states and trigger alignment
      const { default: Engine } = await import('../../core/Engine');
      Engine.context.MultichainAccountService.setBasicFunctionality(
        basicFunctionalityEnabled,
      ).catch((error: Error) => {
        console.error(
          'Failed to set basic functionality on MultichainAccountService:',
          error,
        );
      });
    }
  };
}

interface ToggleDeviceNotificationAction {
  type: 'TOGGLE_DEVICE_NOTIFICATIONS';
  deviceNotificationEnabled: boolean;
}

export function toggleDeviceNotification(
  deviceNotificationEnabled: boolean,
): ToggleDeviceNotificationAction {
  return {
    type: 'TOGGLE_DEVICE_NOTIFICATIONS',
    deviceNotificationEnabled,
  };
}

interface TokenSortConfig {
  key: string;
  order: string;
  sortCallback: string;
}

interface SetTokenSortConfigAction {
  type: 'SET_TOKEN_SORT_CONFIG';
  tokenSortConfig: TokenSortConfig;
}

export function setTokenSortConfig(
  tokenSortConfig: TokenSortConfig,
): SetTokenSortConfigAction {
  return {
    type: 'SET_TOKEN_SORT_CONFIG',
    tokenSortConfig,
  };
}

interface SetDeepLinkModalDisabledAction {
  type: 'SET_DEEP_LINK_MODAL_DISABLED';
  deepLinkModalDisabled: boolean;
}

export function setDeepLinkModalDisabled(
  deepLinkModalDisabled: boolean,
): SetDeepLinkModalDisabledAction {
  return {
    type: 'SET_DEEP_LINK_MODAL_DISABLED',
    deepLinkModalDisabled,
  };
}
