import { renderHook } from '@testing-library/react-hooks'

import { createWrapper } from '../../../tests/utils'
import { useBalance } from '../useBalance'

test('balance of native token', async () => {
  const { result, waitForValueToChange } = renderHook(
    () => useBalance('uusd'),
    {
      wrapper: createWrapper(),
    },
  )

  await waitForValueToChange(() => result.current, {
    timeout: 2500,
  })

  expect(result.current).toBe('7071578255')
})

test('balance of empty native token', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useBalance('ukrw'), {
    wrapper: createWrapper(),
  })

  await waitForNextUpdate({
    timeout: 2500,
  })

  expect(result.current).toBe('0')
})

test('balance of cw20 token', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBalance('terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x'),
    {
      wrapper: createWrapper(),
    },
  )

  await waitForNextUpdate({
    timeout: 2500,
  })

  expect(result.current).toBe('0')
})

test('balance of wrong cw20 token', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBalance('dsqdsddsqdsdq'),
    {
      wrapper: createWrapper(),
    },
  )

  await waitForNextUpdate({
    timeout: 2500,
  })

  expect(result.current).toBe(null)
})
