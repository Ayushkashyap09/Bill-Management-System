import React, { useState } from "react";
import { NavLink ,useNavigate } from "react-router-dom";
import {createAdmin} from '../Redux/adminSlice.js'
import {useDispatch} from 'react-redux'
function Signup() {
  const [admin, setAdmin] = useState({ name: "", email: "", password: "" });
  const [nameError, setNameError] = useState({ nameError: "" });
  const [emailError, setEmailError] = useState({ emailError: "" });
  const [passwaordError, setPasswaordError] = useState({ passwordError: "" });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target;

    setAdmin({ ...admin, [name]: value });
  }
  function nameValidation() {
    let isError = false
    const nameregex = /^[a-zA-Z ]{3,30}$/gm;
    // name validation
    if (nameregex.test(admin.name)) {
        setNameError({ nameError: "" });
        isError =false 
        return false
    } else {
      if (admin.name === "") {
        isError = true
        setNameError({ nameError: "Please enter email." });
      } else {
        isError = true
        setNameError({
          nameError: "Sorry, name must be alphabetical character.",
        });
      }
    }
    if (admin.name.length) {
      if (admin.name.length < 3 || admin.name.length > 30) {
        isError = true
        setNameError({
          nameError: "Sorry, name must be between 3 and 30 characters long",
        });
      }
    }
    return isError
  }
  function emailValidation() {
    let emailError = false 
    const email = /^[a-z0-9@]{3,}@[a-z]{3,}[.]{1}[a-z.]{3,}$/gm;
    if (email.test(admin.email)) {
      setEmailError({ emailError: "" });
      emailError = false 
      return false
    } else {
      if (admin.email === "") {
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
    if (password.test(admin.password)) {
        setPasswaordError({ passwordError: "" });
        passwordError = false
        return false
    } else {
        passwordError = true
        setPasswaordError({
        passwordError:
          "Sorry, password must be between 6 and 10 characters long at least include one special character and one numbric.",
      });
      if (admin.password === "") {
        passwordError = true
        setPasswaordError({     
          passwordError: "Please enter password.",
        });
      }
    }
    return passwordError
}
//   function validation() {

//     // name validation
//     // if (nameregex.test(admin.name)) {
//     //   setError({ ...error, nameError: "" });
//     // } else {
//     //   if (admin.name === "") {
//     //     setError({ ...error, nameError: "Please enter email." });
//     //   } else {
//     //     setError({
//     //       ...error,
//     //       nameError: "Sorry, name must be alphabetical character.",
//     //     });
//     //   }
//     // }
//     // if (admin.name.length) {
//     //   if (admin.name.length < 3 || admin.name.length > 30) {
//     //     setError({
//     //       ...error,
//     //       nameError: "Sorry, name must be between 3 and 30 characters long",
//     //     });
//     //   }
//     // }

//     //  email validation
//     // if (email.test(admin.email)) {
//     //   setError({ ...error, emailError: "" });
//     // } else {
//     //   if (admin.email === "") {
//     //     setError({ ...error, emailError: "Please enter email." });
//     //   } else {
//     //     setError({ ...error, emailError: "Sorry, invalid email." });
//     //   }
//     // }
//     //password validation
//     // if (password.test(admin.password)) {
//     //   setError({ ...error, passwordError: "" });
//     // } else {
//     //   setError({
//     //     ...error,
//     //     passwordError:
//     //       "Sorry, password must be between 6 and 10 characters long at least include one alphabetical character and one numbric.",
//     //   });
//     //   if (admin.password === "") {
//     //     setError({ ...error, passwordError: "Please enter password." });
//     //   }
//     // }

//     // if (admin.password.length) {
//     //   if (admin.password.length < 3 || admin.password.length > 30) {
//     //     console.log("bye");
//     //     setError({
//     //       ...error,
//     //       passwordError:
//     //         "Sorry, password must be between 6 and 10 characters long",
//     //     });
//     //   }
//     // }
//   }
  function sumbit(e) {
    console.log('hello')
    e.preventDefault();
    if(nameValidation()===false){
      if(emailValidation()===false){
        if(passwordValidation()===false){
          dispatch(createAdmin(admin))
          navigate(`/signin/${admin.name}`)
        }else{
          passwordValidation()
        }
      }else{
        emailValidation()
      }
    }else{
      console.log('form is not good')
      let a = nameValidation()  
      let b = emailValidation()  
      let c = passwordValidation()
      console.log(a,b,c)
      nameValidation()
  }
    // let result = nameValidation() === emailValidation() ? false : true
    // console.log(result)
    // if(result === passwordValidation()){
    //     console.log('form is good')
    //     dispatch(createAdmin(admin))
    //     navigate(`/signin/${admin.name}`)
    // }else{
    //     console.log('form is not good')
    //     let a = nameValidation()  
    //     let b = emailValidation()  
    //     let c = passwordValidation()
    //     console.log(a,b,c)
    // }
  }
  console.log(admin);
  console.log(nameError);
  console.log(emailError);
  console.log(passwaordError);

  return (
    <>
      <div className="w-full h-screen justify-center bg-slate-100 flex">
        <form
          onSubmit={sumbit}
          className="shadow-2xl h-fit bg-white border-0 mt-20 rounded-lg  sm:w-[60%] md:w-[40%] lg:w-[30%] w-[60%]"
        >
          <h1 className="font-semibold text-4xl text-slate-700 mx-10 my-3">
            Sign up
          </h1>
          <div className="m-10 grid grid-flow-row gap-2 ">
            <div>
              <div>
                <label className="text-xs sm:text-sm" htmlFor="name">
                  Your name
                </label>
              </div>
              <div>
                <input
                  autoComplete="off"
                  className=" block w-full rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900
                        ring-1 ring-gray-300
                        focus:outline-gray-500 
                        shadow-md text-xs sm:text-sm sm:leading-6 ring-inset"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  type="text"
                  value={admin.name}
                  onChange={handleChange}
                />
              </div>
              <span className="text-red-500 text-xs sm:text-sm">
                {nameError.nameError}
              </span>
            </div>
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
                  name="email"
                  type="email"
                  value={admin.email}
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
                  name="password"
                  type="password"
                  value={admin.password}
                  onChange={handleChange}
                />
              </div>
              <span className="text-red-500 text-xs sm:text-sm">
                {passwaordError.passwordError}
              </span>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="shadow-lg shadow-gray-300/100 rounded-xl bg-gray-800 text-white sm:py-2 sm:px-5 py-3 px-7 font-semibold text-xs sm:text-sm focus:ring-inset focus:ring-2 md:mt-5 focus:ring-gray-800 focus:bg-white focus:text-gray-800"
              >
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
                <NavLink to="/signin" className="text-blue-500 hover:underline">
                  {" "}
                  Sign in
                </NavLink>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
