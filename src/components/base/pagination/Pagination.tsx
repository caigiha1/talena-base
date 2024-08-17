import { Pagination } from 'antd';
import { multiply } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { pageSizeOptions } from '../../../common';
import SelectHeica from '../Form/Select';
import './pagination.scss'

interface IProps {
  currentPage: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  pageSize: any;
  setPageSize?: Dispatch<SetStateAction<number>>;
  totalItems: any;
  isAllSelected?: boolean | undefined;
  clearSelected?: () => void;
  handlePaginationChange?: any;
  handleChangeParams?: (currenPage: number, size: number) => void;
  pageSizeOptionsDetail?: Array<{ label: string; value: number }>;
}

const IPagination = ({
  currentPage,
  pageSize,
  setCurrentPage,
  setPageSize,
  totalItems,
  clearSelected,
  isAllSelected,
  handlePaginationChange,
  handleChangeParams,
  pageSizeOptionsDetail,
}: IProps) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page_index = parseInt(queryParams.get('page_index') as any);
  const page_size = parseInt(queryParams.get('page_size') as any);

  const handleCurrentChange = (page: number) => {
    setCurrentPage && setCurrentPage(page);
    if (isAllSelected) {
      clearSelected && clearSelected();
    }
    handleChangeParams && handleChangeParams(page, page_size || 10);
  };

  const handlePageChange = (size: number) => {
    if (multiply(page_index, size) > totalItems) {
      setCurrentPage && setCurrentPage(1);
    }
    setCurrentPage && setCurrentPage(1);
    setPageSize && setPageSize(size);
    handleChangeParams &&
      handleChangeParams(
        multiply(page_index, size) > totalItems ? 1 : page_index || 1,
        size
      );
  };



  return (
    <>
      {totalItems > 10 && (
        <div className='flex flex-wrap justify-between mt-5 gap-4 text-black dark:text-white dark:border-form-strokedark dark:bg-form-input'>
          <label className='flex items-center font-bold'>
            <span className='text-sm me-3'>Show</span>
            <SelectHeica
              value={pageSize}
              onChange={
                handlePaginationChange
                  ? (page_size: number) => handlePaginationChange(1, page_size)
                  : handlePageChange
              }
              size='middle'
              options={pageSizeOptionsDetail || pageSizeOptions}
              className='w-20'
            />
            <span className='ms-3 text-sm w-full text-black dark:text-white dark:border-form-strokedark dark:bg-form-input'>of {totalItems} entries</span>
          </label>
          <Pagination
            total={totalItems}
            current={currentPage}
            pageSize={pageSize}
            onChange={handlePaginationChange ? handlePaginationChange : handleCurrentChange}
          />
        </div>
      )}
    </>
  );
};

export default IPagination;
