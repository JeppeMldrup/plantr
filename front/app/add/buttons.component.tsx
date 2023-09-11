"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const AddEntryButton = (props: any) => {
    const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split("T")[0]);
    const [selectedVeg, setSelectedVeg] = useState("Select vegetable");
    const [dropDown, setDropDown] = useState(false);
    const [amount, setAmount] = useState(0);
    const [weight, setWeight] = useState(0);

    const router = useRouter();

    const plants = props.plantList;
    const plantList = plants.map((veg: any) => {
        return <button key={veg.veg_id} className="block bg-gray-300 hover:bg-gray-400 rounded w-full h-8" onClick={() => {
            setSelectedVeg(veg.name);
            setDropDown(false);
        }}>{veg.name}</button>
    });

    console.log(plants);

    const clickHandler = () => {
        if(amount == null)
            setAmount(0);
        if(weight == null)
            setWeight(0);
        let veg_id = plants.filter((plant: any) => plant.name == selectedVeg)[0].veg_id;
        let params = `date=${harvestDate}&veg=${veg_id}&weight=${weight}&amount=${amount}`;
        console.log(params);
        let thing = fetch('/api/add?'+params, {method: "POST"});
        thing.then((res) => {
            if (res.ok){
                router.replace('/home');
            }
        });
    }

    return (
        <>
        <div className=' flex flex-wrap justify-center items-center w-full md:w-3/5 self-center'>
            <p className=' w-full text-center mx-8 mt-4 text-2xl'>Record a new harvest:</p>
            <p className=' w-full text-center mx-8 mt-4'>Input date of harvest:</p>
        <input className=' w-full block text-grey-400 border-gray-300 border-2 bg-white rounded mx-8 mt-4'
            type='date' value={harvestDate} onChange={(event) => setHarvestDate(event.target.value)}></input>
        <div className=' w-full h-0'></div>
        <div className=' w-1/2 mt-8 rounded bg-gray-300'
            onClick={() => setDropDown(!dropDown)}><span className=' flex justify-center items-center px-4 h-12 rounded hover:bg-gray-400'><span className=' w-full text-left'>{selectedVeg}</span>{dropDown ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
           : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          }</span>
        {dropDown ? plantList : null}
        </div>

        <p className=' w-full text-center mx-8 mt-8'>Weight of harvest (g):</p>
        <input className=' w-full block text-grey-400 border-gray-300 border-2 bg-white rounded mx-8 mt-4'
            type="number" value={weight == 0 ? undefined : weight} onChange={(event) => setWeight(parseInt(event.target.value))} />
        <p className=' w-full text-center mx-8 mt-8'>Number of fruit/veggies harvested:</p>
        <input className=' w-full block text-grey-400 border-gray-300 border-2 bg-white rounded mx-8 mt-4'
            type="number" value={amount == 0 ? undefined : amount} onChange={(event) => setAmount(parseInt(event.target.value))} />

        <button className="w-1/2 h-12 block rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500 mt-4" onClick={() => clickHandler()}>Add</button>
        </div>
        </>
    );
}
