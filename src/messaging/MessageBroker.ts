import { Envelope, instanceOfEnvelope, MessageType } from '@messaging/Envelope'
import { MessageHandler } from '@messaging/MessageHandler'

type Port = chrome.runtime.Port

export abstract class MessageBroker {
  private readonly identifer: string
  private readonly handlers: Map<string, MessageHandler> = new Map<string, MessageHandler>()

  constructor(identifier: string) {
    this.identifer = identifier
  }

  public get id(): string {
    return this.identifer
  }

  protected addHandler(type: MessageType, handler: MessageHandler): void {
    this.handlers.set(type, handler)
  }

  protected removeHandler(type: MessageType): void {
    if (this.handlers.has(type)) {
      this.handlers.delete(type)
    }
  }

  protected initialize(port: Port): void {
    port.onDisconnect.addListener(this.onDisconnect)
    port.onMessage.addListener(this.onMessage)
  }

  protected uninitialize(port: Port): void {
    port.onMessage.removeListener(this.onMessage)
    port.onDisconnect.removeListener(this.onDisconnect)
  }

  private process(message: any, port: Port): void {
    if (instanceOfEnvelope(message)) {
      const handler: MessageHandler | undefined = this.handlers.get(message.type)
      if (handler && (!handler.executable || handler.executable(message))) {
        const response: any = handler.execute(message)
        if (response) {
          port.postMessage(response)
        }
      }
    }
  }

  private readonly onDisconnect = (port: Port): void => {
    this.uninitialize(port)
  }

  private readonly onMessage = (message: any, port: Port): void => {
    this.process(message, port)
  }
}
