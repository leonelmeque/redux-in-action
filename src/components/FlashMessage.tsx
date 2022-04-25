import { FunctionComponent } from "react";

interface FlashMessageProps {
    message: string
}
 
const FlashMessage: FunctionComponent<FlashMessageProps> = ({message}) => {
    return ( <div className="flex flex-row items-center justify-center py-4 bg-red-300 text-white">{message}</div> );
}
 
export default FlashMessage;