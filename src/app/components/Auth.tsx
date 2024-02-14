"use client";

import { ReactElement, ReactNode, useEffect } from "react";

import { auth, db } from "@/config/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import Login from "../login/page";

function Auth({children} : {children : ReactNode | ReactElement}) {
   const [loggedInUser, loading, _error] = useAuthState(auth);

   useEffect(() => {
      const storageUser = async () => {
         try {
            await setDoc(
               doc(db, "users", loggedInUser?.email as string),
               {
                  email: loggedInUser?.email,
                  lassSeen: serverTimestamp(),
                  photoURL: loggedInUser?.photoURL,
               },
               {
                  merge: true,
               }
            );
         } catch (error) {}
      };

      if (loggedInUser) storageUser();
   }, [loggedInUser]);

   if (loading) {
      return <h1>Loading</h1>;
   }

   if (!loggedInUser) return <Login />;

   return <>{children}</>;
}

export default Auth;
