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
    this.lines.forEach(line => {
      const { aMin, aMax, bMin, bMax } = parseLine(line, /(?<aMin>.+)-(?<aMax>.+),(?<bMin>.+)-(?<bMax>.+)/)
      if ((+aMin <= +bMin && +aMax >= +bMax) || (+bMin <= +aMin && +bMax >= +aMax)) {
        value++
      }
    })
    logger.result(value)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    let value = 0
    this.lines.forEach(line => {
      const { aMin, aMax, bMin, bMax } = parseLine(line, /(?<aMin>.+)-(?<aMax>.+),(?<bMin>.+)-(?<bMax>.+)/)
      if ((+aMin <= +bMin && +aMax >= +bMin) || (+bMin <= +aMin && +bMax >= +aMin)) {
        value++
      }
    })
    logger.result(value)
  }
}

const day = '04'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()
