import './Badge.scss'

interface IAssigned {
  name: string
  classNameColor?: 'primary' | 'danger' | 'success' | 'info' | 'warning'
  id: string
}

const StatusInfo = ({ status }: { status: IAssigned[] | undefined }) => {
  const getColorRole = (id: number | string) => {
    switch (id) {
      case 0:
      case '0':
        return 'badge-primary'
      case 1:
      case '1':
        return 'badge-light'
      case 2:
      case '2':
        return 'badge-success'
      case 3:
      case '3':
        return 'badge-danger'
      case 4:
      case '4':
        return 'badge-secondary'
      case 5:
      case '5':
        return 'badge-warning'
      case 6:
      case '6':
        return 'badge-info'
      default:
        return ''
    }
  }

  return (
    <>
      {status?.map((status) => (
        <div
          key={status.id}
          className={`${getColorRole(status.id)} text-xs my-1 mr-1 py-1 px-2 inline rounded-lg`}
        >
          {status.name}
        </div>
      ))}
    </>
  )
}

export default StatusInfo
