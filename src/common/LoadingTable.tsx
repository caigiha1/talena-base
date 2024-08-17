import {Skeleton} from 'antd'

const LoadingTable = ({headers}: {headers: Array<any>}) => {
  return (
    <tr>
      {headers.map((header) => (
        <td key={header.id || header?.label || header}>
          <Skeleton.Input size='large' active />
        </td>
      ))}
    </tr>
  )
}

export default LoadingTable
