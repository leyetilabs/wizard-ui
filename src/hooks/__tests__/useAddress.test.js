import { renderHook } from '@testing-library/react-hooks'

import { useAddress } from '../useAddress'
import { createWrapper } from '../../../tests/utils'

test('exposes terra wallet address', () => {
  const { result } = renderHook(useAddress, {
    wrapper: createWrapper(),
  })

  expect(result.current).toBe('terra1hajtg9chne7vt0ue0jp95jtl6zclndnw7qqm7l')
})
