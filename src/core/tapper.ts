export class Bpm {
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
    let sum = 0
    for (let i = 0; i < this.beats.length; i++) {
      sum += this.beats[i]
    }
    const average = sum / this.beats.length
    return Math.floor(60000 / average)
  }
}
