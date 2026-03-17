export type DirectionEnum = 'INBOUND' | 'OUTBOUND' | string | 'inbound' | 'outbound'; // TODO : remove lowercase values in next major release

export type CallResult = 'COMPLETED' | 'NO_ANSWER' | 'CANCEL' | 'BUSY' | 'FAILED' | string;

export type BooleanLikeEnum = 'true' | 'false' | string;
