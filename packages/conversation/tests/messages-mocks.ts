import {
  CardMessage,
  CardMessageItem,
  CarouselMessage,
  CarouselMessageItem,
  ChoiceMessage,
  ChoiceMessageItem,
  ContactInfoMessage,
  ContactInfoMessageItem,
  ListMessage,
  ListMessageItem,
  LocationMessage,
  LocationMessageItem,
  MediaMessage,
  MediaMessageItem,
  TemplateMessage,
  TemplateMessageItem,
  TextMessage,
  TextMessageItem,
} from '../src';

export const textMessageItem: TextMessageItem = {
  text: 'text message',
};

export const textMessage: TextMessage = {
  text_message: textMessageItem,
};

export const cardMessageItem: CardMessageItem = {
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

export const cardMessage: CardMessage = {
  card_message: cardMessageItem,
};

export const carouselMessageItem: CarouselMessageItem = {
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

export const carouselMessage: CarouselMessage = {
  carousel_message: carouselMessageItem,
};

export const choiceMessageItem: ChoiceMessageItem = {
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

export const choiceMessage: ChoiceMessage = {
  choice_message: choiceMessageItem,
};

export const contactInfoMessageItem: ContactInfoMessageItem = {
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

export const contactInfoMessage: ContactInfoMessage = {
  contact_info_message: contactInfoMessageItem,
};

export const locationMessageItem: LocationMessageItem = {
  title: 'Phare d\'Eckmühl',
  label: 'Pointe de Penmarch',
  coordinates: {
    latitude: 47.7981899,
    longitude: -4.3727685,
  },
};

export const locationMessage: LocationMessage = {
  location_message: locationMessageItem,
};

export const mediaMessageItem: MediaMessageItem = {
  url: 'https://url-to-media.com',
  thumbnail_url: 'https://url-to-thumbnail.com',
};

export const mediaMessage: MediaMessage = {
  media_message: mediaMessageItem,
};

export const templateMessageItem: TemplateMessageItem = {
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

export const templateMessage: TemplateMessage = {
  template_message: templateMessageItem,
};

export const listMessageItem: ListMessageItem = {
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

export const listMessage: ListMessage = {
  list_message: listMessageItem,
};
