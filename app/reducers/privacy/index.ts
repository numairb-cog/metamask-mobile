interface PrivacyState {
  approvedHosts: Record<string, boolean>;
  revealSRPTimestamps: number[];
}

const initialState: PrivacyState = {
  approvedHosts: {},
  revealSRPTimestamps: [],
};

interface ApproveHostAction {
  type: 'APPROVE_HOST';
  hostname: string;
}

interface RejectHostAction {
  type: 'REJECT_HOST';
  hostname: string;
}

interface ClearHostsAction {
  type: 'CLEAR_HOSTS';
}

interface RecordSRPRevealTimestampAction {
  type: 'RECORD_SRP_REVEAL_TIMESTAMP';
  timestamp: number;
}

type PrivacyAction =
  | ApproveHostAction
  | RejectHostAction
  | ClearHostsAction
  | RecordSRPRevealTimestampAction;

/* eslint-disable @typescript-eslint/default-param-last */
const privacyReducer = (
  state: PrivacyState = initialState,
  action: PrivacyAction,
): PrivacyState => {
  const newHosts = { ...state.approvedHosts };
  switch (action.type) {
    case 'APPROVE_HOST':
      return {
        ...state,
        approvedHosts: {
          ...state.approvedHosts,
          [action.hostname]: true,
        },
      };
    case 'REJECT_HOST':
      delete newHosts[action.hostname];
      return {
        ...state,
        approvedHosts: newHosts,
      };
    case 'CLEAR_HOSTS':
      return {
        ...state,
        approvedHosts: {},
      };
    case 'RECORD_SRP_REVEAL_TIMESTAMP':
      return {
        ...state,
        revealSRPTimestamps: [...state.revealSRPTimestamps, action.timestamp],
      };
    default:
      return state;
  }
};
/* eslint-enable @typescript-eslint/default-param-last */

export default privacyReducer;
