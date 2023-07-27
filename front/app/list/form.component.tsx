"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

export const GardenCreationForm = () => {
    const [gardenName, setGardenName] = useState("");

    const router = useRouter();
    return (
        <>
        <div className="flex flex-col items-center my-10 w-full">
        <p className=' text-slate-400 mb-5'>Create a new garden:</p>
        <div className=' flex w-3/4 max-w-[80rem] self-center'>
            <input className=' text-slate-400 bg-white border-y-2 border-l-2 border-gray-200 w-3/4 rounded-l'
                    type="text" placeholder=' Input name for your new garden' value={gardenName} onChange={(event) => setGardenName(event.target.value)} />
            <button className=' transition-all bg-green-500 hover:bg-green-600 focus:bg-green-700 w-1/4 rounded-r border-y-2 border-r-2 border-green-600'
                    onClick={() => handleGardenCreation(gardenName, router)} >Create garden</button>       
        </div>
        </div>
        </>
    );
}

export const GardenInviteJoin = () => {
    const  [gardenCode, setGardenCode] = useState("");

    return (
        <>
        <div className="flex flex-col items-center my-10 w-full">
            <p className=' text-slate-400 mb-5'>Join an existing garden with an invite code:</p>
            <div className=' flex w-3/4 max-w-[80rem] self-center'>
                <input className=' text-slate-400 bg-white border-y-2 border-l-2 border-gray-200 w-3/4 rounded-l' 
                        type="text" placeholder=' Input invite code to join' value={gardenCode} onChange={(event) => setGardenCode(event.target.value)} />
                <button className=' transition-all bg-green-500 hover:bg-green-600 focus:bg-green-700 w-1/4 rounded-r border-y-2 border-r-2 border-green-600'
                        onClick={() => handleJoinGarden(gardenCode)} >Join garden</button>
            </div>
        </div>
        </>
    );
}

export const InviteButton = () => {
    const [isGenerated, setIsGenerated] = useState(false);
    const [inviteCode, setInviteCode] = useState("");

    const handleGenerateInvite = async () => {
        const res = await fetch('/api/joingarden');
        const code = await res.json();
        setIsGenerated(true);
        console.log(code.code);
        setInviteCode(code.code);
    }

    return (
        <>
        <button onClick={() => handleGenerateInvite()}>Invite to garden</button>
        {isGenerated ? (
            <div>
                <p>{inviteCode}</p>
            </div>
        ) : null}
        </>
    );
}

export const AddVegButton = () => {
    const router = useRouter();
    return (
        <>
        <button onClick={() => router.push('/addveg')}>Add plant to garden</button>
        </>
    );
}

export const VegList = (props: any) => {
    const plants = props.plantList;
    console.log(plants);
    const router = useRouter();
    if(!plants)
        return (<p>No plants</p>);
    return (<>{plants.map((veg: any) => {return (
            <div key={veg.veg_id} className='NTSETNES'>
                <span className=' mx-4'>{veg.name}</span>
                <button onClick={() => router.push('/stats?veg='+veg.veg_id)}>See stats</button>
            </div>)
        })}
        <button className=' block' onClick={() => router.push('/stats')}>See stats for entire garden</button>
        </>
    );
}

const handleGardenCreation = async (gardenName: String, router: AppRouterInstance) => {
    await fetch('/api/garden?name=' + gardenName, {
            method: "POST"
        });
    router.refresh();
}

const handleJoinGarden = (gardenCode: String) => {
    console.log(gardenCode);
    fetch('/api/joingarden?code=' + gardenCode, {
        method: "POST"
    });
}
