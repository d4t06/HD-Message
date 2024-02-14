"use client";

import {
   checkIcon,
   magnifyIcon,
   menuIcon,
   plusIcon,
   xIcon,
} from "@/assets/icon";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { auth, db } from "@/config/firebase";

import { signOut } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
   addDoc,
   collection,
   doc,
   serverTimestamp,
   setDoc,
} from "firebase/firestore";

import AccountItem from "./AccountItem";
import Button from "./Button";
import Modal from "./Modal";
import { generateQueryGetAllConversations } from "../utils/generateQuery";
import { Conversation } from "../../../types";

export default function Sidebar({id : conversation_id}: {id ?: string}) {
   const [loggedInUser, _loading] = useAuthState(auth);
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

   const [newConversation, setNewConverSation] = useState<string>("");
   const [error, setError] = useState<boolean>(false);

   // const [currentConversation, setCurrentConversation] = useState<number>(0);


   const handleCloseModal = () => {
      setIsOpenModal(false);
      setNewConverSation("");
   };

   // console.log("check router id", id);
   

   const logOut = async () => {
      try {
         await signOut(auth);
      } catch (error) {
         console.log("logout error", { messsage: error });
      }
   };

   const handleSetNewConverSation = (value: string) => {
      setNewConverSation(value);

      const myRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!value) {
         setError(true);
         return;
      }

      console.log("check email ", value, myRegex.test(value));

      setError(!myRegex.test(value));
   };

   const queryGetAllConversations = generateQueryGetAllConversations(loggedInUser?.email as string);

   const [conversationsSnapshot] = useCollection(queryGetAllConversations);
   const conversations = conversationsSnapshot?.docs.map((conversation) => {
      return { ...(conversation.data() as Conversation), id: conversation.id };
      // return data.users[1]
   });

   const handleAddNewConverSation = async () => {
      // if submit with js
      const myRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!myRegex.test(newConversation)) return;

      const isInvitingYourself = newConversation === loggedInUser?.email;

      try {
         if (!isInvitingYourself) {
            const res = await addDoc(collection(db, "conversation"), {
               users: [loggedInUser?.email, newConversation],
            });

            setIsOpenModal(false);
            // console.log("check res", res);
         }
      } catch (error) {
         console.log("create conversation error", { message: error });
      }
   };

   // console.log("check user", loggedInUser);

   // console.log("check conversations", conversations)

   useEffect(() => {
      // push to the previous conversation
      // router.push("/conversations/asdf")
   }, []);

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

   return (
      <>
         <div className="border-r h-screen overflow-hidden">
            {/* top */}
            <div className="p-4">
               {/* header */}
               <div className="flex justify-between h-12 items-center">
                  <div className="rounded-full flex-shrink-0 border-2 border-gray-200">
                     <Image
                        src={loggedInUser?.photoURL as string}
                        className="rounded-full"
                        width={40}
                        height={40}
                        alt=""
                     />
                  </div>
                  <div className="flex gap-4">
                     <Button
                        onclick={() => setIsOpenModal(true)}
                        className="bg-slate-100 rounded-full h-10 w-10 text-center text-xl flex justify-center items-center hover:brightness-90"
                     >
                        {plusIcon}
                     </Button>
                     <Button
                        onclick={logOut}
                        className="bg-slate-100 rounded-full h-10 w-10 text-center text-xl flex justify-center items-center hover:brightness-90"
                     >
                        {menuIcon}
                     </Button>
                  </div>
               </div>

               {/* search */}
               <div className="mt-5">
                  <div className="w-full">
                     <div className="bg-slate-100 p-4 rounded-full h-12 overflow-hidden flex flex-row">
                        <Button className="bg-transparent text-xl h-full pl-3">
                           {magnifyIcon}
                        </Button>
                        <input
                           className="h-full flex-1 bg-transparent pl-3 outline-none"
                           placeholder="Search..."
                           type="text"
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* bottom */}
            {/*  conversation list */}
            <div className=" flex flex-col gap-2 overflow-auto p-4 h-[calc(100vh-7.25rem)] overflow-y-auto border-t border-transparent hover:border-gray-200">
               {conversations?.length &&
                  conversations.map((conversation, index) => (
                     <Link
                        href={`/conversations/${conversation.id}`}
                        key={conversation.id}
                     >
                        <AccountItem active={conversation.id == conversation_id} conversation={conversation} />
                     </Link>
                  ))}
            </div>
         </div>

         {isOpenModal && (
            <Modal setOpenModal={setIsOpenModal}>
               <div className="p-8 w-2/5  bg-slate-200 rounded-lg flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-20 gap-4 items-center">
                  <h1 className="mr-auto text-2xl uppercase text-gray-800">
                     Add new conversation
                  </h1>
                  <div className="flex flex-row h-12 bg-slate-50 rounded-xl w-full">
                     <input
                        placeholder="Email..."
                        type="text"
                        className="px-4 flex-1 bg-transparent outline-none"
                        value={newConversation}
                        onChange={(e) =>
                           handleSetNewConverSation(e.target.value)
                        }
                     />
                     <span className="bg-transparent pr-5 py-3 h-full">
                        {error ? xIcon : checkIcon}
                     </span>
                  </div>
                  <div className="flex justify-end w-full">
                     <button
                        onClick={() => handleCloseModal()}
                        className="py-2 px-8 uppercase text-blue-800 hover:bg-gray-300"
                     >
                        cancel
                     </button>
                     <button
                        onClick={() => handleAddNewConverSation()}
                        className={`py-2 px-8 uppercase text-blue-800 hover:bg-gray-300 ${
                           error ? "opacity-40 pointer-events-none" : ""
                        }`}
                     >
                        Add
                     </button>
                  </div>
               </div>
            </Modal>
         )}
      </>
   );
}
