import 'mocha'

import { expect } from 'chai'
import { Envelope, instanceOfEnvelope } from './Envelope'

describe('when using Envelopes', () => {

  it('should check instanceOfEnvelope is valid', () => {
    const envelope = {
      message: {},
      recipients: ['recipient@localhost'],
      sender: 'sender@localhost',
      type: 'message'
    }
    expect(instanceOfEnvelope(envelope)).to.equal(true)
  })

  it('should check instanceOfEnvelope is invalid', () => {
    const envelope = {}
    expect(instanceOfEnvelope(envelope)).to.equal(false)
  })

})
