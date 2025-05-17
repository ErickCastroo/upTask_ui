function FormatDate(isoString: string): string {
  const date = new Date(isoString)
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return formattedDate.format(date)
}

export { FormatDate }