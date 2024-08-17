import React from 'react';
import { Select } from 'antd';
import { DownIcon } from '../../../common/Icon';
import { isNull } from 'lodash';
import { DownOutlined } from '@ant-design/icons';

interface IProps {
  onChange?: (val: any) => void;
  className?: string;
  size: 'large' | 'middle' | 'small';
  value?: string | null;
  options: Array<{ label: string; value: string | number }> | undefined;
  placeholder?: any;
  showSearch?: boolean;
  filterOption?: boolean;
  suffixIcon?: any;
  dropdownStyle?: React.CSSProperties | undefined;
}

const SelectHeica = ({
  onChange,
  className,
  size,
  value,
  options,
  placeholder,
  showSearch = false,
  suffixIcon = <DownOutlined rev='' />,
  dropdownStyle,
}: IProps) => {
  return (
    <Select
      onChange={onChange}
      className={`${className ?? ''} w-full bg-gray-100 shadow-none border-gray-300 text-black dark:text-white dark:border-form-strokedark dark:bg-form-input`}
      value={value}
      placeholder={placeholder}
      size={size}
      showSearch={showSearch}
      dropdownStyle={{
        minWidth: '90px',
        ...(dropdownStyle && dropdownStyle),
      }}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={options}
      suffixIcon={isNull(suffixIcon) ? null : <DownIcon width={9} height={6} />}
    />
  );
};

export default SelectHeica;
