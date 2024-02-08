import {
  CardMessage, CardMessageItem,
  CarouselMessage, CarouselMessageItem,
  ChoiceMessage, ChoiceMessageItem,
  ListMessage, ListMessageItem,
  LocationMessage, LocationMessageItem,
  MediaMessage, MediaMessageItem,
  TemplateMessage, TemplateMessageItem,
  TextMessage, TextMessageItem,
  V2TemplateTranslation,
  MessageType,
  templateV1Helper,
  templateV2Helper,
} from '../../../src';

const textItem: TextMessageItem = {
  text: 'text message',
};

const textMessage: TextMessage = {
  text_message: textItem,
};

const cardMessageItem: CardMessageItem = {
  title: 'title',
  description: 'description',
  media_message: {
    url: 'url',
  },
  height: 'MEDIUM',
  choices: [
    {
      text_message: {
        text: 'Strawberry',
      },
    },
    {
      text_message: {
        text: 'Blueberry',
      },
    },
  ],
};

const cardMessage: CardMessage = {
  card_message: cardMessageItem,
};

const carouselMessageItem: CarouselMessageItem = {
  cards: [
    {
      title: 'card #1',
      description: 'description #1',
      media_message: {
        url: 'https://url1.com',
      },
      choices: [
        {
          text_message: {
            text: 'This is the card #1',
          },
        },
      ],
    },
    {
      title: 'card #2',
      description: 'description #2',
      media_message: {
        url: 'https://url2.com',
      },
      choices: [
        {
          url_message: {
            title: 'Website',
            url: 'https://website.com',
          },
        },
      ],
    },
    {
      title: 'card #3',
      description: 'description #3',
      media_message: {
        url: 'https://url3.com',
      },
      choices: [
        {
          call_message: {
            title: 'Support line',
            phone_number: '46732000000',
          },
        },
      ],
    },
  ],
};

const carouselMessage: CarouselMessage = {
  carousel_message: carouselMessageItem,
};

const choiceMessageItem: ChoiceMessageItem = {
  text_message: {
    text: 'Choose your icecream flavor',
  },
  choices: [
    {
      text_message: {
        text: 'Strawberry',
      },
    },
    {
      text_message: {
        text: 'Blueberry',
      },
    },
  ],
};

const choiceMessage: ChoiceMessage = {
  choice_message: choiceMessageItem,
};

const locationMessageItem: LocationMessageItem = {
  title: 'Phare d\'Eckmühl',
  label: 'Pointe de Penmarch',
  coordinates: {
    latitude: 47.7981899,
    longitude: -4.3727685,
  },
};

const locationMessage: LocationMessage = {
  location_message: locationMessageItem,
};

const mediaMessageItem: MediaMessageItem = {
  url: 'https://url-to-media.com',
  thumbnail_url: 'https://url-to-thumbnail.com',
};

const mediaMessage: MediaMessage = {
  media_message: mediaMessageItem,
};

const templateMessageItem: TemplateMessageItem = {
  omni_template: {
    template_id: 'templateId',
    version: '1',
    language_code: 'en-US',
    parameters: {
      name: 'Value for the "name" parameter used in the version 1 and language "en-US" of the template',
    },
  },
  channel_template: {
    'KAKAOTALK': {
      template_id: 'templateIdForKakaoTalk',
      version: '1',
      language_code: 'en-US',
    },
  },
};

const templateMessage: TemplateMessage = {
  template_message: templateMessageItem,
};

const listMessageItem: ListMessageItem = {
  title: 'Choose your icecream flavor',
  description: 'The best icecream in town!',
  sections: [
    {
      title: 'Fruit flavors',
      items: [
        {
          choice: {
            title: 'Strawberry',
            postback_data: 'Strawberry postback',
          },
        },
        {
          choice: {
            title: 'Blueberry',
            postback_data: 'Blueberry postback',
          },
        },
      ],
    },
    {
      title: 'Other flavors',
      items: [
        {
          choice: {
            title: 'Chocolate',
            postback_data: 'Chocolate postback',
          },
        },
        {
          choice: {
            title: 'Vanilla',
            postback_data: 'Vanilla postback',
          },
        },
      ],
    },
  ],
  message_properties: {
    menu: 'menu text',
  },
};

const listMessage: ListMessage = {
  list_message: listMessageItem,
};

