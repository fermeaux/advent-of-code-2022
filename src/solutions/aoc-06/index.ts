import { hasUniqueCharacters } from '../../lib/helper'
import { Logger } from '../../lib/log'
import { parseFile } from '../../lib/parser'

class Resolver {
  day: string
  file: string
  line: string

  constructor ({ day, testing }: { day: string, testing: boolean}) {
    this.day = day
    this.file = parseFile(day, testing ? 'test' : 'data')
    this.line = this.file
  }

  solve1 () {
    const logger = new Logger(`Day${this.day}-1`)
    let value = 0
    for (let index = 3; index < this.line.length && value === 0; index++) {
      const str = this.line.slice(index - 3, index + 1)
      if (hasUniqueCharacters(str)) value = index + 1
    }

    logger.result(value)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    let value = 0
    for (let index = 13; index < this.line.length && value === 0; index++) {
      const str = this.line.slice(index - 13, index + 1)
      if (hasUniqueCharacters(str)) value = index + 1
    }

    logger.result(value)
  }
}

const day = '06'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()
