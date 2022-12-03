import { Logger } from '../../lib/log'
import { groupLines, parseFile } from '../../lib/parser'

class Resolver {
  day: string
  file: string
  lines: string[]

  constructor ({ day, testing }: { day: string, testing: boolean}) {
    this.day = day
    this.file = parseFile(day, testing ? 'test' : 'data')
    this.lines = this.file.split('\n')
  }

  solve1 () {
    const logger = new Logger(`Day${this.day}-1`)
    let total = 0
    this.lines.forEach(line => {
      const chars = line.split('')
      const a = chars.splice(0, chars.length / 2)
      const b = chars
      let point = 0
      const points = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
          if (a[i] === b[j] && point === 0) {
            point = points.split('').findIndex(tmp => a[i] === tmp) + 1
          }
        }
      }
      total += point
    })

    logger.result(total)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    let total = 0
    const groups = groupLines(this.lines, 3)
    groups.forEach(group => {
      const [a, b, c] = group
      let point = 0
      const points = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
          for (let k = 0; k < c.length; k++) {
            if (a[i] === b[j] && b[j] === c[k] && point === 0) {
              point = points.split('').findIndex(tmp => a[i] === tmp) + 1
            }
          }
        }
      }
      total += point
    })

    logger.result(total)
  }
}

const day = '03'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()
