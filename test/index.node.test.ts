/**
 * @jest-environment node
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
      expect(countdown.timer).not.toBeNull() // 只有这里和jsdom不一样,node evn setTimeout返回NodeJS.Timeout对象
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

  describe('[countdown.start(30, 60)] countdown.count is null', function() {
    beforeEach(() => {
      countdown.start(30, 60)
    })

    // 后边可以附加功能：当c < d时，throw error tip.
    it('30, 60, count is null', function() {
      expect(countdown.count).toBeNull()
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
