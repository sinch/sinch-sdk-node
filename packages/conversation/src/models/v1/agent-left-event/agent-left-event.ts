import { Agent } from '../agent';

export interface AgentLeftEvent {
  /** @see AgentLeftEventType */
  agent_left_event: AgentLeftEventType;
}

export interface AgentLeftEventType {
  /** Represents an agent that is involved in a conversation. */
  agent: Agent;
}
