import { ChangeEvent } from "react"

interface inputinterface {
    lable: string,
    placeholder: string,
    onchange: (e: ChangeEvent<HTMLInputElement>)=>void
 
}


export const LableInput = ({lable,placeholder,onchange}:inputinterface)=>{
    return <div className="flex flex-col " >
        <label className=" font-bold p-2 text-md">{lable}</label>
        <input className=" border-2 ml-2 p-2 rounded-md border-gray-500" type="text" placeholder={placeholder} onChange={onchange}/>    
    </div>
}