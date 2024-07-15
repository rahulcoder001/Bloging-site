import { Blogs } from "../component/Blogpages/Blogs";
import { Skeleton } from "../component/Blogpages/Skeleton";
import { useBolgs } from "../hooks/Hook";
import { Navbar } from "../component/Blogpages/Navbar";
import { useState } from "react";

export const Home = () => {
    const { blogs, loading } = useBolgs();
    const [my, setMy] = useState(true);

    const name = localStorage.getItem("author") || "";
    const myblog = blogs.filter((blog) => blog.author.name === name);

    if (loading) {
        return (
            <div className="border-2 h-screen w-full flex flex-col justify-center">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        );
    }

    return (
        <div>
            <Navbar name={name} />
            <div className="flex justify-center m-2">
                <div className="w-3/4">
                    <div>
                        <button onClick={() => setMy(true)} className={my ? "border-b-2 font-bold border-black p-2" : "font-semibold p-2"}>
                            All Blogs
                        </button>
                        <button onClick={() => setMy(false)} className={!my ? "ml-4 border-b-2 font-bold border-black p-2" : "ml-4 font-semibold p-2"}>
                            My Blogs
                        </button>
                    </div>
                    {my ? (
                        blogs.map((blog) => (
                            <Blogs
                                key={blog.id}
                                title={blog.title}
                                content={blog.content}
                                name={blog.author.name}
                                id={blog.id}
                                date={"July 15, 2024"}
                            />
                        ))
                    ) : (
                        myblog.map((blog) => (
                            <Blogs
                                key={blog.id}
                                title={blog.title}
                                content={blog.content}
                                name={blog.author.name}
                                id={blog.id}
                                date={"July 15, 2024"}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
