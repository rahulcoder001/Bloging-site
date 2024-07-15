
interface buttoninterface{
    title: string,
    onpress: ()=>void
}


export const Buttoncomponent = ({title,onpress}:buttoninterface)=>{
    return <div className=" flex justify-center ml-2 mt-8 rounded-md bg-black">
        <button className="p-3 w-full font-bold text-white" onClick={onpress}>
            {title}
        </button>
    </div>
}