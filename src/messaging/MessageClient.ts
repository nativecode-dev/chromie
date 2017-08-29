import { MessageType } from '@messaging/Envelope'
import { MessageBroker } from '@messaging/MessageBroker'
import { MessageHandler } from '@messaging/MessageHandler'

export type IPortFactory = () => chrome.runtime.Port

export class MessageClient extends MessageBroker {
  private readonly port: chrome.runtime.Port

  constructor(factory: IPortFactory) {
    super('message-client')
    this.port = factory()
  }

  public on(type: MessageType, handler: MessageHandler): void {
    this.addHandler(type, handler)
  }

  public off(type: MessageType): void {
    this.removeHandler(type)
  }
}
