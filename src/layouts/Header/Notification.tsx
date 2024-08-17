import { Dispatch, SetStateAction } from 'react';
import { Drawer } from 'antd';

interface IProps {
  setOpenNotifications: Dispatch<SetStateAction<boolean>>;
  openNotifications: boolean;
}

const Notifications = ({ setOpenNotifications, openNotifications }: IProps) => {

  const getDrawerWidth = () => {
    if (window.innerWidth >= 1200) {
      return 550;
    } else {
      return 350;
    }
  };

  return (
    <Drawer
      placement='right'
      closable={false}
      onClose={() => setOpenNotifications(false)}
      open={openNotifications}
      width={getDrawerWidth()}
    >
      <div className='w-full border-0 rounded-none' id='kt_drawer_chat_messenger'>
        <div className='p-5' id='kt_drawer_chat_messenger_header'>
          <div className='flex justify-center flex-col me-3'>
            <a href='/' className='text-xl font-bold text-gray-900 hover:text-primary me-1 mb-2'>
              {/* {profileMe?.detail?.full_name} */}
              abc
            </a>

            {/* <div className='mb-0'>
              <span className='badge badge-success badge-circle w-2.5 h-2.5 me-1'></span>
              <span className='text-sm font-semibold text-muted'>Active</span>
            </div> */}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default Notifications;
