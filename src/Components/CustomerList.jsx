import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { deleteClient } from "../Redux/billSlice";
import {Link} from 'react-router-dom'
function CustomerList() {
    const dispatch = useDispatch()
    const state = useSelector(state=>state.billslice.data)
    const [array,setArray] = useState(state)
  console.log(state)
  useEffect(()=>{
      setArray(state)
  },[state])
  function searchText(e) {
    console.log('hii')
    if(!e){
      setArray(state)
    }else{
      const regex = new RegExp(e,"gi");
      let result = state.filter((data) => regex.exec(data.account_name));
      setArray(result);
    }
  }
  function debouncing() {
    let time;
    return (e) => {
      console.log('hello')
      clearTimeout(time);
      time = setTimeout(() => {
        searchText(e.target.value);
      }, 500);
    };
  }
  function deleteFromList(index){
    dispatch(deleteClient(index))
  }

 
  return (
  <>
  <div className='flex justify-center pt-10 ' >
    <div className='border-4 border-gray-500 w-[95%] md:w-[75%] lg:w-[65%] p-5  rounded-lg min-h-[600px]'>
     <h1 className=' text-2xl font-serif'>Client List</h1>
     <div>
     <input type='text' onChange={debouncing()} placeholder='Search by name' className='bg-slate-100 text-slate-500 inline w-full  my-3 focus:ring-4 ring-gray-500  pl-2 text-lg ring-2 focus:outline-gray-500 rounded-md'/>
    <ul className='grid gap-4'>
        {
            array.map((data,index)=>(
                <li key={index} className='w-full grid grid-cols-12  rounded-md'>
                <div className='col-span-10 grid grid-cols-6 lg:col-span-10 '>
                <div className='hidden sm:block text-[14px] xl:text-lg sm:text- md:text-[14px] lg:text-[15px] text-center font-semibold font-sans my-auto'>#{data.contact_number}</div>
                <div className='text-[12px] hidden sm:block font-mono xl:text-lg sm:text-[10px] md:text-[10px] lg:text-[14px] text-center text-slate-500 my-auto'>{data.purchase_date}</div>
                <div className='text-[12px] font-serif col-span-2 xl:text-lg sm:text- md:text-[14px] lg:text-[14px] text-center text-slate-500 my-auto'>{data.account_name}</div>
                {/* <div className='text-[12px] xl:text-lg sm:text- md:text-[14px] lg:text-[14px] text-center my-auto'></div> */}
                <div className='text-[14px] xl:text-lg sm:text- md:text-[16px] lg:text-[18px] font-sans font-semibold text-center my-auto  '>₹{data.total}</div>
                {
                    data.status==='Pending'?
                    <div className='text-[12px] xl:text-lg sm:text- md:text-[14px] lg:text-[15px] rounded-md text-orange-700 font-sans backdrop-blur bg-orange-200/70 border-2 border-orange-600 text-center font-medium my-auto'>{data.status}</div>
                    :
                    <div className='text-[12px] xl:text-lg sm:text- md:text-[14px] lg:text-[15px] text-center text-green-700 font-sans to-transparent rounded-md border-2 border-green-600 bg-green-200/70 backdrop-blur  my-auto'>{data.status}</div>
                }
                </div>
                <div className='col-span-2 place-items-center grid grid-cols-2 sm:gap-4 gap-7    lg:col-span-2 '>
                    <Link to={`/home/NewUpdate/${index}`}>
                <FaEdit className='size-5 cursor-pointer text-gray-800' />   
                    </Link>
                <AiFillDelete onClick={()=>deleteFromList(index)} className='size-5 cursor-pointer text-gray-800' />
                </div>
                </li>
            ))
        } 
    </ul>
     </div>
    </div>
  </div>
  </>
  )
}

export default CustomerList
