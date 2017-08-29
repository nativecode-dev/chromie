import { MessageType } from '@messaging/Envelope'
import { MessageBroker } from '@messaging/MessageBroker'
import { MessageHandler } from '@messaging/MessageHandler'

type Port = chrome.runtime.Port

export class MessageServer extends MessageBroker {
  constructor() {
    super('message-server')
    chrome.runtime.onConnect.addListener(this.onConnect)
  }

  public on(type: MessageType, handler: MessageHandler): void {
    this.addHandler(type, handler)
  }

  public off(type: MessageType): void {
    this.removeHandler(type)
  }

  private readonly onConnect = (port: Port): void => {
    this.initialize(port)
  }
}
