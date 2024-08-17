import {DatePicker} from 'antd'
import dayjs from 'dayjs'
import {Dispatch, SetStateAction} from 'react'

interface IProps {
  selectedDate: Date | null
  setSelectedDate: Dispatch<SetStateAction<any>>
  placeholder: string
}

const DateTimePicker = ({selectedDate, setSelectedDate, placeholder}: IProps) => {
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  return (
    <DatePicker
      placeholder={placeholder}
      style={{width: '100%', height: '3.1rem'}}
      format='YYYY-MM-DD'
      value={selectedDate ? dayjs(selectedDate) : null}
      onChange={(date) => {
        handleDateChange(date ? date.toDate() : null)
      }}
      className=''
    />
  )
}

export default DateTimePicker
