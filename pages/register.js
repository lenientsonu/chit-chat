import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";

import { auth, db } from "@/firebase/firebase";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { useAuth } from "@/context/authContext";
import ToastMessage from "@/components/ToastMessage";
import { profileColors } from "@/utils/constants";

const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();

const Register = () => {
    const router = useRouter();
    const { currentUser, isLoading } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const colorIndex = Math.floor(Math.random() * profileColors.length);

    useEffect(() => {
        if (!isLoading && currentUser) {
            // it means user logged in
            router.push("/");
        }
    }, [currentUser, isLoading]);

    const submitHandler = async (event) => {
        event.preventDefault();

        console.log(name, email, password);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(user, {
                displayName: name,
            });

            // creating user collection in firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name,
                email,
                password,
                color: profileColors[colorIndex],
            });

            // creating user specific chat collection in firestore
            await setDoc(doc(db, "userChats", user.uid), {});

            console.log(user);
            router.push("/");
        } catch (error) {
            alert(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, gProvider);
        } catch (error) {
            alert(error);
        }
    };

    const signInWithFacebook = async () => {
        try {
            await signInWithPopup(auth, fProvider);
        } catch (error) {
            alert(error);
        }
    };

    return isLoading || (!isLoading && currentUser) ? (
        "Loader..."
    ) : (
        <div className='h-[100vh] flex justify-center items-center bg-c1'>
            <div className='flex items-center flex-col'>
                <div className='text-center'>
                    <div className='text-4xl font-bold'>
                        Create your new Account
                    </div>
                    <div className='mt-3 text-c3'>
                        Connect and chat with anyone, anywhere
                    </div>
                </div>

                <div className='flex items-center gap-2 w-full mt-10 mb-5 '>
                    <div
                        className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]'
                        onClick={signInWithGoogle}
                    >
                        <div className='flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md'>
                            <IoLogoGoogle size={24} />
                            <span>Login with Google</span>
                        </div>
                    </div>

                    <div
                        className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]'
                        onClick={signInWithFacebook}
                    >
                        <div className='flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md'>
                            <IoLogoFacebook size={24} />
                            <span>Login with Facebook </span>
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-1'>
                    <span className='w-5 h-[1px] bg-c3'></span>
                    <span className='text-c3 font-semibold'>OR</span>
                    <span className='w-5 h-[1px] bg-c3'></span>
                </div>

                <form
                    onSubmit={submitHandler}
                    className='flex flex-col items-center gap-3 w-[500px] mt-5'
                >
                    <input
                        type='text'
                        placeholder='Enter your Name'
                        className='w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3'
                        autoComplete='off'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='email'
                        placeholder='Enter your Email'
                        className='w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3'
                        autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Enter your Password'
                        className='w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3'
                        autoComplete='off'
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className='mt-4 w-full h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                        Register Your Account
                    </button>
                </form>
                <div className='flex justify-center gap-1 text-c3 mt-5'>
                    <span>Already have an account?</span>
                    <Link
                        href='/login'
                        className='font-semibold text-white underline underline-offset-2 cursor-pointer'
                    >
                        Login Now!
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
