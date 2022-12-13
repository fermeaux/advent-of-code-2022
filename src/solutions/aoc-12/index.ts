import { Logger } from '../../lib/log'
import { parseFile } from '../../lib/parser'

interface Position {
  step: number
  point: [number, number]
}

class Resolver {
  day: string
  file: string
  lines: string[]
  end: { x: number, y: number }
  points: any

  constructor ({ day, testing }: { day: string, testing: boolean}) {
    this.day = day
    this.file = parseFile(day, testing ? 'test' : 'data')
    this.lines = this.file.split('\n')
  }

  solve1 () {
    const logger = new Logger(`Day${this.day}-1`)
    const { start, end, ...points } = this.parse()
    this.end = end
    this.points = points
    const step = this.solve([start])
    logger.result(step)
  }

  parse () {
    const elevations = 'abcdefghijklmnopqrstuvwxyz'
    return this.lines.reduce((points, line, y) => {
      for (let x = 0; x < line.length; x++) {
        let elevation: number
        if (line[x] === 'S') {
          elevation = 0
          points.start = { point: [x, y], step: 0 }
        } else if (line[x] === 'E') {
          elevation = 25
          points.end = { x, y }
        } else elevation = elevations.indexOf(line[x])

        if (elevation === 0) {
          points.startPositions.push({ point: [x, y], step: 0 })
        }
        points[`${x}/${y}`] = { elevation, visited: elevation === 0 }
      }
      return points
    }, { startPositions: [] } as any)
  }

  solve (startPositions) {
    const positions = startPositions
    while (positions.length > 0) {
      const { point: [x, y], step } = positions.shift()!
      if (x === this.end.x && y === this.end.y) {
        return step
      }
      positions.push(...this.getNextPositions(x, y, step))
    }
    return -1
  }

  getNextPositions (x, y, step) {
    const nextPositions: Position[] = []
    const point = this.points[`${x}/${y}`]
    nextPositions.push(
      ...this.computeNextPoint(x - 1, y, step, point.elevation),
      ...this.computeNextPoint(x, y - 1, step, point.elevation),
      ...this.computeNextPoint(x + 1, y, step, point.elevation),
      ...this.computeNextPoint(x, y + 1, step, point.elevation)
    )
    return nextPositions
  }

  computeNextPoint (x, y, step, elevation) {
    const point = this.points[`${x}/${y}`]
    if (point && !point.visited && point.elevation - elevation <= 1) {
      point.visited = true
      return [{ point: [x, y], step: step + 1 } as Position]
    }
    return []
  }

  logField () {
    for (let y = 0; y < this.lines.length; y++) {
      let log: string = ''
      const letters: string[] = []
      for (let x = 0; x < this.lines[0].length; x++) {
        const visited = this.points[`${x}/${y}`].visited
        log += (visited ? '\x1b[31m' : '\x1b[0m') + '%s'
        letters.push(this.lines[y][x])
      }
      log += '\x1b[0m'
      console.log(log, ...letters)
    }
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    const { end, startPositions, ...points } = this.parse()
    this.end = end
    this.points = points
    const step = this.solve(startPositions)
    logger.result(step)
  }
}

const day = '12'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()
