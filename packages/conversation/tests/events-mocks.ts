import {
  AgentJoinedEvent,
  AgentLeftEvent,
  CommentReplyEvent,
  ComposingEndEvent,
  ComposingEvent,
  GenericEvent,
} from '../src';

export const composingEvent: ComposingEvent = {
  composing_event: {},
};

export const composingEndEvent: ComposingEndEvent = {
  composing_end_event: {},
};

export const commentReplyEvent: CommentReplyEvent = {
  comment_reply_event: {
    text: 'Reply comment content',
  },
};

export const agentJoinedEvent: AgentJoinedEvent = {
  agent_joined_event: {
    agent: {
      display_name: 'Agent name',
      type: 'HUMAN',
    },
  },
};

export const agentLeftEvent: AgentLeftEvent = {
  agent_left_event: {
    agent: {
      display_name: 'Agent name',
      type: 'HUMAN',
    },
  },
};

export const genericEvent: GenericEvent = {
  generic_event: {
    payload: {
      some: 'data',
    },
  },
};
