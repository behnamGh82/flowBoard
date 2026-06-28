import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/fa'
import 'dayjs/locale/en'
import type { AppLanguage } from '@/types'

dayjs.extend(relativeTime)

export const syncDayjsLocale = (language: AppLanguage) => {
  dayjs.locale(language === 'fa' ? 'fa' : 'en')
}

export const formatDate = (date: string | Date, format = 'MMM D, YYYY') =>
  dayjs(date).format(format)

export const formatRelative = (date: string | Date) => dayjs(date).fromNow()

export const isOverdue = (date?: string) =>
  date ? dayjs(date).isBefore(dayjs(), 'day') : false
