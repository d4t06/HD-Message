'use client'

import { auth } from "@/config/firebase"
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'



export default function Login() {
   const [signInWithGoogle, _user, _loading, error] = useSignInWithGoogle(auth)

   const signIn = () => {
      signInWithGoogle();
   }

   return (
      <div className="w-screen h-screen flex bg-gray-200">
         <button onClick={signIn} className="m-auto border border-cyan-900 text-cyan-900 p-3 text-3xl hover:bg-cyan-900 hover:text-white">Login with Google 🇻🇳</button>
      </div>
   )
}