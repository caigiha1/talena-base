import { Tooltip } from 'antd';
import { ReactNode} from 'react';
import './action.scss'

type Props = {
  children: ReactNode;
  customWidth?: string;
};

const ActionCell = ({ children, customWidth }: Props) => {


  return (
    <>
      <div data-kt-menu-trigger="click" data-kt-menu-placement="left-start">
        <Tooltip title="Action" color="#ffffff" placement="top">
          <span className="btn-icon btn-icon-gray-500 w-9 h-9 lg:w-10 lg:h-10 bg-none sapp-btn-action-cell">
            <svg
              className="sapp-btn-action-cell_svg"
              xmlns="http://www.w3.org/2000/svg"
              height="1.05em"
              viewBox="0 0 128 512"
            >
              <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
            </svg>
          </span>
        </Tooltip>
      </div>
      <div
        className={`${customWidth ?? 'w-50'} menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 py-4`}
        data-kt-menu="true"
      >
        {children}
      </div>
    </>
  );
};

export default ActionCell;
