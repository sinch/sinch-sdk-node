export interface AnsweringMachineDetection {
  /** The determination by the system of who answered the call. */
  status?: 'machine' | 'human' | 'notsure' | 'hangup' | string;
  /** The reason that the system used to determine who answered the call. */
  reason?: 'longgreeting' | 'initialsilence' | 'greeting' | 'beep' | 'n/a' | string;
  /** The length of the call. */
  duration?: number;
}
