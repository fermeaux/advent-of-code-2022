import { Logger } from '../../lib/log'
import { parseFile } from '../../lib/parser'

class Resolver {
  day: string
  file: string
  lines: string[]
  values: any
  bottom: number = 0
  left: number = 500
  right: number = 500

  constructor ({ day, testing }: { day: string, testing: boolean}) {
    this.day = day
    this.file = parseFile(day, testing ? 'test' : 'data')
    this.lines = this.file.split('\n')
  }

  solve1 () {
    const logger = new Logger(`Day${this.day}-1`)
    this.parse()
    let step = 0
    while (this.simulateSand1(500, 0)) step++
    this.logMap()
    logger.result(step)
  }

  simulateSand1 (x, y) {
    const below = this.values[`${x},${y + 1}`]
    const left = this.values[`${x - 1},${y + 1}`]
    const right = this.values[`${x + 1},${y + 1}`]
    if (y > this.bottom) {
      return false
    }
    if (!below) {
      return this.simulateSand1(x, y + 1)
    }
    if (!left) {
      return this.simulateSand1(x - 1, y + 1)
    }
    if (!right) {
      return this.simulateSand1(x + 1, y + 1)
    }
    this.values[`${x},${y}`] = '+'
    return true
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    this.parse()
    let step = 1
    while (this.simulateSand2(500, 0)) step++
    this.logMap()
    logger.result(step)
  }

  simulateSand2 (x, y) {
    const below = this.values[`${x},${y + 1}`]
    const left = this.values[`${x - 1},${y + 1}`]
    const right = this.values[`${x + 1},${y + 1}`]
    if (y > this.bottom) {
      this.values[`${x},${y}`] = '+'
      return true
    }
    if (!below) {
      return this.simulateSand2(x, y + 1)
    }
    if (!left) {
      return this.simulateSand2(x - 1, y + 1)
    }
    if (!right) {
      return this.simulateSand2(x + 1, y + 1)
    }
    this.values[`${x},${y}`] = '+'
    if (x === 500 && y === 0) return false
    return true
  }

  parse () {
    this.values = {}
    this.lines.forEach(line => {
      const points = line.split(' -> ')
      for (let i = 0; i < points.length; i++) {
        if (i > 0) {
          const [ax, ay] = points[i - 1].split(',')
          const [bx, by] = points[i].split(',')
          for (let y = Math.min(+ay, +by); y < Math.max(+ay, +by) + 1; y++) {
            for (let x = Math.min(+ax, +bx); x < Math.max(+ax, +bx) + 1; x++) {
              this.values[`${x},${y}`] = '#'
            }
          }
        }
        this.values[points[i]] = '#'
        const [x, y] = points[i].split(',')
        if (+y > this.bottom) this.bottom = +y
        if (+x < this.left) this.left = +x
        if (+x > this.right) this.right = +x
      }
    })
  }

  logMap () {
    for (let y = 0; y < this.bottom + 1; y++) {
      let str = ''
      for (let x = this.left; x < this.right; x++) {
        str += this.values[`${x},${y}`] || '.'
      }
      console.log(str)
    }
  }
}

const day = '14'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()
