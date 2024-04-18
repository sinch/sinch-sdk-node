import { Conversation } from '../src';

export const textMessageItem: Conversation.TextMessageItem = {
  text: 'text message',
};

export const textMessage: Conversation.TextMessage = {
  text_message: textMessageItem,
};

export const cardMessageItem: Conversation.CardMessageItem = {
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

export const cardMessage: Conversation.CardMessage = {
  card_message: cardMessageItem,
};

export const carouselMessageItem: Conversation.CarouselMessageItem = {
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

export const carouselMessage: Conversation.CarouselMessage = {
  carousel_message: carouselMessageItem,
};

export const choiceMessageItem: Conversation.ChoiceMessageItem = {
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

export const choiceMessage: Conversation.ChoiceMessage = {
  choice_message: choiceMessageItem,
};

export const contactInfoMessageItem: Conversation.ContactInfoMessageItem = {
  name: {
    full_name: 'Full Name',
  },
  phone_numbers: [
    {
      phone_number: '+17811234123',
      type: 'WORK',
    },
  ],
};

export const contactInfoMessage: Conversation.ContactInfoMessage = {
  contact_info_message: contactInfoMessageItem,
};

export const locationMessageItem: Conversation.LocationMessageItem = {
  title: 'Phare d\'Eckmühl',
  label: 'Pointe de Penmarch',
  coordinates: {
    latitude: 47.7981899,
    longitude: -4.3727685,
  },
};

export const locationMessage: Conversation.LocationMessage = {
  location_message: locationMessageItem,
};

export const mediaMessageItem: Conversation.MediaMessageItem = {
  url: 'https://url-to-media.com',
  thumbnail_url: 'https://url-to-thumbnail.com',
};

export const mediaMessage: Conversation.MediaMessage = {
  media_message: mediaMessageItem,
};

export const templateMessageItem: Conversation.TemplateMessageItem = {
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

export const templateMessage: Conversation.TemplateMessage = {
  template_message: templateMessageItem,
};

export const strawberryChoiceDetails: Conversation.ChoiceItem = {
  title: 'Strawberry',
  postback_data: 'Strawberry postback',
};

export const blueberryChoiceDetails: Conversation.ChoiceItem = {
  title: 'Blueberry',
  postback_data: 'Blueberry postback',
};

export const chocolateChoiceDetails: Conversation.ChoiceItem = {
  title: 'Chocolate',
  postback_data: 'Chocolate postback',
};

export const vanillaChoiceDetails: Conversation.ChoiceItem = {
  title: 'Vanilla',
  postback_data: 'Vanilla postback',
};

export const bookProductDetails: Conversation.ProductItem = {
  id: '2351786092',
  marketplace: 'bashi-bouzouk',
  item_price: 12,
  currency: 'EUR',
  quantity: 1,
};

export const listMessageItem: Conversation.ListMessageItem = {
  title: 'Choose your icecream flavor',
  description: 'The best icecream in town!',
  sections: [
    {
      title: 'Fruit flavors',
      items: [
        Conversation.listSectionHelper.buildChoiceItem(strawberryChoiceDetails),
        Conversation.listSectionHelper.buildChoiceItem(blueberryChoiceDetails),
      ],
    },
    {
      title: 'Other flavors',
      items: [
        Conversation.listSectionHelper.buildChoiceItem(chocolateChoiceDetails),
        Conversation.listSectionHelper.buildChoiceItem(vanillaChoiceDetails),
      ],
    },
  ],
  message_properties: {
    menu: 'menu text',
  },
};

export const listMessage: Conversation.ListMessage = {
  list_message: listMessageItem,
};
