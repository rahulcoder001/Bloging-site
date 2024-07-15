
import { Link } from "react-router-dom"

interface Head{
   title:string,
   subtitle:string,
   link: string,
   path:string
}



export const Heading = ({title,subtitle,link,path}:Head)=>{
    return(
        <div className="">
            <p  className="flex p-2 justify-center font-bold text-4xl">{title}</p>
            <p className="flex p-2 justify-center text-gray-400 font-semibold">{subtitle} ?<Link className="ml-3 underline" to={path}>{link}</Link> </p>
        </div>
    )
}