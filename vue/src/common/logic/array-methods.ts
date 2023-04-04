import { Direction } from '../types'

export function moveArrayElementIndex<T>(array: Array<T>, index: number, direction: Direction): void {
    if (direction === 'up') {
      if (index > 0) {
        [array[index - 1], array[index]] = [array[index], array[index - 1]];
      }
    } else if (direction === 'down') {
      if (index < array.length - 1) {
        [array[index], array[index + 1]] = [array[index + 1], array[index]];
      }
    }

    localStorage.setItem('userTodos', JSON.stringify(array))
  }