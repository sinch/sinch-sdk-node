import { TextMessage, TextMessageItem } from './text-message';
import { CardMessage, CardMessageItem } from './card-message';
import { CarouselMessage, CarouselMessageItem } from './carousel-message';
import { ChoiceMessage, ChoiceMessageItem } from './choice-message';
import { ContactInfoMessage, ContactInfoMessageItem } from './contact-info-message';
import { LocationMessage, LocationMessageItem } from './location-message';
import { MediaMessage, MediaMessageItem } from './media-message';
import { TemplateMessage, TemplateMessageItem } from './template-message';
import { ListMessage, ListMessageItem } from './list-message';
import { V2TemplateTranslation } from './v2-template-translation';
import { ChoiceItem, ChoiceItemWrapper } from './choice-item';
import { ProductItem, ProductItemWrapper } from './product-item';

export const messageBuilder = {
  card: (cardMessageItem: CardMessageItem): CardMessage => {
    return {
      card_message: cardMessageItem,
    } as CardMessage;
  },
  carousel: (carouselMessageItem: CarouselMessageItem): CarouselMessage => {
    return {
      carousel_message: carouselMessageItem,
    } as CarouselMessage;
  },
  choice: (choiceMessageItem: ChoiceMessageItem): ChoiceMessage => {
    return {
      choice_message: choiceMessageItem,
    } as ChoiceMessage;
  },
  contactInfo: (contactInfoMessageItem: ContactInfoMessageItem): ContactInfoMessage => {
    return {
      contact_info_message: contactInfoMessageItem,
    } as ContactInfoMessage;
  },
  list: (listMessageItem: ListMessageItem): ListMessage => {
    return {
      list_message: listMessageItem,
    } as ListMessage;
  },
  location: (locationMessageItem: LocationMessageItem): LocationMessage => {
    return {
      location_message: locationMessageItem,
    } as LocationMessage;
  },
  media: (mediaMessageItem: MediaMessageItem): MediaMessage => {
    return {
      media_message: mediaMessageItem,
    } as MediaMessage;
  },
  template: (templateMessageItem: TemplateMessageItem): TemplateMessage => {
    return {
      template_message: templateMessageItem,
    } as TemplateMessage;
  },
  text: (textMessageItem: TextMessageItem): TextMessage => {
    return {
      text_message: textMessageItem,
    } as TextMessage;
  },
};

export const templateV1Helper = {
  buildTextMessageContent: (textMessageItem: TextMessageItem): string => {
    return JSON.stringify(messageBuilder.text(textMessageItem));
  },
  buildCardMessageContent: (cardMessageItem: CardMessageItem): string => {
    return JSON.stringify(messageBuilder.card(cardMessageItem));
  },
  buildCarouselMessageContent: (carouselMessageItem: CarouselMessageItem): string => {
    return JSON.stringify(messageBuilder.carousel(carouselMessageItem));
  },
  buildChoiceMessageContent: (choiceMessageItem: ChoiceMessageItem): string => {
    return JSON.stringify(messageBuilder.choice(choiceMessageItem));
  },
  buildContactInfoMessageContent: (contactInfoMessageItem: ContactInfoMessageItem): string => {
    return JSON.stringify(messageBuilder.contactInfo(contactInfoMessageItem));
  },
  buildLocationMessageContent: (locationMessageItem: LocationMessageItem): string => {
    return JSON.stringify(messageBuilder.location(locationMessageItem));
  },
  buildMediaMessageContent: (mediaMessageItem: MediaMessageItem): string => {
    return JSON.stringify(messageBuilder.media(mediaMessageItem));
  },
  buildTemplateMessageContent: (templateMessageItem: TemplateMessageItem): string => {
    return JSON.stringify(messageBuilder.template(templateMessageItem));
  },
  buildListMessageContent: (listMessageItem: ListMessageItem): string => {
    return JSON.stringify(messageBuilder.list(listMessageItem));
  },
};

