import { isEmpty } from 'lodash';
import { ReactNode } from 'react';
import NotData from '../../../pages/userManagement/NotData';
import { MOCKUP_HEADER_USER_LIST } from '../../../constants';
import LoadingTable from '../../../common/LoadingTable';
import Checkbox from '../checkbox/Checkbox.tsx';

interface IProps {
  headers?: Array<{ label: string; className?: string }>;
  children: ReactNode;
  loading: boolean;
  data: Array<any> | undefined;
  isCheckedAll: any;
  onChange: (e: any) => void;
  hasCheckAll?: boolean;
  hasCheck?: boolean;
  showHeader?: boolean;
  showHashtag?: boolean;
  classResponsive?: string;
  classTable?: string;
  classString?: string;
  disabled?: boolean;
  classNameTable?: string;
  classNameSelect?: string;
}

const ITable = ({
  children,
  headers,
  loading,
  data,
  isCheckedAll,
  onChange,
  hasCheckAll = true,
  hasCheck = true,
  showHeader = true,
  showHashtag = false,
  classResponsive = '',
  classTable = 'min-w-full divide-y divide-gray-200',
  classString,
  disabled,
  classNameSelect,
}: IProps) => {
  return (
    <div className={`overflow-x-auto ${classResponsive}`}>
      <table className={`${classTable} w-full text-left`}>
        {showHeader && (
          <thead>
            <tr className={`uppercase text-gray-500 text-xs ${classString}`}>
              {hasCheck && (
                <th className={`w-12 ${classNameSelect ? classNameSelect : 'pr-4'}`}>
                  {hasCheckAll && (
                    <Checkbox
                      checked={isCheckedAll}
                      onChange={onChange}
                      disabled={disabled}
                    />
                  )}
                </th>
              )}
              {showHashtag && (
                <th className='w-10' style={{ lineHeight: '12px' }}>
                  #
                </th>
              )}
              {headers?.map((column) => (
                <th
                  key={column.label}
                  className={`${column.className} text-sm font-semibold`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className='text-gray-700 font-medium text-sm'>
          {loading ? (
            <>
              {MOCKUP_HEADER_USER_LIST.map((_header, i) => (
                <LoadingTable key={i} headers={MOCKUP_HEADER_USER_LIST} />
              ))}
            </>
          ) : (
            children
          )}
        </tbody>
      </table>

      {isEmpty(data) && !loading && <NotData />}
    </div>
  );
}

export default ITable;
