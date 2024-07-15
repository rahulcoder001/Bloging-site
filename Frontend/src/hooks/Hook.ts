import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBolgs = () =>{
     const [loading , setLoading] = useState(true);
     const [blogs , setBlogs] = useState<Blog[]>([]);
     const navigate = useNavigate();
     const token = localStorage.getItem("token")||"";
     
     
         useEffect(()=>{
            if(!token){
                navigate("/signin");
            }
            else{

                axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                }).then((response)=>{
                    setBlogs(response.data.blogs);
                    setLoading(false);
                })
            }
         },[])

    return {
        blogs,
        loading
    }
}

interface myid{
    id: string;
}

export const useBlog = ({id}:myid)=>{
     const [loading, setLoading] = useState(true);
     const [bloging, setBloging] = useState<Blog>();

         useEffect(()=>{
                axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                }).then((response)=>{
                    setBloging(response.data.blog);
                    setLoading(false);
                })
         },[])
         return {
             bloging,
             loading
         }

}
