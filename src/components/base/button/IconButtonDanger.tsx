import { Link } from "react-router-dom";
import {  IIconButtonProps } from "../../../type";



const IconButtonDanger = ({
    title,
    onClick,
    className = '',
    link,
    loading,
    type = 'button',
    disabled,
    icon,
}:IIconButtonProps) => {
    let disabledClass =
    disabled || loading
      ? 'cursor-not-allowed opacity-60 bg-danger-900'
      : 'cursor-pointer'
    let componentClass = `${className} ${disabledClass} inline-flex items-center justify-center  rounded-lg p-1 border border-danger-100  text-center font-medium text-white  focus:text-danger-100 focus: bg-danger-900 focus:outline-none focus:ring-2 dark: bg-danger-900 focus:ring-danger-100 hover:bg-opacity-90 gap-1 dark:text-white dark:border-form-strokedark  `
    if (link)
        return (
         <Link to={link} className={`${componentClass ?? ''} `}>
            {title || ''} 
         </Link>
        )
    return (
        <button
            className={componentClass}
            type={type ?? 'button'}
            onClick={onClick}
            disabled= {disabled || loading}
        >
            {icon}
            {title}
            {loading && (
                <div className="absolute w-100 h-100 top-0 left-0 right-0 bottom-0 flex space-x-2 justify-center items-center bg-none dark:invert">
                <span className="sr-only">Loading...</span>
                <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
              </div>
            )}
        </button>
    )
}

export default IconButtonDanger