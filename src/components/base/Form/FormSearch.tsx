import { Input } from "antd";
import { SearchIcon } from "../../../common/Icon";


type IInput = {
    placeholder?: string
    onChange?: any
    title?: string | null
}



const SearchInput = ({placeholder, onChange, title}:IInput ) => {
  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">
        {title}
      </label>
      <Input
        onChange={onChange}
        prefix={<SearchIcon />}
        placeholder={placeholder ?? ''}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
  );
};

export default SearchInput;
