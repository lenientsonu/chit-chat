import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@/context/authContext";
import Loader from "@/components/Loader";
import LeftNav from "@/components/LeftNav";

const Home = () => {
    const router = useRouter();
    const { signOut, currentUser, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !currentUser) {
            router.push("/login");
        }
    }, [currentUser, isLoading]);

    return !currentUser ? (
        <Loader />
    ) : (
        // <div className='bg-black'>
        //     <button onClick={signOut}>Sign Out</button>
        // </div>
        <div className='bg-c1 flex h-[100vh]'>
            <div className='flex w-full shrink-0'>
                <div>
                    <LeftNav />
                </div>

                <div className='flex bg-c2 grow'>
                    <div>Sidebar</div>
                    <div>Cahts</div>
                </div>
            </div>
        </div>
    );
};

export default Home;
