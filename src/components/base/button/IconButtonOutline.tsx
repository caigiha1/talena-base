import { Link } from "react-router-dom";
import { IIconButtonProps } from "../../../type";


const IConButtonOutLine = ({
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
      ? 'cursor-not-allowed opacity-60 bg-lightGrey'
      : 'cursor-pointer'
    let componentClass = `${className} ${disabledClass} inline-flex items-center justify-center rounded-lg border border-primary-500 gap-1 p-1 text-center font-medium text-primary-500 hover:bg-opacity-90  focus: text-primary-500 focus: text-primary-700 focus: bg-white lg:px-1 xl:px-1`
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
            <span className={loading ? 'invisible' : ''} >{icon}</span>
            {title ?? ''}
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

export default IConButtonOutLine