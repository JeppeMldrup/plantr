"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const AddVegButton = () => {
    const [vegName, setVegName] = useState("");

    const router = useRouter();

    const clickHandler = () => {
        let thing = fetch('/api/addveg?name='+vegName, {method: "POST"});
        thing.then((res) => {
            console.log(res);
            if (res.ok){
                router.push('/list');
            }
        });
    }

    return (
        <>
        <div>
        <input type="text" value={vegName} onChange={(event) => setVegName(event.target.value)} />
        <button onClick={() => clickHandler()}>Add plant</button>
        </div>
        </>
    );
}
