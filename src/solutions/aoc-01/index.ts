import { Logger } from '../../lib/log'
import { parseFile } from '../../lib/parser'

class Resolver {
  day: string
  file: string

  constructor ({ day, testing }: { day: string, testing: boolean}) {
    this.day = day
    this.file = parseFile(day, testing ? 'test' : 'data')
  }

  solve1 () {
    const logger = new Logger(`Day${this.day}-1`)
    const elves = this.file.split('\n\n')
    const res = elves.reduce((result, elf) => {
      const calories = elf.split('\n').reduce((acc, cur) => {
        acc += +cur
        return acc
      }, 0)
      if (calories > result) return calories
      return result
    }, 0)
    logger.result(res)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-1`)
    const elves = this.file.split('\n\n')
    const res = elves.map((elf) => {
      const calories = elf.split('\n').reduce((acc, cur) => {
        acc += +cur
        return acc
      }, 0)
      return calories
    }).sort((a, b) => b - a)
    logger.result(res[0] + res[1] + res[2])
  }
}

const day = '01'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()
