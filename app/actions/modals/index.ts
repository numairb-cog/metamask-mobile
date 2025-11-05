interface ToggleNetworkModalAction {
  type: 'TOGGLE_NETWORK_MODAL';
  shouldNetworkSwitchPopToWallet: boolean;
}

export function toggleNetworkModal(
  shouldNetworkSwitchPopToWallet = true,
): ToggleNetworkModalAction {
  return {
    type: 'TOGGLE_NETWORK_MODAL',
    shouldNetworkSwitchPopToWallet,
  };
}

interface ToggleCollectibleContractModalAction {
  type: 'TOGGLE_COLLECTIBLE_CONTRACT_MODAL';
}

export function toggleCollectibleContractModal(): ToggleCollectibleContractModalAction {
  return {
    type: 'TOGGLE_COLLECTIBLE_CONTRACT_MODAL',
  };
}

interface ToggleDappTransactionModalAction {
  type: 'TOGGLE_DAPP_TRANSACTION_MODAL';
  show?: boolean;
}

export function toggleDappTransactionModal(
  show?: boolean,
): ToggleDappTransactionModalAction {
  return {
    type: 'TOGGLE_DAPP_TRANSACTION_MODAL',
    show,
  };
}

interface ToggleInfoNetworkModalAction {
  type: 'TOGGLE_INFO_NETWORK_MODAL';
  show?: boolean;
}

export function toggleInfoNetworkModal(
  show?: boolean,
): ToggleInfoNetworkModalAction {
  return {
    type: 'TOGGLE_INFO_NETWORK_MODAL',
    show,
  };
}

interface ToggleSignModalAction {
  type: 'TOGGLE_SIGN_MODAL';
  show?: boolean;
}

export function toggleSignModal(show?: boolean): ToggleSignModalAction {
  return {
    type: 'TOGGLE_SIGN_MODAL',
    show,
  };
}
