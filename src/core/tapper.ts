export class Tapper {
  private cue: number[]
  private max: number

  constructor(max: number = 9) {
    this.max = max
    this.cue = []
  }

  tap() {
    this.cue.push(Date.now())
    if (this.cue.length > this.max) this.cue.shift()
  }

  reset() {
    this.cue = []
  }

  get bpm() {
    if (this.cue.length < 4) return 0

    let beats = []
    for (let i = 0; i < this.cue.length; i++) {
      if (this.cue[i + 1]) beats.push(this.cue[i + 1] - this.cue[i])
    }

    const sum = beats.reduce((acc, beat) => (acc += beat), 0)
    const average = Math.floor(sum / beats.length / 10) * 10
    const bpm = Math.floor(60000 / average)
    return bpm
  }
}
