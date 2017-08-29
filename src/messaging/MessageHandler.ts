import { Envelope, MessageType } from '@messaging/Envelope'

export type MessageBrokerHandler = (message: Envelope) => any
export type MessageBrokerFilter = (message: Envelope) => boolean

export interface MessageHandler {
  executable?: MessageBrokerFilter
  execute: MessageBrokerHandler
}

export const instanceOfMessageHandler = (instance: any): instance is MessageHandler => {
  return ('execute' in instance)
}
