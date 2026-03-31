import { CallMessageChoice, LocationMessageChoice, TextMessageChoice, UrlMessageChoice } from '../../../src/models';
import { CalendarMessageChoice, ShareLocationMessageChoice } from '../../../src/models/v1/choice/choice';

export const callMessageChoice = {
  call_message: {
    title: 'Call me',
    phone_number: '+1234567890',
  },
  postback_data: 'call_postback_123',
} satisfies CallMessageChoice;

export const locationMessageChoice = {
  location_message: {
    title: 'Send my location',
    coordinates: {
      latitude: 48.0378283,
      longitude: -4.751659,
    },
    label: 'Send my location',
  },
  postback_data: 'location_postback_123',
} satisfies LocationMessageChoice;

export const textMessageChoice = {
  text_message: {
    text: 'Hello, this is a text message choice!',
  },
  postback_data: 'text_postback_123',
} satisfies TextMessageChoice;

export const urlMessageChoice = {
  url_message: {
    url: 'https://example.com',
    title: 'Visit our website',
  },
  postback_data: 'url_postback_123',
} satisfies UrlMessageChoice;

export const calendarMessageChoice = {
  calendar_message: {
    title: 'Schedule a meeting',
    event_title: 'Meeting with Team',
    event_description: 'Discuss project updates and next steps.',
    event_start: new Date('2026-01-15T10:00:00Z'),
    event_end: new Date('2026-01-15T11:00:00Z'),
    fallback_url: 'https://example.com/calendar',
  },
  postback_data: 'calendar_postback_123',
} satisfies CalendarMessageChoice;

export const shareLocationMessageChoice = {
  share_location_message: {
    title: 'Share my location',
    fallback_url: 'https://example.com/share-location',
  },
  postback_data: 'share_location_postback_123',
} satisfies ShareLocationMessageChoice;
