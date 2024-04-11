import { Conversation } from '../src';

export const composingEvent: Conversation.ComposingEvent = {
  composing_event: {},
};

export const composingEndEvent: Conversation.ComposingEndEvent = {
  composing_end_event: {},
};

export const commentReplyEvent: Conversation.CommentReplyEvent = {
  comment_reply_event: {
    text: 'Reply comment content',
  },
};

export const agentJoinedEvent: Conversation.AgentJoinedEvent = {
  agent_joined_event: {
    agent: {
      display_name: 'Agent name',
      type: 'HUMAN',
    },
  },
};

export const agentLeftEvent: Conversation.AgentLeftEvent = {
  agent_left_event: {
    agent: {
      display_name: 'Agent name',
      type: 'HUMAN',
    },
  },
};

export const genericEvent: Conversation.GenericEvent = {
  generic_event: {
    payload: {
      some: 'data',
    },
  },
};
