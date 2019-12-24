import { Tapper } from './tapper'

describe('Tapper 클래스를 테스트하자', () => {
  let tapper: Tapper

  beforeEach(() => {
    tapper = new Tapper()
  })

  test('tapper.tap()을 실행하지 않았을 때 bpm은 0이다.', () => {
    expect(tapper.bpm).toBe(0)
  })

  test('500ms 간격으로 4번 탭하면 bpm은 120이다. 그 후 reset()을 호출하면 bpm은 0이다.', async () => {
    const tap120 = new Promise(resolve => {
      const id = setInterval(() => {
        tapper.tap()
      }, 500)
      setTimeout(() => {
        resolve(clearInterval(id))
      }, 2500)
    })
    await tap120
    expect(tapper.bpm).toBe(120)
    tapper.reset()
    expect(tapper.bpm).toBe(0)
  })

  test('400ms 간격으로 4번 탭하면 bpm은 150이다.', async () => {
    const tap150 = new Promise(resolve => {
      const id = setInterval(() => {
        tapper.tap()
      }, 400)
      setTimeout(() => {
        resolve(clearInterval(id))
      }, 2000)
    })
    await tap150
    expect(tapper.bpm).toBe(150)
  })
})
