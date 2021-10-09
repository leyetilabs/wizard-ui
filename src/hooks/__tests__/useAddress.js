import { renderHook } from '@testing-library/react-hooks'
import { LocalTerra } from '@terra-money/terra.js'

import { useAddress } from '../useAddress'

const lt = new LocalTerra()
const mockTest1 = lt.wallets.test1

jest.mock('@terra-money/wallet-provider', () => ({
  useConnectedWallet: () => ({
    terraAddress: mockTest1.key.accAddress,
  }),
}))

test('exposes terra wallet address', () => {
  const { result } = renderHook(useAddress)

  expect(result.current).toBe(mockTest1.key.accAddress)
})
