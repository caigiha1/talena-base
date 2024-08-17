import {DatePicker} from 'antd'
import {Control, Controller} from 'react-hook-form'
import dayjs from 'dayjs'
import ErrorMessage from '../../../common/ErrorMessage'
import GuidelineField from '../../../common/GuidelineFiled'
import Label from '../label/Label'
import { TimeIcon } from '../../../common/Icon'

interface IProps {
  control: Control<any>
  defaultValue?: any
  name: string
  placeholder?: string
  label?: string
  className?: string
  guideline?: string[]
  onChange?: (data: Date | null) => void
  required?: boolean
  disabled?: boolean
  format?: string
  showTime?: any
  showNow?: boolean
  disabledDate?: (current: dayjs.Dayjs) => any
  disabledTime?: (current: dayjs.Dayjs | null) => any
  isListScreen?: boolean
}

const HookFormDateTime = ({
  control,
  defaultValue,
  name,
  placeholder,
  label,
  className,
  guideline,
  onChange,
  required,
  disabled = false,
  format,
  showTime,
  showNow,
  disabledDate,
  disabledTime,
}: IProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({field, fieldState}) => {
        return (
          <>
            {label && <Label label={label} required={required} />}
            <DatePicker
              style={{width: '100%', height: 40}}
              placeholder={placeholder}
              status={fieldState.error ? 'error' : undefined}
              ref={field.ref}
              name={field.name}
              format={format || 'DD/MM/YYYY'}
              onBlur={field.onBlur}
              value={field.value ? dayjs(field.value) : null} // Convert the date to dayjs object for the DateTimePicker
              onChange={(date) => {
                onChange && onChange(date ? date.toDate() : null)
                field.onChange(date ? date.toDate() : null) // Convert the dayjs object to a regular Date object
              }}
              className={`${className} text-black dark:text-white dark:border-form-strokedark dark:bg-form-input `}
              // showTime
              disabled={disabled}
              showTime={showTime}
              showNow={showNow}
              disabledDate={disabledDate}
              disabledTime={disabledTime}
              suffixIcon={<TimeIcon />}
            />
            <div>
              <GuidelineField guideline={guideline} />
              <ErrorMessage>{fieldState.error?.message}</ErrorMessage>
            </div>
          </>
        )
      }}
    />
  )
}

export default HookFormDateTime
