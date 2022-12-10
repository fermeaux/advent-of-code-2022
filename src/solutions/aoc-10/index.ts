import { Logger } from '../../lib/log'
import { parseFile } from '../../lib/parser'

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
    let x = 1
    let cycle = 0
    let result = 0

    this.lines.forEach(line => {
      const [command, value] = line.split(' ')
      let nbTick = 0
      if (command === 'noop') nbTick = 1
      if (command === 'addx') nbTick = 2
      for (let i = 0; i < nbTick; i++) {
        cycle++
        if ((cycle + 20) % 40 === 0) result += cycle * x
      }
      if (command === 'addx') x += +value
    })
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    let min = 0
    let max = 2
    let cycle = 0
    let row = ''

    this.lines.forEach(line => {
      const [command, value] = line.split(' ')
      let nbTick = 0
      if (command === 'noop') nbTick = 1
      if (command === 'addx') nbTick = 2
      for (let i = 0; i < nbTick; i++) {
        const index = cycle % 40
        row += index >= min && index <= max ? '#' : ' '
        if (index === 39) {
          logger.info(row)
          row = ''
        }
        cycle++
      }
      if (command === 'addx') {
        min += +value
        max += +value
      }
    })
  }
}

const day = '10'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()
