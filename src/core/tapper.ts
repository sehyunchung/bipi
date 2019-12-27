export class Tapper {
  private static instance: Tapper
  private cue: number[] = []

  public static new() {
    if (!Tapper.instance) {
      Tapper.instance = new Tapper()
    }
    return Tapper.instance
  }

  tap() {
    let cur = Date.now()
    let last = this.cue[this.cue.length - 1]
    if (cur - last > 2000) {
      this.reset()
    }
    this.cue.push(cur)
  }

  reset() {
    this.cue = []
  }

  get bpm() {
    if (this.cue.length < 2) return 0

    let beatCount = this.cue.length - 1
    let first = this.cue[0]
    let last = this.cue[this.cue.length - 1]
    let averageBpm = (60000 * beatCount) / (last - first)

    return Math.round(averageBpm * 10) / 10
  }
}
