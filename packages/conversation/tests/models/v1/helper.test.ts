import { Conversation } from '../../../src';
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
      const builtMessage = Conversation.templateV1Helper.buildTextMessageContent(textMessageItem);
      expect(builtMessage).toBe(JSON.stringify(textMessage));
    });

    it('should build a CardMessage', () => {
      const builtMessage = Conversation.templateV1Helper.buildCardMessageContent(cardMessageItem);
      expect(builtMessage).toBe(JSON.stringify(cardMessage));
    });

    it('should build a CarouselMessage', () => {
      const builtMessage = Conversation.templateV1Helper.buildCarouselMessageContent(carouselMessageItem);
      expect(builtMessage).toBe(JSON.stringify(carouselMessage));
    });

    it('should build a ChoiceMessage', () => {
      const builtMessage = Conversation.templateV1Helper.buildChoiceMessageContent(choiceMessageItem);
      expect(builtMessage).toBe(JSON.stringify(choiceMessage));
    });

    it('should build a ContactInfoMessage', () => {
      const builtMessage = Conversation.templateV1Helper.buildContactInfoMessageContent(contactInfoMessageItem);
      expect(builtMessage).toEqual(JSON.stringify(contactInfoMessage));
    });

    it('should build a LocationMessage', () => {
      const builtMessage = Conversation.templateV1Helper.buildLocationMessageContent(locationMessageItem);
      expect(builtMessage).toBe(JSON.stringify(locationMessage));
    });

    it('should build a MediaMessage', () => {
      const builtMessage = Conversation.templateV1Helper.buildMediaMessageContent(mediaMessageItem);
      expect(builtMessage).toBe(JSON.stringify(mediaMessage));
    });

    it('should build a TemplateMessage', () => {
      const builtMessage = Conversation.templateV1Helper.buildTemplateMessageContent(templateMessageItem);
      expect(builtMessage).toBe(JSON.stringify(templateMessage));
    });

    it('should build a ListMessage', () => {
      const builtMessage = Conversation.templateV1Helper.buildListMessageContent(listMessageItem);
      expect(builtMessage).toBe(JSON.stringify(listMessage));
    });
  });

  describe('Templates V2 helper', () => {
    it('should build a TextMessage', () => {
      const builtTextMessage = Conversation.templateV2Helper.buildTextMessageContent(textMessageItem);
      expect(builtTextMessage).toEqual(textMessage);
    });

    it('should build a CardMessage', () => {
      const builtTextMessage = Conversation.templateV2Helper.buildCardMessageContent(cardMessageItem);
      expect(builtTextMessage).toEqual(cardMessage);
    });

    it('should build a CarouselMessage', () => {
      const builtMessage = Conversation.templateV2Helper.buildCarouselMessageContent(carouselMessageItem);
      expect(builtMessage).toEqual(carouselMessage);
    });

    it('should build a ChoiceMessage', () => {
      const builtMessage = Conversation.templateV2Helper.buildChoiceMessageContent(choiceMessageItem);
      expect(builtMessage).toEqual(choiceMessage);
    });

    it('should build a ContactInfoMessage', () => {
      const builtMessage = Conversation.templateV2Helper.buildContactInfoMessageContent(contactInfoMessageItem);
      expect(builtMessage).toEqual(contactInfoMessage);
    });

    it('should build a LocationMessage', () => {
      const builtMessage = Conversation.templateV2Helper.buildLocationMessageContent(locationMessageItem);
      expect(builtMessage).toEqual(locationMessage);
    });

    it('should build a MediaMessage', () => {
      const builtMessage = Conversation.templateV2Helper.buildMediaMessageContent(mediaMessageItem);
      expect(builtMessage).toEqual(mediaMessage);
    });

    it('should build a TemplateMessage', () => {
      const builtMessage = Conversation.templateV2Helper.buildTemplateMessageContent(templateMessageItem);
      expect(builtMessage).toEqual(templateMessage);
    });

    it('should build a ListMessage', () => {
      const builtMessage = Conversation.templateV2Helper.buildListMessageContent(listMessageItem);
      expect(builtMessage).toEqual(listMessage);
    });

    it('should get the message content from the translation', () => {
      let templateTranslation: Conversation.V2TemplateTranslation;
      const translationIdentifier = {
        version: '1',
        language_code: 'en-US',
      };
      templateTranslation = {
        ...translationIdentifier,
        ...textMessage,
      };
      expect(Conversation.templateV2Helper.getMessageFromTranslation(templateTranslation).type)
        .toBe(Conversation.MessageType.TEXT);

      templateTranslation = {
        ...translationIdentifier,
        ...cardMessage,
      };
      expect(Conversation.templateV2Helper.getMessageFromTranslation(templateTranslation).type)
        .toBe(Conversation.MessageType.CARD);

      templateTranslation = {
        ...translationIdentifier,
        ...choiceMessage,
      };
      expect(Conversation.templateV2Helper.getMessageFromTranslation(templateTranslation).type)
        .toBe(Conversation.MessageType.CHOICE);

      templateTranslation = {
        ...translationIdentifier,
        ...carouselMessage,
      };
      expect(Conversation.templateV2Helper.getMessageFromTranslation(templateTranslation).type)
        .toBe(Conversation.MessageType.CAROUSEL);

      templateTranslation = {
        ...translationIdentifier,
        ...contactInfoMessage,
      };
      expect(Conversation.templateV2Helper.getMessageFromTranslation(templateTranslation).type)
        .toBe(Conversation.MessageType.CONTACT_INFO);

      templateTranslation = {
        ...translationIdentifier,
        ...listMessage,
      };
      expect(Conversation.templateV2Helper.getMessageFromTranslation(templateTranslation).type)
        .toBe(Conversation.MessageType.LIST);

      templateTranslation = {
        ...translationIdentifier,
        ...locationMessage,
      };
      expect(Conversation.templateV2Helper.getMessageFromTranslation(templateTranslation).type)
        .toBe(Conversation.MessageType.LOCATION);

      templateTranslation = {
        ...translationIdentifier,
        ...mediaMessage,
      };
      expect(Conversation.templateV2Helper.getMessageFromTranslation(templateTranslation).type)
        .toBe(Conversation.MessageType.MEDIA);

      templateTranslation = {
        ...translationIdentifier,
        ...templateMessage,
      };
      expect(Conversation.templateV2Helper.getMessageFromTranslation(templateTranslation).type)
        .toBe(Conversation.MessageType.TEMPLATE);
    });

    it('should filter out the latest translations', () => {
      const version1Translation: Conversation.V2TemplateTranslation = {
        version: '1',
        language_code: 'en-US',
        text_message: {
          text: 'text',
        },
      };
      const latestTranslation: Conversation.V2TemplateTranslation = {
        version: 'latest',
        language_code: 'en-US',
        text_message: {
          text: 'text',
        },
      };
      const translations = [version1Translation, latestTranslation];
      const filteredTranslations = Conversation.templateV2Helper.getPreviousTranslations(translations);
      expect(filteredTranslations.length).toBe(1);
      expect(filteredTranslations[0].version).toBe('1');
    });
  });

  describe('Message builder helper', () => {
    it('should build a TextMessage', () => {
      const builtTextMessage = Conversation.messageBuilder.text(textMessageItem);
      expect(builtTextMessage).toEqual(textMessage);
    });

    it('should build a CardMessage', () => {
      const builtTextMessage = Conversation.messageBuilder.card(cardMessageItem);
      expect(builtTextMessage).toEqual(cardMessage);
    });

    it('should build a CarouselMessage', () => {
      const builtMessage = Conversation.messageBuilder.carousel(carouselMessageItem);
      expect(builtMessage).toEqual(carouselMessage);
    });

    it('should build a ChoiceMessage', () => {
      const builtMessage = Conversation.messageBuilder.choice(choiceMessageItem);
      expect(builtMessage).toEqual(choiceMessage);
    });

    it('should build a LocationMessage', () => {
      const builtMessage = Conversation.messageBuilder.location(locationMessageItem);
      expect(builtMessage).toEqual(locationMessage);
    });

    it('should build a MediaMessage', () => {
      const builtMessage = Conversation.messageBuilder.media(mediaMessageItem);
      expect(builtMessage).toEqual(mediaMessage);
    });

    it('should build a TemplateMessage', () => {
      const builtMessage = Conversation.messageBuilder.template(templateMessageItem);
      expect(builtMessage).toEqual(templateMessage);
    });

    it('should build a ListMessage', () => {
      const builtMessage = Conversation.messageBuilder.list(listMessageItem);
      expect(builtMessage).toEqual(listMessage);
    });
  });

});
