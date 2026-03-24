/**
 * Contains requested features. Fallback to LineType if not provided.
 */
export type LookupFeature = 'LineType' | 'SimSwap' | 'VoIPDetection' | 'RND' | string;

/**
 * Represents the type of a phone line.
 */
export type LineType = 'Landline' | 'Mobile' | 'VoIP' | 'Special' | 'Freephone' | 'Other' | string;

/**
 * Threshold for sim swap check.
 */
export type SwapPeriod =
  | 'Undefined'
  | 'SP4H'
  | 'SP12H'
  | 'SP24H'
  | 'SP48H'
  | 'SP5D'
  | 'SP7D'
  | 'SP14D'
  | 'SP30D'
  | 'SPMAX'
  | string;

/**
 * Probability of number being VoIP based on the AI analysis.
 */
export type VoIPProbability = 'Unknown' | 'Low' | 'Likely' | 'High' | string;
