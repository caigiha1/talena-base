import {useState} from 'react'
import PopupConfirm from '../common/PopupConfirm'

export interface IConfirm {
  onClick: any
  body?: string | string[]
  okButtonCaption?: string
  cancelButtonCaption?: string
  onClose?: () => void
  isMoreDescription?: boolean
}
export const useConfirm = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [option, setOption] = useState<IConfirm>({onClick: () => {}, onClose: () => {}})
  const confirm = (option: IConfirm) => {
    setOpen(true)
    setOption({...option})
  }

  const contextHolder = open ? (
    <PopupConfirm
      open={open}
      setOpen={setOpen}
      onClick={() => {
        option.onClick()
        setOpen(false)
      }}
      body={option.body}
      okButtonCaption={option.okButtonCaption}
      cancelButtonCaption={option.cancelButtonCaption}
      onClose={option.onClose}
      isMoreDescription={option.isMoreDescription}
    />
  ) : (
    <></>
  )

  return {confirm, contextHolder, isMoreDescription: option.isMoreDescription}
}
