import { Envelope, MessageType } from '@messaging/Envelope'
import { MessageBroker } from '@messaging/MessageBroker'
import { MessageHandler } from '@messaging/MessageHandler'

type Port = chrome.runtime.Port

export class MessageServer extends MessageBroker {
  private readonly ports: Map<number, Port> = new Map<number, Port>()

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

  public send<T>(tabId: number, type: MessageType, message: T, recipients: string[] = []): void {
    const port: Port | undefined = this.ports.get(tabId)
    if (port) {
      const envelope: Envelope = {
        message,
        recipients,
        sender: this.id,
        type,
      }

      port.postMessage(envelope)
    } else {
      throw new Error(`Failed to find port for tabId: ${tabId}.`)
    }
  }

  protected uninitialize(): void {
    this.ports.forEach((port: Port) => super.uninitialize(port))
  }

  private readonly onConnect = (port: Port): void => {
    if (port.sender && port.sender.tab && port.sender.tab.id) {
      this.ports.set(port.sender.tab.id, port)
      this.initialize(port)
    } else {
      throw new Error('Failed to find unique id for port.')
    }
  }
}
