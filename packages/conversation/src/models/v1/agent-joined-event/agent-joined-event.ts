import { Agent } from '../agent';

export interface AgentJoinedEvent {
  /** @see AgentJoinedEventType */
  agent_joined_event: AgentJoinedEventType;
}

export interface AgentJoinedEventType {
  /** Represents an agent that is involved in a conversation. */
  agent: Agent;
}
