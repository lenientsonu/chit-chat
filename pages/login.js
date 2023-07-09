import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { toast } from "react-toastify";
import { auth } from "@/firebase/firebase";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
} from "firebase/auth";

import { useAuth } from "@/context/authContext";
import ToastMessage from "@/components/ToastMessage";
import Loader from "@/components/Loader";

const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();

const Login = () => {
    const router = useRouter();
    const { currentUser, isLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!isLoading && currentUser) {
            // it means user logged in
            router.push("/");
        }
    }, [currentUser, isLoading]);

    const submitHandler = async (event) => {
        event.preventDefault();

        // console.log(email, password);

        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log(user);
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

    const resetPassword = async () => {
        try {
            toast.promise(
                async () => {
                    // reset logic
                    await sendPasswordResetEmail(auth, email);
                },
                {
                    pending: "Generating reset link",
                    success: "Reset link sent to your registered email id.",
                    error: "You may have entered wrong email id!",
                },
                { autoClose: 5000 }
            );
        } catch (error) {
            alert(error);
        }
    };

    return isLoading || (!isLoading && currentUser) ? (
        <Loader />
    ) : (
        <div className='h-[100vh] flex justify-center items-center bg-c1'>
            <ToastMessage />
            <div className='flex items-center flex-col'>
                <div className='text-center'>
                    <div className='text-4xl font-bold'>
                        Login to your Account
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
                    <div className='text-right w-full text-c3'>
                        <span
                            className='cursor-pointer'
                            onClick={resetPassword}
                        >
                            Forgot Password?
                        </span>
                    </div>
                    <button className='mt-4 w-full h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                        Login to Your Account
                    </button>
                </form>
                <div className='flex justify-center gap-1 text-c3 mt-5'>
                    <span>Not a member yet?</span>
                    <Link
                        href='/register'
                        className='font-semibold text-white underline underline-offset-2 cursor-pointer'
                    >
                        Register Now!
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
