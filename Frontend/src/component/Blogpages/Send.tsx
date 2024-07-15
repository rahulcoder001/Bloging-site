import { Link } from "react-router-dom";

type NavbarProps = {
    name: string,
    onpress:()=>void
};

export const Send = ({ name ,onpress}: NavbarProps) => {
    const s = name[0].toUpperCase();
    return (
        <div className="border-b-2 border-slate-300 flex justify-between h-16 items-center">
           <Link to={"/"}> <h1 className="font-extrabold text-4xl text-green-500 ml-2">UBLOG</h1></Link>
            <div className="flex mr-2">
            <button className=" m-2 p-2 rounded-lg font-bold text-white bg-green-500 hover:bg-green-600" onClick={onpress}>Publised</button>
            <div className="w-14 h-14 mr-2 flex justify-center items-center rounded-full text-3xl font-extrabold text-white bg-gray-500">
                {s}
            </div>
            
            </div>
        </div>
    );
};
