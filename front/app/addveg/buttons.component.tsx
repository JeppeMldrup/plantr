"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const AddVegButton = () => {
  const [vegName, setVegName] = useState("");
  const [vegDate, setVegDate] = useState(new Date().toISOString().split("T")[0]);

  const router = useRouter();

  const handleClick = () => {
    fetch('/api/addveg?name='+vegName+'&date='+vegDate, {method: "POST"})
      .then((res) => {
        if (res.ok){
          router.back();
          router.refresh();
        }
      });
  }

  return (
    <>
    <div className=' flex flex-wrap justify-center items-center w-full md:w-3/5 self-center'>
    <p className=' text-gray-700'>
      Input a name for the plant:
    </p>
    <input className=' w-full block text-grey-400 border-gray-300 border-2 bg-white rounded mx-8 mt-4'
      type="text" 
      value={vegName} 
      onChange={
        (event) => setVegName(event.target.value)
      }/>

    <p className=' text-gray-700 mt-8'>
      Input the planting date:
    </p>
    <input className=' w-full block text-grey-400 border-gray-300 border-2 bg-white rounded mx-8 mt-4'
      type='date' 
      value={vegDate}
      onChange={
        (event) => {
        console.log(event);
        setVegDate(event.target.value);
    }}></input>
    <button className=' w-1/2 h-12 block rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500 mt-4'
      onClick={
        () => handleClick()
      }>Add plant</button>
    </div>
    </>
  );
}
