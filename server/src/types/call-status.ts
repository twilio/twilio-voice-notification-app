export enum CallStatus {
  // Progression statuses
  QUEUED = 'queued',
  INITIATED = 'initiated',
  RINGING = 'ringing',
  IN_PROGRESS = 'in-progress',
  // Final statuses
  COMPLETED = 'completed',
  BUSY = 'busy',
  NO_ANSWER = 'no-answer',
  CANCELED = 'canceled',
  FAILED = 'failed',
}

export const ProgressionStatus: CallStatus[] = [
  CallStatus.QUEUED,
  CallStatus.INITIATED,
  CallStatus.RINGING,
  CallStatus.IN_PROGRESS,
];

export const FinalStatus: CallStatus[] = [
  CallStatus.COMPLETED,
  CallStatus.BUSY,
  CallStatus.NO_ANSWER,
  CallStatus.CANCELED,
  CallStatus.FAILED,
];
