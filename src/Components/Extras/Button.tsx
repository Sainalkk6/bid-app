import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";


type PropType = {
    label?:string;
    image?:ReactElement;
    margin?:string
    path?:string
}

function Button({label,image,margin,path}:PropType){
    const navigate = useNavigate()
    return <button onClick={()=> navigate(`/${path}`)} className={`${margin} text-nowrap rounded-full shadow-sm bg-[#ececec] px-4 h-fit w-fit py-3 border transition-all duration-200 active:scale-95   flex items-center justify-center focus:text-green-900 focus:bg-[#dcee86] font-medium hover:text-green-900 text-lg hover:bg-[#dcee86]`}>{image}{label}</button>
}

export default  Button