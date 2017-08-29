import { Envelope, MessageType } from '@messaging/Envelope'
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

  public send<T>(type: MessageType, message: T, recipient: string): void {
    const envelope: Envelope = {
      message,
      recipients: [recipient],
      sender: this.id,
      type,
    }
    this.port.postMessage(envelope)
  }
}
