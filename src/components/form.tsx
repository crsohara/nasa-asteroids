import { useState } from 'react'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const Form = ({ onSubmit }: {onSubmit: Function}) => {
  const [startDate, setStartDate] = useState(new Date());

  const onClick = () => {
    onSubmit(startDate)
  }

  return (
    <form action="#">
      <DatePicker
        selected={startDate}
        dateFormat="yyyy-MM-dd"
        onChange={(date: Date) => setStartDate(date)}
      />
      <button onClick={onClick}>Submit</button>
    </form>
  )
}

export default Form