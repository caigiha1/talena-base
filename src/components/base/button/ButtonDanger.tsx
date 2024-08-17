import { Link } from "react-router-dom";
import { IButtonProps } from "../../../type";


const ButtonDanger = ({
    title,
    onClick,
    className = '',
    link,
    loading,
    type = 'button',
    disabled
}:IButtonProps) => {
    let disabledClass =
    disabled || loading
      ? "cursor-not-allowed opacity-60 bg-danger"
      : "cursor-pointer";
    let componentClass = `${className} ${disabledClass} inline-flex items-center justify-center rounded-md text-white py-4 px-10 text-center bg-danger-900 font-medium text-white hover:bg-opacity-90 text-white focus:bg-danger-900 focus:outline-none focus:text-danger-100 focus:ring-4 focus:ring-danger-100 shadow-none active:shadow-active lg:px-8 py-4 xl:px-10 py-4`
    if (link)
        return (
         <Link to={link} className={`${componentClass ?? ''} `}>
            {title} 
         </Link>
        )
    return (
        <button
            className={componentClass}
            type={type ?? 'button'}
            onClick={onClick}
            disabled= {disabled || loading}
        >
            <span className={loading ? 'invisible' : ''} >{title}</span>
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

export default ButtonDanger