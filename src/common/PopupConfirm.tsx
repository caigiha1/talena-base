import { Dispatch, SetStateAction } from 'react';

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
  body?: string | string[];
  okButtonCaption?: string;
  cancelButtonCaption?: string;
  bg?: 'danger' | 'primary';
  onClose?: () => void;
  loading?: boolean;
  isMoreDescription?: boolean;
}

const PopupConfirm = ({
  open,
  setOpen,
  onClick,
  body,
  okButtonCaption,
  cancelButtonCaption,
  bg = 'danger',
  onClose,
  loading,
  isMoreDescription = false,
}: IProps) => {
  const handleClose = () => {
    onClose && onClose();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-lg ${
          isMoreDescription ? 'max-w-lg' : 'max-w-md'
        } w-full p-6`}
      >
        <div className="flex justify-center items-center w-12 h-12 bg-yellow-500 rounded-full mb-4">
          <span className="text-white text-2xl">!</span>
        </div>
        <div className="text-center mb-4">
          {body
            ? typeof body === 'string'
              ? body
              : body.map((e: string) => (
                  <div key={e} className="mb-2">
                    {e}
                  </div>
                ))
            : 'Bạn có chắc chắn muốn khóa không?'}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            className={`btn ${bg === 'danger' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'} font-bold py-2 px-4 rounded min-w-[70px]`}
            onClick={onClick}
            disabled={loading}
          >
            {okButtonCaption ?? 'Yes, block!'}
          </button>
          <button
            className="btn bg-gray-300 text-black font-bold py-2 px-4 rounded min-w-[70px]"
            onClick={handleClose}
          >
            {cancelButtonCaption ?? 'No, cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupConfirm;
