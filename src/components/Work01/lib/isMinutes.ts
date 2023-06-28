const isMinutes = (arg: any): arg is Minutes => {
  return (
    typeof arg === 'object' &&
    typeof arg.date === 'number' &&
    typeof arg.title === 'string' &&
    typeof arg.content === 'string'
  )
}

export const isStoredMinutes = (arg: any): arg is Minutes[] => {
  return Array.isArray(arg) && arg.every(isMinutes)
}
