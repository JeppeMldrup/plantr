"use client";

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const AddEntryButton = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [dropDown, setDropDown] = useState(false);

    const veggies = [
            {"name": "cucumber"},
            {"name": "tomato"},
            {"name": "Courgette"}
        ]

    const clickHandler = () => {
        let thing = fetch('/api/add?thing=nice', {method: "POST"});
        thing.then(t => console.log(t));
    }

    return (
        <>
        <div>
        <DatePicker selected={startDate}
                    onChange={(date) => setStartDate(date)
                    }/>

        <div>
        <button onClick={() => setDropDown(!dropDown)}>Select vegetable</button>
        {dropDown ? (
           <div>
           {veggies.map((veg) => <p>{veg.name}</p>)}
           </div>
        ) : null}
        </div>

        <button onClick={() => clickHandler()}>Add</button>
        </div>
        </>
    );
}
