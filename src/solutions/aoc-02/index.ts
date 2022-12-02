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
    let value = 0
    const score = {
      X: 1,
      Y: 2,
      Z: 3
    }
    const beat = {
      X: 'C',
      Y: 'A',
      Z: 'B'
    }
    const equal = {
      X: 'A',
      Y: 'B',
      Z: 'C'
    }
    this.lines.forEach(line => {
      const { a, b } = parseLine(line, /(?<a>.+) (?<b>.+)/)
      value += score[b]
      if (beat[b] === a) value += 6
      if (equal[b] === a) value += 3
    })

    logger.result(value)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    let value = 0
    const winScore = {
      X: 0,
      Y: 3,
      Z: 6
    }
    const typeScore = {
      A: 1,
      B: 2,
      C: 3
    }
    const loose = {
      A: 'C',
      B: 'A',
      C: 'B'
    }
    const equal = {
      A: 'A',
      B: 'B',
      C: 'C'
    }
    const beat = {
      A: 'B',
      B: 'C',
      C: 'A'
    }
    this.lines.forEach(line => {
      const { a, b } = parseLine(line, /(?<a>.+) (?<b>.+)/)
      value += winScore[b]
      if (b === 'X') value += typeScore[loose[a]]
      if (b === 'Y') value += typeScore[equal[a]]
      if (b === 'Z') value += typeScore[beat[a]]
      logger.info(value)
    })

    logger.result(value)
  }
}

const day = '02'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()
