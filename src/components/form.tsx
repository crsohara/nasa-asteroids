import { useState } from 'react'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { formatDate } from '../utils/date'

const Form = ({ onSubmit }: {onSubmit: Function}) => {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date|undefined>(undefined)

  const dateFormat = 'yyyy-MM-dd'

  const onClick = () => {
    onSubmit(formatDate(startDate), formatDate(endDate))
  }

  return (
    <form action="#">
      <DatePicker
        selected={startDate}
        dateFormat={dateFormat}
        onChange={(date: Date) => setStartDate(date)}
      />
      <DatePicker
        selected={endDate}
        dateFormat={dateFormat}
        onChange={(date: Date) => setEndDate(date)}
      />
      <button onClick={onClick}>Submit</button>
    </form>
  )
}

export default Form