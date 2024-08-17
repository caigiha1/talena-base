import { Control, Controller } from "react-hook-form";
import ErrorMessage from "../../../common/ErrorMessage";
import { Skeleton } from "antd";
import Label from "../label/Label";
import GuidelineField from "../../../common/GuidelineFiled";
import TextFiled from "./TextField";

interface IProps {
  isListScreen?: boolean;
  name: string;
  control: Control<any>;
  defaultValue?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: "number" | "password" | "email" | "text";
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  labelClass?: string;
  value?: string | number;
  onChangeType?: () => void;
  passwordVisible?: boolean;
  showIconPassword?: boolean;
  skeleton?: boolean;
  required?: boolean;
  maxLength?: number;
  guideline?: Array<string> | undefined;
  groupText?: any;
  postFix?: any;
  preIcon?: any;
  minNumber?: number;
  requiredZero?: boolean;
  onSubmit?: any;
}

const Input = ({
  name,
  control,
  defaultValue,
  onChange,
  type,
  placeholder,
  className = "",
  disabled,
  label,
  labelClass,
  onChangeType,
  passwordVisible,
  showIconPassword,
  skeleton,
  required,
  maxLength,
  guideline,
  groupText,
  postFix,
  preIcon,
  minNumber,
  requiredZero,
  onSubmit,
  isListScreen,
}: IProps) => {
  //   const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            {onSubmit ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(e);
                }}
                className="w-100"
              >
                {!skeleton ? (
                  <>
                    {label && <Label label={label} required={required} />}
                    <TextFiled
                      groupText={groupText}
                      type={type}
                      value={field.value ?? ""}
                      defaultValue={field.value ? undefined : defaultValue}
                      onChange={(value) => {
                        field.onChange(value);
                        onChange && onChange(value);
                      }}
                      className={`${className} ${
                        error ? "is-invalid" : "sapp-form-control"
                      }`}
                      placeholder={placeholder}
                      disabled={disabled}
                      label={label}
                      labelClass={labelClass}
                      onChangeType={onChangeType}
                      passwordVisible={passwordVisible}
                      showIconPassword={showIconPassword}
                      error={error}
                      required={required}
                      maxLength={maxLength}
                      guideline={guideline}
                      field={field}
                      postFix={postFix}
                      preIcon={preIcon}
                      minNumber={minNumber}
                      requiredZero={requiredZero}
                      isListScreen={isListScreen}
                    />{" "}
                    <div>
                      <>
                        <GuidelineField guideline={guideline} />
                        <ErrorMessage>{error?.message ?? ""}</ErrorMessage>
                      </>
                    </div>
                  </>
                ) : (
                  <>
                    <Skeleton.Button active size="small" className="mb-1" />
                    <Skeleton.Button
                      active
                      block
                      size="large"
                      className="sapp-h-45px"
                    />
                  </>
                )}
              </form>
            ) : (
              <div className="w-100">
                {!skeleton ? (
                  <>
                    {label && <Label label={label} required={required} />}
                    <TextFiled
                      groupText={groupText}
                      type={type}
                      value={field.value ?? ""}
                      defaultValue={field.value ? undefined : defaultValue}
                      onChange={(value) => {
                        field.onChange(value);
                        onChange && onChange(value);
                      }}
                      className={`${className} ${
                        error ? "is-invalid" : "sapp-form-control"
                      }`}
                      placeholder={placeholder}
                      disabled={disabled}
                      label={label}
                      labelClass={labelClass}
                      onChangeType={onChangeType}
                      passwordVisible={passwordVisible}
                      showIconPassword={showIconPassword}
                      error={error}
                      required={required}
                      maxLength={maxLength}
                      guideline={guideline}
                      field={field}
                      postFix={postFix}
                      preIcon={preIcon}
                      minNumber={minNumber}
                      requiredZero={requiredZero}
                      isListScreen={isListScreen}
                    />{" "}
                    <div>
                      <>
                        <GuidelineField guideline={guideline} />
                        <ErrorMessage>{error?.message ?? ""}</ErrorMessage>
                      </>
                    </div>
                  </>
                ) : (
                  <>
                    <Skeleton.Button active size="small" className="mb-1" />
                    <Skeleton.Button
                      active
                      block
                      size="large"
                      className="sapp-h-45px"
                    />
                  </>
                )}
              </div>
            )}
          </>
        );
      }}
    />
  );
};

export default Input;
