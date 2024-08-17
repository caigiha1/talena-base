import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";

const ToggleEyeIcon = ({ showPassword, toggleShowPassword }: any) => (
  <div
    className="absolute top-3 right-3 cursor-pointer"
    onClick={toggleShowPassword}
    onKeyDown={toggleShowPassword}
  >
    {showPassword ? (
      <RiEyeOffLine className="text-lightGrey-600" />
    ) : (
      <RiEyeLine className="text-lightGrey-600" />
    )}
  </div>
);

export default ToggleEyeIcon;
