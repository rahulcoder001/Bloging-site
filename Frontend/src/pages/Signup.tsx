import { useState } from "react"
import { Buttoncomponent } from "../component/Route/Buttoncomponent"
import { Heading } from "../component/Route/Heading"
import { LableInput } from "../component/Route/LableInput"
import { Quote } from "../component/Route/Quate"
import { signupinput } from "@rahulcoder001/mideam-common"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"







export const Signup = () =>{
    const navigate = useNavigate();
    const [form , setForm] = useState<signupinput>({
        name:"",
        email:"",
        password:""
    })
    const onpress = async()=>{
        try {
            const response =  await axios.post(`${BACKEND_URL}/api/v1/user/signup`,form);
            const jwt = response.data.jwt;
            const author = response.data.author;
            console.log(author);
            localStorage.setItem("author",author)
            localStorage.setItem("token",jwt);
            navigate('/');
        } catch (error) {
            alert("unable to signup")
        }
    }
    return <div className="w-full h-screen flex">
        <div className=" w-full md:w-1/2 flex justify-center items-center">
           <div>
          <Heading title={"Create an account"} subtitle={"Already have an account"} link={"Login"} path={'/signin'}/>
          <LableInput lable={"username"} placeholder={"Enter you name here"} onchange={(e)=>{setForm({...form, name:e.target.value})}}/>
          <LableInput lable={"Email"} placeholder={"example@domail.com"} onchange={(e)=>{setForm({...form, email:e.target.value})}}/>
          <LableInput lable={"Password"} placeholder={"Your Password"} onchange={(e)=>{setForm({...form, password:e.target.value})}}/>
          <Buttoncomponent title={"Sign Up"} onpress={onpress}/>
           </div>
        </div>
        <div className="w-1/2 invisible md:visible">
           <Quote/>
        </div>
    </div>
}