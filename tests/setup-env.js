import { Crypto } from '@peculiar/webcrypto'
import '@testing-library/jest-dom'
import { setLogger } from 'react-query'

global.crypto = new Crypto()

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
})
