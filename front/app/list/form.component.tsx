"use client";

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const GardenCreationForm = () => {
    const [gardenName, setGardenName] = useState("");

    return (
        <>
        <div class="gardenForm">
        <p>Input name for your garden</p>
        <input type="text" value={gardenName} onChange={(event) => setGardenName(event.target.value)} />
        <button onClick={() => handleGardenCreation(gardenName)} >SUBMIT</button>
        </div>
        </>
    );
}

export const GardenInviteJoin = () => {
    const  [gardenCode, setGardenCode] = useState("");

    return (
        <>
        <div class="InvitationForm">
        <p>Input invite code to join existing garden</p>
        <input type="text" value={gardenCode} onChange={(event) => setGardenCode(event.target.value)} />
        <button onClick={() => handleJoinGarden(gardenCode)} >SUBMIT</button>
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

const handleGardenCreation = (gardenName) => {
    fetch('/api/garden?name=' + gardenName, {
            method: "POST"
        });
}

const handleJoinGarden = (gardenCode) => {
    console.log(gardenCode);
    fetch('/api/joingarden?code=' + gardenCode, {
        method: "POST"
    });
}
