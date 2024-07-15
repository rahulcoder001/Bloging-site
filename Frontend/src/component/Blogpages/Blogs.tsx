import { Link } from "react-router-dom";

interface blogcard{
    title: string,
    content:string,
    id:Number,
    name:string,
    date:string,
}


export const Blogs = ({title,name,content,id,date}:blogcard)=>{
    const s = name.toUpperCase();
    
    if(content.length>30){
        content = content.slice(0,30);
    }
    return <div className="border-b-2 m-2 mt-8 border-green-400 hover:bg-slate-100 rounded-lg">
        <Link to={`/blog/${id}`}>
        <div className="flex">
            <div className="w-8 h-8 flex justify-center items-center p-1 rounded-full font-bold text-white bg-green-400">{s[0]}</div>
            <p className="flex justify-center items-center ml-2 font-semibold text-green-300 text-sm">{s}</p>
            <p className="text-xs font-semibold flex items-center pl-2 text-slate-300 ">{date}</p>
        </div>
        <div className="ml-8">
            <p className="font-bold text-3xl p-2">{title}</p>
        </div>
        <div className="ml-8">
            <p className="p-2 font-semibold text-xl text-slate-400">{content}......</p>
        </div>
        </Link>
    </div>
}