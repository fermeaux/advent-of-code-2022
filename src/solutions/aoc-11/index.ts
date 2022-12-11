import { Logger } from '../../lib/log'
import { parseFile, parseLine } from '../../lib/parser'

interface Monkey {
  items: number[]
  operation: string
  amount: string
  test: number
  trueMonkey: number
  falseMonkey: number
  inspectCount: number
}

class Resolver {
  day: string
  file: string

  constructor ({ day, testing }: { day: string, testing: boolean}) {
    this.day = day
    this.file = parseFile(day, testing ? 'test' : 'data')
  }

  solve1 () {
    const logger = new Logger(`Day${this.day}-1`)
    const monkeys = this.parse()
    this.solve(20, item => Math.floor(item / 3), monkeys)
    const [a, b] = monkeys.sort((a, b) => b.inspectCount - a.inspectCount)
    const result = a.inspectCount * b.inspectCount
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    const monkeys = this.parse()
    const nextItem = item => item % monkeys.reduce((acc, monkey) => {
      return acc * monkey.test
    }, 1)
    this.solve(10000, nextItem, monkeys)
    const [a, b] = monkeys.sort((a, b) => b.inspectCount - a.inspectCount)
    const result = a.inspectCount * b.inspectCount
    logger.result(result)
  }

  solve (nbRound, nextItem, monkeys) {
    for (let round = 0; round < nbRound; round++) {
      monkeys.forEach((monkey) => {
        const { items, operation, amount, test, trueMonkey, falseMonkey } = monkey
        while (items.length > 0) {
          monkey.inspectCount++
          let item = items.shift()!
          const operand = amount === 'old' ? item : +amount

          if (operation === '+') item += operand
          else if (operation === '*') item *= operand

          item = nextItem(item)

          if (item % test === 0) monkeys[trueMonkey].items.push(item)
          else monkeys[falseMonkey].items.push(item)
        }
      })
    }
  }

  parse () {
    return this.file.split('\n\n').reduce((monkeys, part) => {
      monkeys.push(part.split('\n').reduce((monkey, line) => {
        const [left, right] = line.trim().split(': ')
        if (left === 'Starting items') monkey.items = right.split(', ').map(tmp => +tmp)
        if (left === 'Operation') {
          const { operation, amount } = parseLine(right, /new = old (?<operation>.+) (?<amount>.+)/)
          monkey.operation = operation
          monkey.amount = amount
        }
        if (left === 'Test') {
          const { value } = parseLine(right, /divisible by (?<value>.+)/)
          monkey.test = +value
        }
        if (left === 'If true') {
          const { value } = parseLine(right, /throw to monkey (?<value>.+)/)
          monkey.trueMonkey = +value
        }
        if (left === 'If false') {
          const { value } = parseLine(right, /throw to monkey (?<value>.+)/)
          monkey.falseMonkey = +value
        }
        return monkey
      }, { inspectCount: 0 } as Monkey))
      return monkeys
    }, [] as Monkey[])
  }
}

const day = '11'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()
