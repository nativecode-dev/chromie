import 'mocha'

import { expect } from 'chai'
import { instanceOfMessageHandler, MessageHandler } from './MessageHandler'

describe('when using MessageHandlers', () => {

  it('should check instanceOfMessageHandler is valid', () => {
    const handler = {
      execute: (message: any) => message
    }
    expect(instanceOfMessageHandler(handler)).to.equal(true)
  })

  it('should check instanceOfMessageHandler is invalid', () => {
    const handler = {}
    expect(instanceOfMessageHandler(handler)).to.equal(false)
  })

})