export const templateV2Helper = {
  // Template V2
  buildTextMessageContent: (textMessageItem: TextMessageItem): TextMessage => {
    return messageBuilder.text(textMessageItem);
  },
  buildCardMessageContent: (cardMessageItem: CardMessageItem): CardMessage => {
    return messageBuilder.card(cardMessageItem);
  },
  buildCarouselMessageContent: (carouselMessageItem: CarouselMessageItem): CarouselMessage => {
    return messageBuilder.carousel(carouselMessageItem);
  },
  buildChoiceMessageContent: (choiceMessageItem: ChoiceMessageItem): ChoiceMessage => {
    return messageBuilder.choice(choiceMessageItem);
  },
  buildContactInfoMessageContent: (contactInfoMessageItem: ContactInfoMessageItem): ContactInfoMessage => {
    return messageBuilder.contactInfo(contactInfoMessageItem);
  },
  buildLocationMessageContent: (locationMessageItem: LocationMessageItem): LocationMessage => {
    return messageBuilder.location(locationMessageItem);
  },
  buildMediaMessageContent: (mediaMessageItem: MediaMessageItem): MediaMessage => {
    return messageBuilder.media(mediaMessageItem);
  },
  buildTemplateMessageContent: (templateMessageItem: TemplateMessageItem): TemplateMessage => {
    return messageBuilder.template(templateMessageItem);
  },
  buildListMessageContent: (listMessageItem: ListMessageItem): ListMessage => {
    return messageBuilder.list(listMessageItem);
  },
  getMessageFromTranslation: (translation: V2TemplateTranslation) => {
    if ('card_message' in translation) {
      return {
        type: MessageType.CARD,
        content: translation.card_message,
      };
    } else if ('carousel_message' in translation) {
      return {
        type: MessageType.CAROUSEL,
        content: translation.carousel_message,
      };
    } else if ('choice_message' in translation) {
      return {
        type: MessageType.CHOICE,
        content: translation.choice_message,
      };
    } else if ('contact_info_message' in translation) {
      return {
        type: MessageType.CONTACT_INFO,
        content: translation.contact_info_message,
      };
    } else if ('list_message' in translation) {
      return {
        type: MessageType.LIST,
        content: translation.list_message,
      };
    } else if ('location_message' in translation) {
      return {
        type: MessageType.LOCATION,
        content: translation.location_message,
      };
    } else if ('media_message' in translation) {
      return {
        type: MessageType.MEDIA,
        content: translation.media_message,
      };
    } else if ('template_message' in translation) {
      return {
        type: MessageType.TEMPLATE,
        content: translation.template_message,
      };
    } else if('text_message' in translation) {
      return {
        type: MessageType.TEXT,
        content: translation.text_message,
      };
    } else {
      return {
        type: MessageType.UNDEFINED,
        content: '',
      };
    }
  },
  getPreviousTranslations: (translations: V2TemplateTranslation[] | undefined) => {
    if(!translations) {
      return [];
    } else {
      return translations.filter((translation) => translation.version !== 'latest');
    }
  },
};

export const listSectionHelper = {
  buildChoiceItem: (choiceItem: ChoiceItem): ChoiceItemWrapper => {
    return {
      choice: choiceItem,
    };
  },
  buildProductItem: (productItem: ProductItem): ProductItemWrapper => {
    return {
      product: productItem,
    };
  },
};

export const enum MessageType {
  CARD = 'CardMessage',
  CAROUSEL = 'CarouselMessage',
  CHOICE = 'ChoiceMessage',
  CONTACT_INFO = 'ContactInfoMessage',
  LIST = 'ListMessage',
  LOCATION = 'LocationMessage',
  MEDIA = 'MediaMessage',
  TEMPLATE = 'TemplateMessage',
  TEXT = 'TextMessage',
  UNDEFINED = 'Undefined'
}
