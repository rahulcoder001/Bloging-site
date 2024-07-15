import { useNavigate } from "react-router-dom";
import { Send } from "../component/Blogpages/Send";
import { useState } from "react";
import { bloginput } from "@rahulcoder001/mideam-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Post = () => {
    const name = localStorage.getItem("author") || "";
    const navigate = useNavigate();
    const onpress = async () => {
        try {
            await axios.post(`${BACKEND_URL}/api/v1/blog`, form, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            alert("Post published successfully");
            navigate("/");
        } catch (error) {
            console.error('Error publishing post:', error);
            alert('Failed to publish post');
        }
    };
    const [form, setForm] = useState<bloginput>({
        title: "",
        content: ""
    });
    return (
        <div>
            <Send name={name} onpress={onpress} />
            <div className="flex flex-col m-10">
                <textarea
                    onChange={(e) => { setForm({ ...form, title: e.target.value }) }}
                    className="font-extrabold outline-none text-slate-400 text-5xl p-2 max-w-full resize-none"
                    placeholder="|Title"
                    rows={1}
                    value={form.title}
                />
                <textarea
                    onChange={(e) => { setForm({ ...form, content: e.target.value }) }}
                    className="text-slate-400 outline-none mx-10 m-2 text-3xl max-w-full resize-none"
                    placeholder="Tell your story"
                    rows={10}
                    value={form.content}
                />
            </div>
        </div>
    );
};
