import { useState } from "react"
import { Buttoncomponent } from "../component/Route/Buttoncomponent"
import { Heading } from "../component/Route/Heading"
import { LableInput } from "../component/Route/LableInput"
import { Quote } from "../component/Route/Quate"
import { signininput } from "@rahulcoder001/mideam-common"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"






export const Signin = () =>{
    const [form , setForm] = useState<signininput>({
        email:"",
        password:""
    })
    const navigate = useNavigate();
    const onpress = async()=>{
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,form);
            const jwt = response.data.jwt;
            const author = response.data.author;
            console.log(author);
            localStorage.setItem("token",jwt);
            localStorage.setItem("author",author)
            navigate('/');
        } catch (error) {
             alert("Unable to Login");
        }
    }
    return <div className="w-full h-screen flex">
        <div className="w-1/2 invisible md:visible">
           <Quote/>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
           <div>
          <Heading title={"Login to an account"} subtitle={"Dont have an account"} link={"Sign up"} path={'/signup'}/>
          <LableInput lable={"Email"} placeholder={"example@domail.com"} onchange={(e)=>{setForm({...form, email:e.target.value})}}/>
          <LableInput lable={"Password"} placeholder={"Your Password"} onchange={(e)=>{setForm({...form, password:e.target.value})}}/>
          <Buttoncomponent title={"Login"} onpress={onpress}/>
           </div>
        </div>
    </div>
}