import {
  V2TemplateTranslation,
  MessageType,
  templateV1Helper,
  templateV2Helper,
  messageBuilder,
} from '../../../src';
import {
  cardMessage,
  cardMessageItem,
  carouselMessage,
  carouselMessageItem,
  choiceMessage,
  choiceMessageItem,
  contactInfoMessage,
  contactInfoMessageItem,
  listMessage,
  listMessageItem,
  locationMessage,
  locationMessageItem,
  mediaMessage,
  mediaMessageItem,
  templateMessage,
  templateMessageItem,
  textMessageItem,
  textMessage,
} from '../../messages-mocks';

describe('Conversation models helpers', () => {

  describe('Templates V1 helper', () => {
    it('should build a TextMessage', () => {
      const builtMessage = templateV1Helper.buildTextMessageContent(textMessageItem);
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

    it('should build a ContactInfoMessage', () => {
      const builtMessage = templateV1Helper.buildContactInfoMessageContent(contactInfoMessageItem);
      expect(builtMessage).toEqual(JSON.stringify(contactInfoMessage));
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
      const builtTextMessage = templateV2Helper.buildTextMessageContent(textMessageItem);
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

    it('should build a ContactInfoMessage', () => {
      const builtMessage = templateV2Helper.buildContactInfoMessageContent(contactInfoMessageItem);
      expect(builtMessage).toEqual(contactInfoMessage);
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
        ...contactInfoMessage,
      };
      expect(templateV2Helper.getMessageFromTranslation(templateTranslation).type).toBe(MessageType.CONTACT_INFO);

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

  describe('Message builder helper', () => {
    it('should build a TextMessage', () => {
      const builtTextMessage = messageBuilder.text(textMessageItem);
      expect(builtTextMessage).toEqual(textMessage);
    });

    it('should build a CardMessage', () => {
      const builtTextMessage = messageBuilder.card(cardMessageItem);
      expect(builtTextMessage).toEqual(cardMessage);
    });

    it('should build a CarouselMessage', () => {
      const builtMessage = messageBuilder.carousel(carouselMessageItem);
      expect(builtMessage).toEqual(carouselMessage);
    });

    it('should build a ChoiceMessage', () => {
      const builtMessage = messageBuilder.choice(choiceMessageItem);
      expect(builtMessage).toEqual(choiceMessage);
    });

    it('should build a LocationMessage', () => {
      const builtMessage = messageBuilder.location(locationMessageItem);
      expect(builtMessage).toEqual(locationMessage);
    });

    it('should build a MediaMessage', () => {
      const builtMessage = messageBuilder.media(mediaMessageItem);
      expect(builtMessage).toEqual(mediaMessage);
    });

    it('should build a TemplateMessage', () => {
      const builtMessage = messageBuilder.template(templateMessageItem);
      expect(builtMessage).toEqual(templateMessage);
    });

    it('should build a ListMessage', () => {
      const builtMessage = messageBuilder.list(listMessageItem);
      expect(builtMessage).toEqual(listMessage);
    });
  });

});
