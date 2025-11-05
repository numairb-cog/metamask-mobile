interface ApproveHostAction {
  type: 'APPROVE_HOST';
  hostname: string;
}

export function approveHost(hostname: string): ApproveHostAction {
  return {
    type: 'APPROVE_HOST',
    hostname,
  };
}

interface RejectHostAction {
  type: 'REJECT_HOST';
  hostname: string;
}

export function rejectHost(hostname: string): RejectHostAction {
  return {
    type: 'REJECT_HOST',
    hostname,
  };
}

interface RecordSRPRevealTimestampAction {
  type: 'RECORD_SRP_REVEAL_TIMESTAMP';
  timestamp: number | string;
}

export function recordSRPRevealTimestamp(
  timestamp: number | string,
): RecordSRPRevealTimestampAction {
  return {
    type: 'RECORD_SRP_REVEAL_TIMESTAMP',
    timestamp,
  };
}
