import { Logger } from '../../lib/log'
import { parseFile, parseLine } from '../../lib/parser'

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
    const head = { x: 0, y: 0 }
    const tail = { x: 0, y: 0 }
    const values = new Set()
    this.lines.forEach(line => {
      const { command, amount } = parseLine(line, /(?<command>.+) (?<amount>.+)/)
      const inc = { x: 0, y: 0 }
      if (command === 'R') inc.x++
      else if (command === 'L') inc.x--
      else if (command === 'U') inc.y++
      else if (command === 'D') inc.y--
      for (let i = 0; i < +amount; i++) {
        head.x += inc.x
        head.y += inc.y
        if (tail.x - head.x < -1) {
          tail.x++
          if (tail.y !== head.y) tail.y = head.y
        }
        if (tail.y - head.y < -1) {
          tail.y++
          if (tail.x !== head.x) tail.x = head.x
        }
        if (tail.x - head.x > 1) {
          tail.x--
          if (tail.y !== head.y) tail.y = head.y
        }
        if (tail.y - head.y > 1) {
          tail.y--
          if (tail.x !== head.x) tail.x = head.x
        }
        values.add(`${tail.x}/${tail.y}`)
      }
    })
    const result = values.size
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    const rope = [...Array(10)].map(() => ({ x: 0, y: 0 }))
    const values = new Set()
    this.lines.forEach(line => {
      const { command, amount } = parseLine(line, /(?<command>.+) (?<amount>.+)/)
      const inc = { x: 0, y: 0 }
      if (command === 'R') inc.x++
      else if (command === 'L') inc.x--
      else if (command === 'U') inc.y++
      else if (command === 'D') inc.y--
      for (let i = 0; i < +amount; i++) {
        rope[0].x += inc.x
        rope[0].y += inc.y
        for (let j = 1; j < rope.length; j++) {
          const head = rope[j - 1]
          const tail = rope[j]
          if (tail.x - head.x < -1) {
            tail.x++
            if (tail.y !== head.y) tail.y = head.y
          }
          if (tail.y - head.y < -1) {
            tail.y++
            if (tail.x !== head.x) tail.x = head.x
          }
          if (tail.x - head.x > 1) {
            tail.x--
            if (tail.y !== head.y) tail.y = head.y
          }
          if (tail.y - head.y > 1) {
            tail.y--
            if (tail.x !== head.x) tail.x = head.x
          }
          if (j === rope.length - 1) values.add(`${tail.x}/${tail.y}`)
        }
      }
    })
    const result = values.size
    logger.result(result)
  }
}

const day = '09'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()
