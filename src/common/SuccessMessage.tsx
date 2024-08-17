import {Typography} from 'antd'
import {ReactNode} from 'react'

interface IProps {
  className?: string
  children: ReactNode
}

const SuccessMessage = ({className = '', children}: IProps) => {
  return (
    <>
      {children && (
        <Typography className={`${className} text-danger`}>
          <small className='lh-1'>{children}</small>
        </Typography>
      )}
    </>
  )
}

export default SuccessMessage
