export type MessageType = string

export interface Envelope {
  message: any
  recipients: string[]
  sender: string
  type: MessageType
}

export const instanceOfEnvelope = (instance: any): instance is Envelope => {
  return ('message' in instance)
    && ('recipients' in instance)
    && ('sender' in instance)
    && ('type' in instance)
}
