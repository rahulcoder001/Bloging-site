

export const Skeleton = ()=>{
    return <div className="w-4/5 h-1/6 m-auto flex flex-col">
        <div className="w-5/6 mx-auto h-8 flex">
          <div className="bg-slate-300 w-8 h-8 rounded-full m-auto">
          </div>
          <div className="bg-slate-300 w-4/5 m-auto h-4 rounded-md">
          </div>
        </div>
        <div className=" bg-slate-300 w-4/5 h-4 mt-2 mx-auto flex flex-col rounded-md"></div>
        <div className=" bg-slate-300 w-3/5 h-4 mt-2 ml-20 flex flex-col rounded-md"></div>
        <div className=" bg-slate-300 w-2/5 h-3 mt-2 ml-20 flex flex-col rounded-md"></div>
    </div>
}