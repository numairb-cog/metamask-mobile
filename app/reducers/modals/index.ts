interface ModalsState {
  networkModalVisible: boolean;
  shouldNetworkSwitchPopToWallet: boolean;
  collectibleContractModalVisible: boolean;
  dappTransactionModalVisible: boolean;
  signMessageModalVisible: boolean;
  infoNetworkModalVisible?: boolean;
}

interface ToggleNetworkModalAction {
  type: 'TOGGLE_NETWORK_MODAL';
  shouldNetworkSwitchPopToWallet: boolean;
}

interface ToggleCollectibleContractModalAction {
  type: 'TOGGLE_COLLECTIBLE_CONTRACT_MODAL';
}

interface ToggleDappTransactionModalAction {
  type: 'TOGGLE_DAPP_TRANSACTION_MODAL';
  show?: boolean | null;
}

interface ToggleInfoNetworkModalAction {
  type: 'TOGGLE_INFO_NETWORK_MODAL';
  show?: boolean;
}

interface ToggleSignModalAction {
  type: 'TOGGLE_SIGN_MODAL';
  show?: boolean;
}

type ModalsAction =
  | ToggleNetworkModalAction
  | ToggleCollectibleContractModalAction
  | ToggleDappTransactionModalAction
  | ToggleInfoNetworkModalAction
  | ToggleSignModalAction;

const initialState: ModalsState = {
  networkModalVisible: false,
  shouldNetworkSwitchPopToWallet: false,
  collectibleContractModalVisible: false,
  dappTransactionModalVisible: false,
  signMessageModalVisible: true,
};

/* eslint-disable @typescript-eslint/default-param-last */
const modalsReducer = (
  state: ModalsState = initialState,
  action: ModalsAction,
): ModalsState => {
  switch (action.type) {
    case 'TOGGLE_NETWORK_MODAL':
      return {
        ...state,
        networkModalVisible: !state.networkModalVisible,
        shouldNetworkSwitchPopToWallet: action.shouldNetworkSwitchPopToWallet,
      };
    case 'TOGGLE_COLLECTIBLE_CONTRACT_MODAL':
      return {
        ...state,
        collectibleContractModalVisible: !state.collectibleContractModalVisible,
      };
    case 'TOGGLE_DAPP_TRANSACTION_MODAL':
      if (action.show === false) {
        return {
          ...state,
          dappTransactionModalVisible: false,
        };
      }
      return {
        ...state,
        dappTransactionModalVisible:
          action.show != null
            ? action.show
            : !state.dappTransactionModalVisible,
      };
    case 'TOGGLE_INFO_NETWORK_MODAL':
      if (action.show === false) {
        return {
          ...state,
          infoNetworkModalVisible: false,
        };
      }
      return {
        ...state,
        infoNetworkModalVisible: !state.infoNetworkModalVisible,
      };
    case 'TOGGLE_SIGN_MODAL':
      if (action.show === false) {
        return {
          ...state,
          signMessageModalVisible: false,
        };
      }
      return {
        ...state,
        signMessageModalVisible: !state.signMessageModalVisible,
      };
    default:
      return state;
  }
};
/* eslint-enable @typescript-eslint/default-param-last */

export default modalsReducer;
