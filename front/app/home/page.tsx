import { redirectToLogin } from '@/lib/auth';

export default async function Home(){
    await redirectToLogin();
    return (
        <>
        <main class="w-screen h-screen flex justify-center items-center">
        <h1>NICE</h1>
        </main>
        </>
    )
}
