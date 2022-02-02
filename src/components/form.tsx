import { useState } from 'react'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { formatDate } from '../utils/date'

const Form = ({ onSubmit, loading }: {onSubmit: Function, loading: boolean}) => {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date|undefined>(undefined)

  const dateFormat = 'yyyy-MM-dd'

  const onClick = () => {
    onSubmit(formatDate(startDate), formatDate(endDate))
  }

  return (
    <form action="#">
      <div className="max-w-lg mx-auto text-center">
        <fieldset className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="cursor-pointer" htmlFor="start_date">Start date</label>
            <DatePicker
              id="start_date"
              selected={startDate}
              dateFormat={dateFormat}
              onChange={(date: Date) => setStartDate(date)}
              className="border mt-2 rounded-md px-4 py-2 text-center block w-full"
              placeholderText="YYYY-MM-DD"
            />
          </div>
          <div>
          <label className="cursor-pointer" htmlFor="end_date">End date</label>
            <DatePicker
              id="end_date"
              selected={endDate}
              minDate={startDate}
              dateFormat={dateFormat}
              isClearable
              onChange={(date: Date) => setEndDate(date)}
              className="border mt-2 rounded-md px-4 py-2 text-center block w-full"
              placeholderText="YYYY-MM-DD"
            />
          </div>
        </fieldset>

        <div ></div>

        <button
          onClick={onClick}
          disabled={loading}
          className="px-4 py-2 bg-red-900 hover:bg-red-800 focus:bg-red-700 rounded-md text-white mt-4 disabled:bg-red-300"
        >Submit</button>

      </div>
    </form>
  )
}

export default Form