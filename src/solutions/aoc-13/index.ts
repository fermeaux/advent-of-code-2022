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
    const { pairs } = this.parse1()
    const result = pairs.reduce((total, pair, i) => {
      if (this.compare(pair) === true) total += i + 1
      return total
    }, 0)
    logger.result(result)
  }

  parse1 () {
    return this.file.split('\n\n').reduce((acc, cur) => {
      const [left, right] = cur.split('\n')
      acc.pairs.push({ left: JSON.parse(left), right: JSON.parse(right) })
      return acc
    }, { pairs: [] as { left: string, right: string }[] })
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    const lines = this.parse2()
    lines.sort((left, right) => {
      const comparison = this.compare({ left, right })
      if (comparison === true) return -1
      if (comparison === false) return 1
      return 0
    })
    const first = lines.findIndex(line => JSON.stringify(line) === '[[2]]') + 1
    const last = lines.findIndex(line => JSON.stringify(line) === '[[6]]') + 1
    const result = first * last
    logger.result(result)
  }

  parse2 () {
    return this.file.split('\n\n').reduce((acc, cur) => {
      const [left, right] = cur.split('\n')
      acc.push(JSON.parse(left), JSON.parse(right))
      return acc
    }, [[[2]], [[6]]])
  }

  compare (pair): boolean | null {
    for (let i = 0; i < pair.left.length && i < pair.right.length; i++) {
      const left = pair.left[i]
      const right = pair.right[i]
      if (typeof left === 'number' && typeof right === 'number') {
        if (left < right) return true
        if (left > right) return false
      } else if (typeof left === 'object' && typeof right === 'object') {
        const comparison = this.compare({ left, right })
        if (comparison !== null) return comparison
      } else if (typeof left === 'number') {
        const comparison = this.compare({ left: [left], right })
        if (comparison !== null) return comparison
      } else if (typeof right === 'number') {
        const comparison = this.compare({ left, right: [right] })
        if (comparison !== null) return comparison
      }
    }

    const { left, right } = pair
    if (left.length < right.length) return true
    if (left.length > right.length) return false
    return null
  }
}

const day = '13'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()
