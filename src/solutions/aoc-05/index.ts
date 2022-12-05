import { Logger } from '../../lib/log'
import { parseFile, parseLine } from '../../lib/parser'

interface Instruction {
  account: number
  startIndex: number
  endIndex: number
}

class Resolver {
  day: string
  file: string
  crates: string[][]
  instructions: Instruction[]

  constructor ({ day, testing }: { day: string, testing: boolean}) {
    this.day = day
    this.file = parseFile(day, testing ? 'test' : 'data')
  }

  init () {
    this.crates = []
    this.instructions = []
    const [display, instructions] = this.file.split('\n\n')
    const lines = display.split('\n')
    lines.forEach((line, lineIndex) => {
      if (lineIndex >= lines.length - 1) return
      for (let i = 1; i < line.length; i += 4) {
        const index = (i - 1) / 4
        if (!this.crates[index]) this.crates[index] = []
        if (line[i] !== ' ') this.crates[index].push(line[i])
      }
    })
    instructions.split('\n').forEach(instruction => {
      const { account, startIndex, endIndex } = parseLine(instruction, /move (?<account>.+) from (?<startIndex>.+) to (?<endIndex>.+)/)
      this.instructions.push({
        account: +account,
        startIndex: +startIndex - 1,
        endIndex: +endIndex - 1
      })
    })
  }

  solve1 () {
    this.init()
    const logger = new Logger(`Day${this.day}-1`)
    this.instructions.forEach(({ account, startIndex, endIndex }) => {
      for (let j = 0; j < account; j++) {
        const retrieved = this.crates[startIndex].splice(0, 1)
        this.crates[endIndex] = [...retrieved, ...this.crates[endIndex]]
      }
    })
    const result = this.crates.reduce((acc, cur) => {
      return acc + cur[0]
    }, '')
    logger.result(result)
  }

  solve2 () {
    this.init()
    const logger = new Logger(`Day${this.day}-2`)
    this.instructions.forEach(({ account, startIndex, endIndex }) => {
      const retrieved = this.crates[startIndex].splice(0, account)
      this.crates[endIndex] = [...retrieved, ...this.crates[endIndex]].filter(tmp => tmp)
    })
    const result = this.crates.reduce((acc, cur) => {
      return acc + cur[0]
    }, '')
    logger.result(result)
  }
}

const day = '05'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()
