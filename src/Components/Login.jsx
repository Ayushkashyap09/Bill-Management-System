import React, { useState } from "react";
import { NavLink ,useParams, useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
function Signin() {
  const [signin, setSignin] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState({ emailError: "" });
  const [passwordError, setPasswaordError] = useState({ passwordError: "" });
  const state = useSelector(state=>state.adminSlice.data)
  const navigate = useNavigate()
  const {name} = useParams()
  const user = state.find(data=>data.name===name)

  function handleChange(e) {
    const { name, value } = e.target;
    setSignin({ ...signin, [name]: value });
  }
//   console.log(user)


  function emailValidation() {
    let emailError = false 
    const email = /^[a-z0-9@]{3,}@[a-z]{3,}[.]{1}[a-z.]{3,}$/gm;
    if (email.test(signin.email)) {
      setEmailError({ emailError: "" });
      emailError = false 
      return false
    } else {
      if (signin.email === "") {
        emailError = true 
        setEmailError({ emailError: "Please enter email." });
      } else {
        emailError = true 
        setEmailError({ emailError: "Sorry, invalid email." });
      }
    }
    return emailError
  }




  function passwordValidation() {
    let passwordError = false
    const password =
      /^(?=.*[0-9])(?=.*[a-zA-z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{6,10}$/gm;
    //password validation
    if (password.test(signin.password)) {
        setPasswaordError({ passwordError: "" });
        passwordError = false
        return false
    } else {
        passwordError = true
        setPasswaordError({
        passwordError:
          "Incorrect passwoard",
      });
      if (signin.password === "") {
        passwordError = true
        setPasswaordError({     
          passwordError: "Please enter password.",
        });
      }
    }
    return passwordError
}







  function sumbit(e) {
    console.log('hello')
    e.preventDefault();
    let result = passwordValidation() === emailValidation() ? true : false
    console.log(result)
    if(result){
        console.log('inside')
        console.log(user.email)
        console.log(signin.email)
        console.log(user.password)
        console.log(signin.password)
        if(user.email === signin.email && user.password === signin.password){
            console.log('if')
            navigate('/home/customerlist')
        }else{
            console.log('else')
            setEmailError({ emailError: "Invalid email" });
            setPasswaordError({ passwordError: "Incorrect password" });
        }
    }
 
}

  return (
    <>
      <div className="w-full h-screen justify-center bg-slate-100 flex">
        <form onSubmit={sumbit} className="shadow-2xl h-fit bg-white border-0 mt-10 rounded-lg  sm:w-[60%] md:w-[40%] lg:w-[30%] w-[60%]">
          <h1 className="font-semibold text-4xl text-slate-700 mx-10 my-3">
            Sign in
          </h1>
          <div className="m-10 grid grid-flow-row gap-2 ">
            <div>
              <div>
                <label className="text-xs sm:text-sm" htmlFor="info">
                  Email
                </label>
              </div>
              <div>
                <input
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900  focus:outline-gray-500 
                      shadow-md ring-1 ring-gray-300 text-xs sm:text-sm ring-inset sm:leading-6"
                  id="info"
                  name='email'
                  type="text"
                  value={signin.email}
                  onChange={handleChange}
                />
              </div>
              <span className="text-red-500 text-xs sm:text-sm">
                {emailError.emailError}
              </span>
            </div>
            <div>
              <div>
                <label className="text-xs sm:text-sm" htmlFor="password">
                  Password
                </label>
              </div>
              <div>
                <input
                  autoComplete="off"
                  placeholder="At least password 6 character"
                  className=" block w-full rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300  focus:outline-gray-500 
                      shadow-md text-xs sm:text-sm sm:leading-6"
                  id="password"
                  onChange={handleChange}
                  value={signin.password}
                  name="password"
                  type="password"
                />
              </div>
              <span className="text-red-500 text-xs sm:text-sm">
                {passwordError.passwordError}
              </span>
            </div>

            <div className="flex justify-center">
            
                <button className="m-5 shadow-lg shadow-gray-300/100 rounded-xl bg-gray-800 text-white sm:py-2 sm:px-5 py-3 px-7 font-semibold text-xs sm:text-sm focus:ring-inset focus:ring-2 focus:ring-gray-800 focus:bg-white focus:text-gray-800">
                  Continue
                </button>
             
            </div>
            <p className=" text-xs mt-2">
              By continuing, you agree to{" "}
              <span>
                <NavLink className="text-blue-500 hover:underline">
                  {" "}
                  Conditions of Use
                </NavLink>
              </span>{" "}
              and{" "}
              <span>
                <NavLink className="text-blue-500 hover:underline">
                  Privacy Notice.
                </NavLink>
              </span>
            </p>
            <p className=" text-xs mt-1">
              Already have an account?
              <span>
                {" "}
                <NavLink to="/" className="text-blue-500 hover:underline">
                  {" "}
                  Sign up
                </NavLink>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signin;
