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
    const [isCopied, setIsCopied] = useState(false);

    const handleGenerateInvite = async () => {
        const res = await fetch('/api/joingarden');
        const code = await res.json();
        setIsGenerated(true);
        console.log(code.code);
        setInviteCode(code.code);
    }

    return (
        <>
        {isGenerated ? (
            <div className=' mx-3 h-auto w-1/2 flex'>
                <p className=' my-3 self-center p-2 w-4/5 rounded-l border-y-2 border-l-2 border-gray-400 pl-4'>{inviteCode}</p>
                <div className=' my-3 self-center p-2 w-1/5 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-r border-y-2 border-r-2 border-gray-700'
                    onClick={() => {navigator.clipboard.writeText(inviteCode); setIsCopied(true)}}>
                        {isCopied ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-auto">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>
 : 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                      </svg>
                      }
                    </div>
            </div>
        ) : <button className=' m-3 p-2 bg-gray-200 rounded hover:bg-gray-300 w-1/2 active:bg-gray-400 hover:cursor-pointer'
        onClick={() => handleGenerateInvite()}>Invite to garden</button>}
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
        <div className=' flex flex-wrap w-full justify-center items-center'>
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