describe('Conversation models helpers', () => {

  describe('Templates V1 helper', () => {
    it('should build a TextMessage', () => {
      const builtMessage = templateV1Helper.buildTextMessageContent(textItem);
      expect(builtMessage).toBe(JSON.stringify(textMessage));
    });

    it('should build a CardMessage', () => {
      const builtMessage = templateV1Helper.buildCardMessageContent(cardMessageItem);
      expect(builtMessage).toBe(JSON.stringify(cardMessage));
    });

    it('should build a CarouselMessage', () => {
      const builtMessage = templateV1Helper.buildCarouselMessageContent(carouselMessageItem);
      expect(builtMessage).toBe(JSON.stringify(carouselMessage));
    });

    it('should build a ChoiceMessage', () => {
      const builtMessage = templateV1Helper.buildChoiceMessageContent(choiceMessageItem);
      expect(builtMessage).toBe(JSON.stringify(choiceMessage));
    });

    it('should build a LocationMessage', () => {
      const builtMessage = templateV1Helper.buildLocationMessageContent(locationMessageItem);
      expect(builtMessage).toBe(JSON.stringify(locationMessage));
    });

    it('should build a MediaMessage', () => {
      const builtMessage = templateV1Helper.buildMediaMessageContent(mediaMessageItem);
      expect(builtMessage).toBe(JSON.stringify(mediaMessage));
    });

    it('should build a TemplateMessage', () => {
      const builtMessage = templateV1Helper.buildTemplateMessageContent(templateMessageItem);
      expect(builtMessage).toBe(JSON.stringify(templateMessage));
    });

    it('should build a ListMessage', () => {
      const builtMessage = templateV1Helper.buildListMessageContent(listMessageItem);
      expect(builtMessage).toBe(JSON.stringify(listMessage));
    });
  });

  describe('Templates V2 helper', () => {
    it('should build a TextMessage', () => {
      const builtTextMessage = templateV2Helper.buildTextMessageContent(textItem);
      expect(builtTextMessage).toEqual(textMessage);
    });

    it('should build a CardMessage', () => {
      const builtTextMessage = templateV2Helper.buildCardMessageContent(cardMessageItem);
      expect(builtTextMessage).toEqual(cardMessage);
    });

    it('should build a CarouselMessage', () => {
      const builtMessage = templateV2Helper.buildCarouselMessageContent(carouselMessageItem);
      expect(builtMessage).toEqual(carouselMessage);
    });

    it('should build a ChoiceMessage', () => {
      const builtMessage = templateV2Helper.buildChoiceMessageContent(choiceMessageItem);
      expect(builtMessage).toEqual(choiceMessage);
    });

    it('should build a LocationMessage', () => {
      const builtMessage = templateV2Helper.buildLocationMessageContent(locationMessageItem);
      expect(builtMessage).toEqual(locationMessage);
    });

    it('should build a MediaMessage', () => {
      const builtMessage = templateV2Helper.buildMediaMessageContent(mediaMessageItem);
      expect(builtMessage).toEqual(mediaMessage);
    });

    it('should build a TemplateMessage', () => {
      const builtMessage = templateV2Helper.buildTemplateMessageContent(templateMessageItem);
      expect(builtMessage).toEqual(templateMessage);
    });

    it('should build a ListMessage', () => {
      const builtMessage = templateV2Helper.buildListMessageContent(listMessageItem);
      expect(builtMessage).toEqual(listMessage);
    });

    it('should get the message content from the translation', () => {
      let templateTranslation: V2TemplateTranslation;
      const translationIdentifier = {
        version: '1',
        language_code: 'en-US',
      };
      templateTranslation = {
        ...translationIdentifier,
        ...textMessage,
      };
      expect(templateV2Helper.getMessageFromTranslation(templateTranslation).type).toBe(MessageType.TEXT);

      templateTranslation = {
        ...translationIdentifier,
        ...cardMessage,
      };
      expect(templateV2Helper.getMessageFromTranslation(templateTranslation).type).toBe(MessageType.CARD);

      templateTranslation = {
        ...translationIdentifier,
        ...choiceMessage,
      };
      expect(templateV2Helper.getMessageFromTranslation(templateTranslation).type).toBe(MessageType.CHOICE);

      templateTranslation = {
        ...translationIdentifier,
        ...carouselMessage,
      };
      expect(templateV2Helper.getMessageFromTranslation(templateTranslation).type).toBe(MessageType.CAROUSEL);

      templateTranslation = {
        ...translationIdentifier,
        ...listMessage,
      };
      expect(templateV2Helper.getMessageFromTranslation(templateTranslation).type).toBe(MessageType.LIST);

      templateTranslation = {
        ...translationIdentifier,
        ...locationMessage,
      };
      expect(templateV2Helper.getMessageFromTranslation(templateTranslation).type).toBe(MessageType.LOCATION);

      templateTranslation = {
        ...translationIdentifier,
        ...mediaMessage,
      };
      expect(templateV2Helper.getMessageFromTranslation(templateTranslation).type).toBe(MessageType.MEDIA);

      templateTranslation = {
        ...translationIdentifier,
        ...templateMessage,
      };
      expect(templateV2Helper.getMessageFromTranslation(templateTranslation).type).toBe(MessageType.TEMPLATE);
    });

    it('should filter out the latest translations', () => {
      const version1Translation: V2TemplateTranslation = {
        version: '1',
        language_code: 'en-US',
        text_message: {
          text: 'text',
        },
      };
      const latestTranslation: V2TemplateTranslation = {
        version: 'latest',
        language_code: 'en-US',
        text_message: {
          text: 'text',
        },
      };
      const translations = [version1Translation, latestTranslation];
      const filteredTranslations = templateV2Helper.getPreviousTranslations(translations);
      expect(filteredTranslations.length).toBe(1);
      expect(filteredTranslations[0].version).toBe('1');
    });
  });

});
