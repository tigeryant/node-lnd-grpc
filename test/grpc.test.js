import test from 'tape-promise/tape'
import sinon from 'sinon'
import LndGrpc from '../src'
import { remoteHost } from './helpers/grpc'

const { host, cert, macaroon, lndconenctString } = remoteHost
const grpcOptions = { host, cert, macaroon }

test('connect (paths)', async t => {
  sinon.restore()
  t.plan(1)
  const grpc = new LndGrpc(grpcOptions)
  try {
    await grpc.connect()
    t.equal(grpc.state, 'active', 'should connect')
    await grpc.disconnect()
  } catch (e) {
    await grpc.disconnect()
    t.fail(e)
  }
})

test.skip('connect (lndconnect)', async t => {
  sinon.restore()
  t.plan(1)
  const grpc = new LndGrpc({ lndconnectUri: lndconenctString })
  try {
    await grpc.connect()
    t.equal(grpc.state, 'active', 'should connect')
    await grpc.disconnect()
  } catch (e) {
    await grpc.disconnect()
    t.fail(e)
  }
})
