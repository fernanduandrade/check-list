export type Priority = 'orange' | 'yellow' |'deeppink' | 'black'

export interface Todo {
  id: string,
  description?: string,
  completed: boolean,
  title: string,
  priority: Priority,
  actionOpened: boolean,
  editing: boolean
}

export type Direction = 'up' | 'down'

export interface CheckboxProps {
  disabled?: boolean,
  modelValue?: boolean,
  priority: Priority
}

export interface ActionModalProps {
  flag: Priority,
  todo: Todo,
  lastPosition: boolean,
  firstPosition: boolean,
  oneElement: boolean
}