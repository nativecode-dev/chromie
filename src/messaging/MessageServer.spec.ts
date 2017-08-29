import 'mocha'

import * as chrome from 'sinon-chrome'

import { expect } from 'chai'
import { MessageServer } from './MessageServer'

// tslint:disable-next-line:no-string-literal
global['chrome'] = chrome

describe('when using MessageServer', () => {

  describe('when constructing new instances', () => {
    it('should create instance without erroring and assign listener', () => {
      const server = new MessageServer()
      expect(chrome.runtime.onConnect.addListener.callCount).to.equal(1)
    })
  })

  describe('when using MessageServer instance', () => {
    let server: MessageServer
    beforeEach(() => {
      server = new MessageServer()
    })

    it('should register event handler', () => {
      server.on('test', { execute: (message: any): any => message })
    })

    it('should fail to post message when invalid tabId specified', () => {
      expect(() => server.send(0, 'message', 'test')).throws(Error)
    })
  })

})
