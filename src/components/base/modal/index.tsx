import { Modal } from "antd";
import { ReactNode } from "react";
import IconButton from "../button/IconButton";
import { CloseIcon } from "@/common/Icon";

interface IProps {
  children: ReactNode;
  title: string | undefined;
  open: boolean;
  handleCancel: () => void;
  showFooter?: boolean;
  cancelButtonCaption?: any;
  okButtonCaption?: any;
  okButtonClass?: string | undefined;
  cancelButtonClass?: string | undefined;
  buttonSize?: "small" | "medium" | "lager" | "extra";
  customTitle?: ReactNode;
  showHeader?: boolean;
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  confirmOnclose?: boolean | string[];
  size?: string;
  modelClassname?: string;
  refClass?: string;
  childClass?: string;
  parentChildClass?: string;
  footerButtonClassName?: string;
  overlayClass?: string;
  color?: string;
  colorCancel?: string;
  position?: "center" | "start" | "end";
  fullWidthBtn?: boolean;
  isFullScreen?: boolean;
  isContentFull?: boolean;
  isInner?: boolean;
  isBordered?: boolean;
  closeAfterSubmit?: boolean;
  showOkButton?: boolean;
  showCancelButton?: boolean;
  zIndex?: string;
  scrollbale?: boolean;
  footerClassName?: string;
  externalLoading?: boolean;
  revertFunction?: boolean;
  showCloseIcon?: boolean;
  disableClickOutSide?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onOk: () => void;
  classNameModal?: string | undefined;
  width?: string;
  handleClose?: () => void;
  handleCloseModal?: () => void;
  classNameTitle?: string
}

const SappModalV2 = ({
  children,
  open,
  title,
  handleCancel,
  showFooter = true,
  onOk,
  classNameModal,
  width,
  handleClose,
  handleCloseModal,
  classNameTitle,
}: IProps) => {
  return (
    <Modal
      footer={false}
      centered
      open={open}
      closeIcon={false}
      className={classNameModal ?? "sapp-modal"}
      onCancel={handleClose || handleCancel}
      width={width}
    >
      <div className={`flex justify-between items-center self-stretch ${classNameTitle} `}>
        <div className="text-lightGrey-900 font-urbanist text-headlines-title font-bold">{title}</div>

        <div>
          <IconButton
            className="bg-lightGrey-200"
            icon={<CloseIcon />}
            onClick={handleCloseModal}
          />
        </div>
      </div>
      {children}
      {showFooter && (
        <div className={`md:pt-9 pt-5 flex justify-end cursor-pointer gap-8`}>
          <div
            className="flex p-2 px-4 justify-center items-center gap-2 rounded-lg bg-lightGrey-100 font-urbanist"
            onClick={handleCloseModal}
          >
            Cancel
          </div>
          <div
            onClick={onOk}
            className="flex p-2 px-4 justify-center items-center gap-2 rounded-lg bg-danger-800 text-white font-urbanist"
          >
            Continue
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SappModalV2;
