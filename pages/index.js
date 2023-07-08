import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";

const Home = () => {
    const router = useRouter();
    const { signOut, currentUser, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !currentUser) {
            router.push("/login");
        }
    }, [currentUser, isLoading]);

    return (
        <div className='bg-black'>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
};

export default Home;
