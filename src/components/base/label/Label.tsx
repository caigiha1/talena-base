
interface IProps {
  required?: boolean;
  label: string;
  className?: string;
  isLabel?: boolean;
}

const Label = ({ label, required, className, isLabel = false }: IProps) => {
  return (
    <label
      className={`text-gray-800 ${
        isLabel ? 'font-bold' : 'text-sm font-semibold mb-2 leading-tight'
      } ${className ?? ''}`}
    >
      <span className={`${required ? 'required' : ''}`}>{label}</span>
    </label>
  );
};

export default Label;
