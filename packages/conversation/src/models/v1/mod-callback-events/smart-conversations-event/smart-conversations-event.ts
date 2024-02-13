import { ConversationChannel } from '../../conversation-channel';
import { ConversationEvent } from '../conversation-event';

/**
 * When using the Smart Conversations functionality, Machine Learning and Artificial Intelligence analyses are delivered through specific callbacks on the Conversation API.
 */
export interface SmartConversationsEvent extends ConversationEvent{

  /** Id of the subscribed app. */
  app_id?: string;
  /** Timestamp marking when the channel callback was accepted/received by the Conversation API. */
  accepted_time?: Date;
  /** Timestamp of the event as provided by the underlying channels. */
  event_time?: Date;
  /** The project ID of the app which has subscribed for the callback. */
  project_id?: string;
  /** Context-dependent metadata. Refer to specific callback's documentation for exact information provided. */
  message_metadata?: string;
  /** The value provided in field correlation_id of a send message request. */
  correlation_id?: string;
  /** @see SmartConversationNotification */
  smart_conversation_notification?: SmartConversationNotification;
  /** Name of the trigger responsible for this event. */
  trigger: 'SMART_CONVERSATIONS';
}

export interface SmartConversationNotification {

  /** The unique ID of the contact that sent the message. */
  contact_id?: string;
  /** The channel-specific identifier for the contact. */
  channel_identity?: string;
  /** @see ConversationChannel */
  channel?: ConversationChannel;
  /** The unique ID of the corresponding message. */
  message_id?: string;
  /** The ID of the conversation the app message is part of. */
  conversation_id?: string;
  /** @see AnalysisResult */
  analysis_results?: AnalysisResult;
}

/**
 * The analysis provided by the Smart Conversations machine learning engine(s). The contents of the object are determined by the functionalities that are enabled for your solution.
 */
export interface AnalysisResult {

  /** An array that contains the analyses of the sentiments of the corresponding messages. */
  ml_sentiment_result?: MachineLearningSentimentResult[];
  /** An array that contains the analyses of the intentions of, and entities within, the corresponding messages. */
  ml_nlu_result?: MachineLearningNLUResult[];
  /** An array that contains the image recognition analyses of the images identified in the corresponding messages. */
  ml_image_recognition_result?: MachineLearningImageRecognitionResult[];
  /** An array that contains the PII analysis of the corresponding messages. */
  ml_pii_result?: MachineLearningPIIResult[];
  /** An array that contains the analyses of the offenses of the corresponding messages. */
  ml_offensive_analysis_result?: OffensiveAnalysis[];
}

export interface MachineLearningSentimentResult {

  /** The message text that was analyzed. */
  message?: string;
  /** An array of JSON objects made up of sentiment and score pairs, where the score represents the likelihood that the message communicates the corresponding sentiment. */
  results?: SentimentResult[];
  /** The most probable sentiment of the analyzed text. */
  sentiment?: SentimentEnum;
  /** The likelihood that the assigned sentiment represents the emotional context of the analyzed text. 1 is the maximum value, representing the highest likelihood that the message text matches the sentiment, and 0 is the minimum value, representing the lowest likelihood that the message text matches the sentiment. */
  score?: number;
}
export type SentimentEnum = 'positive' | 'negative' | 'neutral';

export interface SentimentResult {

  /** The most probable sentiment of the analyzed text. */
  sentiment?: SentimentEnum;
  /** The likelihood that the assigned sentiment represents the emotional context of the analyzed text. 1 is the maximum value, representing the highest likelihood that the message text matches the sentiment, and 0 is the minimum value, representing the lowest likelihood that the message text matches the sentiment. */
  score?: number;
}

export interface MachineLearningNLUResult {

  /** The message text that was analyzed. */
  message?: string;
  /** An array of JSON objects made up of intent and score pairs, where the score represents the likelihood that the message has the corresponding intent. */
  results?: IntentResult[];
  /** The most probable intent of the analyzed text. For example, chitchat.greeting, chitchat.bye, chitchat.compliment, chitchat.how_are_you, or general.yes_or_agreed. */
  intent?: string;
  /** The likelihood that the assigned intent represents the purpose of the analyzed text. 1 is the maximum value, representing the highest likelihood that the message text matches the intent, and 0 is the minimum value, representing the lowest likelihood that the message text matches the intent. */
  score?: number;
}

export interface IntentResult {

  /** The most probable intent of the analyzed text. For example, chitchat.greeting, chitchat.bye, chitchat.compliment, chitchat.how_are_you, or general.yes_or_agreed. */
  intent?: string;
  /** The likelihood that the assigned intent represents the purpose of the analyzed text. 1 is the maximum value, representing the highest likelihood that the message text matches the intent, and 0 is the minimum value, representing the lowest likelihood that the message text matches the intent. */
  score?: number;
}

export interface MachineLearningImageRecognitionResult {

  /** The URL of the image that was processed. */
  url?: string;
  /** @see DocumentImageClassification */
  document_image_classification?: DocumentImageClassification;
  /** @see OpticalCharacterRecognition */
  optical_character_recognition?: OpticalCharacterRecognition;
  /** @see DocumentFieldClassification */
  document_field_classification?: DocumentFieldClassification;
}

/**
 * An object that identifies a document type within the image, along with a confidence level for that document type.
 */
export interface DocumentImageClassification {

  /** The document type that the analyzed image most likely contains. */
  doc_type?: string;
  /** The likelihood that the analyzed image contains the assigned document type. 1 is the maximum value, representing the highest likelihood that the analyzed image contains the assigned document type, and 0 is the minimum value, representing the lowest likelihood that the analyzed image contains the assigned document type. */
  confidence?: number;
}

/**
 * An object containing a result array that reports the machine learning engine\'s character extraction results.
 */
export interface OpticalCharacterRecognition {

  /** The result of the OCR process. */
  result?: OpticalCharacterRecognitionData[];
}

export interface OpticalCharacterRecognitionData {

  /** The data array contains the string(s) identified in one section of an analyzed image. */
  data?: string[];
}

/**
 * An object containing a result object that reports on all identified fields, as well as the values assigned to those fields.
 */
export interface DocumentFieldClassification {

  /** The result of the Document Field Classification process */
  result?: { [key: string]: DocumentFieldClassificationData; }[];
}

export interface DocumentFieldClassificationData {

  /** The data array contains the string(s) assigned to the corresponding document field. */
  data?: string[];
}

/**
 * An object that contains the PII analysis of the corresponding messages.
 */
export interface MachineLearningPIIResult {

  /** The message text that was analyzed. */
  message?: string;
  /** The redacted message text in which sensitive information was replaced with appropriate masks. A MISC mask is applied to a term that has been identified as PII, but with low confidence regarding which type of mask to assign. */
  masked?: string;
}

export interface OffensiveAnalysis {

  /** Either the message text or the URL of the image that was analyzed. */
  message?: string;
  /** */
  url?: string;
  /** A label, either SAFE or UNSAFE, that classifies the analyzed content. */
  evaluation?: EvaluationEnum;
  /** The likelihood that the assigned evaluation represents the analyzed message correctly. 1 is the maximum value, representing the highest likelihood that the content of the message matches the evaluation. 0 is the minimum value, representing the lowest likelihood that the content of the message matches the evaluation. */
  score?: number;
}
export type EvaluationEnum = 'SAFE' | 'UNSAFE';
