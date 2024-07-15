import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/Hook";
import { Skeleton } from "../component/Blogpages/Skeleton";
import { Navbar } from "../component/Blogpages/Navbar";
import { Bloging } from "../component/Blogpages/Bloging";

export const Blog = () => {
    const { id } = useParams();
    const { bloging, loading } = useBlog({
        id: id || ""
    });

    if (loading || !bloging) {
        return (
            <div>
                <Skeleton />
            </div>
        );
    }
    const s = bloging.author.name.toUpperCase();
    return (
        <div>
            <Navbar name={bloging.author.name} />
            <div className="flex m-2">
                <div className="w-3/4 ">
                    <Bloging
                        title={bloging.title}
                        content={bloging.content}
                        date={"July 15, 2024"}
                    />
                </div>
                <div className="w-1/4 max-w-xs">
                    <p className="text-sm p-2">Author</p>
                    <div className="flex p-2">
                        <div className="flex justify-center items-center w-6 h-6 rounded-full bg-green-300 font-bold text-white">{s[0]}</div>
                        <p className="font-semibold ml-2 text-slate-500">{s}</p>
                    </div>
                    <p className="p-2 text-xs font-bold text-slate-400">Master Of mirth, purveyor of puns, and the funniest person in the kingdom</p>
                </div>
            </div>
        </div>
    );
};
