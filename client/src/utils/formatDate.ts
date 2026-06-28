import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const formatDate = (date: string | Date, format = 'MMM D, YYYY') =>
  dayjs(date).format(format)

export const formatRelative = (date: string | Date) => dayjs(date).fromNow()

export const isOverdue = (date?: string) =>
  date ? dayjs(date).isBefore(dayjs(), 'day') : false
