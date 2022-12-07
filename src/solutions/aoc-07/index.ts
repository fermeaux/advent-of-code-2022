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
    const values = this.parse()
    const result = this.solve(values)
      .filter((value) => value <= 100000)
      .reduce((acc, cur) => acc + cur, 0)
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    const values = this.parse()
    const sizes = this.solve(values)
    const goal = 30000000 - (70000000 - sizes[0])
    const result = sizes
      .filter(size => size >= goal)
      .sort((a, b) => a - b)
    logger.result(result[0])
  }

  parse () {
    const values = {}
    let path: string[] = []
    for (let i = 0; i < this.lines.length; i++) {
      const args = this.lines[i].split(' ')
      if (args[0] === '$' && args[1] === 'cd') {
        const arg = args[2]
        if (arg === '/') path = []
        else if (arg === '..') path.splice(path.length - 1, 1)
        else path.push(arg)
      } else if (args[0] === '$' && args[1] === 'ls') {
        continue
      } else if (args[0] === 'dir') {
        continue
      } else {
        let tmp = values
        for (let j = 0; j < path.length; j++) {
          if (!tmp[path[j]]) tmp[path[j]] = {}
          tmp = tmp[path[j]]
        }
        tmp[args[1]] = +args[0]
      }
    }
    return values
  }

  solve (values) {
    return Object.entries(values).reduce((sizes, [key, value]) => {
      if (typeof value === 'object') {
        const objectSizes = this.solve(value)
        sizes = [...sizes, ...objectSizes]
        sizes[0] += objectSizes[0]
      } else {
        sizes[0] += +(value || 0)
      }
      return sizes
    }, [0])
  }
}

const day = '07'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()
