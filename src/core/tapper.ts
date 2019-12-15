export class Tapper {
  private cue: number[] = []
  private max = 8

  constructor(max: number = 8) {
    this.max = max
  }

  tap() {
    this.cue.push(Date.now())
    if (this.cue.length > this.max) this.cue.shift()
  }

  reset() {
    this.cue = []
  }

  private get beats() {
    const beats = []
    for (let i = 0; i < this.cue.length - 1; i++) {
      beats.push(this.cue[i + 1] - this.cue[i])
    }
    return beats
  }

  get bpm() {
    if (!this.beats.length) return 0

    const sum = this.beats.reduce((acc, beat) => {
      acc += beat
      return acc
    }, 0)
    const average = Math.floor(sum / this.beats.length / 10) * 10
    const bpm = Math.floor(60000 / average)

    return bpm
  }
}
