import { PlayMessage } from '../play-message';
import { FormatEnum, Say } from '../say';
import { SayMessage } from '../say-message';

/** Plain text, or SSML when `format` is set. `text()` leaves format unset. */
export function sayMessage(text: string, voiceName: string, format?: FormatEnum): SayMessage {
  const say: Say = {
    text,
    voiceName,
  };
  if (format !== undefined) {
    say.format = format;
  }
  return {
    type: 'SAY',
    say,
  };
}

export function playMessage(url: string): PlayMessage {
  return {
    type: 'PLAY',
    play: {
      url,
    },
  };
}
