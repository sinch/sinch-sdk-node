import { CardMessage } from '../card-message';
import { CarouselMessage } from '../carousel-message';
import { ChoiceMessage } from '../choice-message';
import { LocationMessage } from '../location-message';
import { MediaMessage } from '../media-message';
import { TextMessage } from '../text-message';
import { ListMessage } from '../list-message';
import { TemplateMessage } from '../template-message';

export type AppMessageMessage =
  CardMessage
  | CarouselMessage
  | ChoiceMessage
  | LocationMessage
  | MediaMessage
  | TemplateMessage
  | TextMessage
  | ListMessage;
