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
    const router = useRouter();

    return (
        <>
        <div className="flex flex-col items-center my-10 w-full">
            <p className=' text-slate-400 mb-5'>Join an existing garden with an invite code:</p>
            <div className=' flex w-3/4 max-w-[80rem] self-center'>
                <input className=' text-slate-400 bg-white border-y-2 border-l-2 border-gray-200 w-3/4 rounded-l' 
                        type="text" placeholder=' Input invite code to join' value={gardenCode} onChange={(event) => setGardenCode(event.target.value)} />
                <button className=' transition-all bg-green-500 hover:bg-green-600 focus:bg-green-700 w-1/4 rounded-r border-y-2 border-r-2 border-green-600'
                        onClick={() => handleJoinGarden(gardenCode, router)} >Join garden</button>
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
        <button className=' m-3 p-2 bg-gray-200 rounded w-1/2 hover:bg-gray-300 active:bg-gray-400 hover:cursor-pointer'
        onClick={() => handleGenerateInvite()}>Invite to garden</button>
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
        <div className=' m-3 p-2 flex-grow bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 h-40 w-[20rem] hover:cursor-pointer'
         onClick={() => router.push('/addveg')}>
            <span>Add plant to garden</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-full m-auto">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
        </div>
        </>
    );
}

export const VegList = (props: any) => {
    const plants = props.plantList;
    console.log(plants);
    const router = useRouter();
    return (<>
        <div className=' flex flex-wrap w-full justify-center items-center block'>
        {plants ? plants.map((veg: any) => {return (
            <div key={veg.veg_id} onClick={() => router.push('/stats?veg='+veg.veg_id)}
            className=' m-3 p-2 flex-grow bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 h-40 w-[20rem] hover:cursor-pointer'>
                <span className=' block text-xl w-full text-ellipsis overflow-hidden whitespace-nowrap'>{veg.name}</span>
                <p>Click to see stats</p>
            </div>)
        }) : null}
        <AddVegButton></AddVegButton>
        </div>
        <div className=' flex justify-around w-2/3 m-auto max-w-[25rem] my-4'>
                <span className=' bg-slate-400 h-px w-full self-center mx-4'></span>
                <span className=" text-xl text-slate-400">OR</span>
                <span className=' bg-slate-400 h-px w-full self-center mx-4'></span>
            </div>
        <div className=' flex justify-evenly' >
            <button className=' m-3 p-2 bg-gray-200 rounded hover:bg-gray-300 w-1/2 active:bg-gray-400 hover:cursor-pointer'
         onClick={() => router.push('/stats')}>See stats for entire garden</button>
            <InviteButton></InviteButton>
        </div>
        </>
    );
}

const handleGardenCreation = async (gardenName: String, router: AppRouterInstance) => {
    await fetch('/api/garden?name=' + gardenName, {
            method: "POST"
        });
    router.refresh();
}

const handleJoinGarden = async (gardenCode: String, router: AppRouterInstance) => {
    console.log(gardenCode);
    await fetch('/api/joingarden?code=' + gardenCode, {
        method: "POST"
    });
    router.refresh();
}
