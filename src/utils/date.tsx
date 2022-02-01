import moment from 'moment'
import { dateFormat } from './api'

export const formatDate = (date: Date|undefined): string => {
  return moment(date).format(dateFormat)
}
