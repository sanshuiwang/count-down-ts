/**
 * @jest-environment jsdom
 */
import countdown from '@/src'

function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

describe('verification', function() {
  afterEach(() => {
    countdown.clear()
  })

  describe('[countdown.start()] start func use params defaults', function() {
    beforeEach(() => {
      countdown.start()
    })

    it('timer > 0', function() {
      expect(countdown.timer).toBeGreaterThan(0) // 和node env不一样，setTimeout返回timerId
    })

    it('0 <= countdown.count <= 60, sleep 3 seconds', async function() {
      expect(countdown.count).toBe(60)
      await sleep(3000)
      expect(countdown.count).toBe(58)
    })
  })

  describe('[countdown.start( , , callback)] callback return val', function() {
    it('0 <= val <= 60', function() {
      countdown.start(undefined, undefined, c => {
        expect(countdown.count).toBe(60)
      })
    })
  })

  describe('[countdown.start(30, 60)]', function() {
    function cMoreD() {
      countdown.start(10, 40)
    }
    it('30, 60, [ start < end ], throw error message.', function() {
      expect(cMoreD).toThrowError('count-down-ts start(c, d, callback?) function c must be greater than d.')
    })
  })
})

describe('callback', function() {
  describe('callback used', function() {
    it('callback carry count', async function() {
      const callback = jest.fn()
      countdown.start(3, 0, callback)
      await sleep(3000)
      expect(callback).toHaveBeenCalledTimes(3)
      countdown.clear()
      expect(countdown.timer).toBeNull()
      expect(countdown.count).toBeNull()
    })
  })
})

describe('c >= d', function() {
  describe('carry function', function() {
    it('carry(5, 10)', async function() {
      countdown.carry(5, 10)
    })
  })
})
