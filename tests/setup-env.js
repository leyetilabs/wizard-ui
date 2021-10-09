import { Crypto } from '@peculiar/webcrypto'
import '@testing-library/jest-dom'
import { setLogger } from 'react-query'

global.crypto = new Crypto()

jest.mock('@terra-money/wallet-provider', () => {
  const originalModule = jest.requireActual('@terra-money/wallet-provider')
  const newModule = jest.requireActual('@terra-dev/use-wallet')

  return {
    ...originalModule,
    ...newModule,
  }
})

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
})
