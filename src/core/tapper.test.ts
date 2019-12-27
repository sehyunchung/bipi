import { Tapper } from './tapper'

let tapper = Tapper.new()

describe('Tapper 클래스를 테스트하자', () => {
  test('tapper.tap()을 실행하지 않았을 때 bpm은 0이다.', () => {
    expect(tapper.bpm).toBe(0)
  })

  test('1초 간격으로 탭하면 bpm은 60이다. 그 후 reset()을 호출하면 bpm은 0이다.', async () => {
    const tap120 = new Promise(resolve => {
      const id = setInterval(() => {
        tapper.tap()
      }, 1000)
      setTimeout(() => {
        resolve(clearInterval(id))
      }, 3000)
    })
    await tap120
    expect(Math.ceil(tapper.bpm)).toBe(60)

    tapper.reset()
    expect(tapper.bpm).toBe(0)
  })

  test('400ms 간격으로 탭하면 bpm은 150이다.', async () => {
    const tap150 = new Promise(resolve => {
      const id = setInterval(() => {
        tapper.tap()
      }, 400)
      setTimeout(() => {
        resolve(clearInterval(id))
      }, 1600)
    })
    await tap150
    expect(Math.ceil(tapper.bpm)).toBe(150)
  })
})
