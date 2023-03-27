export type Priority = 'orange' | 'yellow' |'deeppink' | 'black'

export interface Todo {
  id: string,
  description?: string,
  completed: boolean,
  title: string,
  priority: Priority,
  actionOpened: boolean
}