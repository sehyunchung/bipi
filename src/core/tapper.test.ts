import { Bpm } from './tapper'

describe('Bpm 클래스를 테스트하자', () => {
  let tapper: Bpm

  beforeEach(() => {
    tapper = new Bpm()
  })

  it('tapper.tap()을 실행하지 않았을 때 bpm은 0이다.', () => {
    expect(tapper.bpm).toBe(0)
  })

  it('500ms 간격으로 4번 탭하면 bpm은 120이다. 그 후 reset()을 호출하면 bpm은 0이다.', async () => {
    const tap120 = new Promise(res => {
      let id = setInterval(() => {
        tapper.tap()
      }, 500)
      setTimeout(() => {
        res(clearInterval(id))
      }, 2000)
    })
    await tap120
    expect(tapper.bpm).toBe(120)
    tapper.reset()
    expect(tapper.bpm).toBe(0)
  })
})
