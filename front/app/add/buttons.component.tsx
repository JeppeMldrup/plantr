"use client";

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';

export const AddEntryButton = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedVeg, setSelectedVeg] = useState("Select vegetable");
    const [dropDown, setDropDown] = useState(false);
    const [amount, setAmount] = useState(0);
    const [weight, setWeight] = useState(0);

    const router = useRouter();

    const plants = props.plantList;
    const plantList = plants.map((veg) => {
        return <button class="block" onClick={() => {
            setSelectedVeg(veg.name);
            setDropDown(false);
        }}>{veg.name}</button>
    });

    console.log(plants);

    const clickHandler = () => {
        let veg_id = plants.filter((plant) => plant.name == selectedVeg)[0].veg_id;
        let params = `date=${startDate.toISOString().slice(0, 10)}&veg=${veg_id}&weight=${weight}&amount=${amount}`;
        console.log(params);
        let thing = fetch('/api/add?'+params, {method: "POST"});
        thing.then((res) => {
            if (res.ok){
                router.push('/home');
            }
        });
    }

    return (
        <>
        <div>
        <DatePicker selected={startDate}
                    onChange={(date) => setStartDate(date)
                    }/>

        <div>
        <button onClick={() => setDropDown(!dropDown)}>{selectedVeg}</button>
        {dropDown ? plantList : null}
        </div>

        <p>Weight of harvest (g):</p>
        <input type="number" value={weight} onChange={(event) => setWeight(event.target.value)} />
        <p>Number of fruit/veggies harvested:</p>
        <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />

        <button class="block" onClick={() => clickHandler()}>Add</button>
        </div>
        </>
    );
}
