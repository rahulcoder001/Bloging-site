interface blogcard{
    title: string,
    content:string,
    date:string,
}

export const Bloging = ({title,content,date}:blogcard)=>{
    return <div>
        <h1 className="text-4xl font-bold p-2 px-10">{title}</h1>
        <p className="px-10 text-sm font-semibold text-slate-300">Publised on {date}</p>
        <p className="p-2 px-10 text-xl">{content}</p>
    </div>
}