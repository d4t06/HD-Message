"use client";

// import { generateQueryGetAllMessages } from "../utils/generateQuery";
// import { DocumentData, QuerySnapshot, getDocs } from "firebase/firestore";
import { User } from "firebase/auth";
import useUserState from "../hooks/useRecipient";
import { Conversation } from "../../../types";

import AccountItem from "./AccountItem";
import Button from "./Button";
import ChatSection from "./ChatSection";
import { cameraIcon, imageIcon, menuIcon } from "@/assets/icon";
import { KeyboardEventHandler, LegacyRef, useEffect, useRef, useState } from "react";
import {
   DocumentData,
   QueryDocumentSnapshot,
   addDoc,
   collection,
   serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { generateQueryGetAllMessages } from "../utils/generateQuery";
import { useCollection } from "react-firebase-hooks/firestore";
import { transformMessage } from "../utils/transformMessage";

type Props = {
   conversation: string;
   messages: string;
};

export default function ChatScreen({ conversation, messages }: Props) {
   // parse props
   const conversationParsed = JSON.parse(conversation) as Conversation & {
      id: string;
   };
   // const messagesParsed = JSON.parse(messages) as MessageTransformed[];

   const [inputValue, setInputValue] = useState<string>();
   const { recipient, recipientEmail, loggedInUser } = useUserState(conversationParsed.users);

   const lastChatRef: LegacyRef<HTMLDivElement> = useRef(null);
   const chatScreenRef: LegacyRef<HTMLDivElement> = useRef(null);

   const firstRender = useRef(true);

   const handleClearInput = () => {
      setInputValue("");
   };

   const handleSendMessage: KeyboardEventHandler<HTMLInputElement> = async (e) => {
      if (!inputValue) return;

      if (e.key === "Enter") {
         console.log("send message");

         const newMessage = {
            conversation_id: conversationParsed.id as string,
            sent_at: serverTimestamp(),
            text: inputValue as string,
            user: loggedInUser?.email as string,
         };


         await addDoc(collection(db, "messages"), {
            ...newMessage,
         });


         handleClearInput();

      }
   };

   // get all messages
   const queryGetMessages = generateQueryGetAllMessages(conversationParsed.id);
   const [messagesSnap, messageLoading, __error] = useCollection(queryGetMessages);

   const renderMessage = () => {
      // display message form mesaage passed by server
      // if (messageLoading) {
      //    return messagesParsed.map((message, index): JSX.Element => {
      //       return (
      //          <ChatSection
      //             self={message.user == loggedInUser?.email}
      //             key={index}
      //             data={message}
      //             recipient={recipient}
      //             loggedInUser={loggedInUser as User}
      //          />
      //       );
      //    });
      // }

      // display message from client
      if (messagesSnap && !messageLoading) {
         // get messages[]
         const messages = messagesSnap?.docs?.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            if (doc?.data()?.sent_at) {
               return transformMessage(doc);
            }
         }); 

         if (messages.length) {

            return messages.map((message, index) => {
               if (index == messages.length - 1 && message) {
                  return (
                     <ChatSection
                        ref={lastChatRef}
                        self={message.user == loggedInUser?.email}
                        key={index}
                        data={message}
                        recipient={recipient}
                        loggedInUser={loggedInUser as User}
                     />
                  );
               }
               if (message) {
                  return (
                     <ChatSection
                        self={message.user == loggedInUser?.email}
                        key={index}
                        data={message}
                        recipient={recipient}
                        loggedInUser={loggedInUser as User}
                     />
                  );
               }
            });
         }
      }
   };


   // scroll to last message
   useEffect(() => {

      console.log("use effect");
      
      if(firstRender.current && messagesSnap) {
         
         firstRender.current = false;
         return;
      }
      console.log("check firstRender", firstRender.current);

      if (lastChatRef.current) {
         lastChatRef.current.scrollIntoView({behavior: "smooth", block: "start"})
      }
   }, [messagesSnap]);

   return (
      <div className="h-screen overflow-hidden relative">
         {/* top */}
         <div className="p-4 border-b">
            <div className="flex flex-row justify-between h-12 items-center ">
               {conversation && (
                  <AccountItem
                     chatScreen
                     conversation={conversationParsed}
                  />
               )}
               <div className="flex gap-4">
                  <Button className="hover:bg-gray-50 rounded-full h-10 w-10 text-center text-xl flex justify-center items-center hover:brightness-90">
                     {cameraIcon}
                  </Button>
                  <Button className="hover:bg-gray-50 rounded-full h-10 w-10 text-center text-xl flex justify-center items-center hover:brightness-90">
                     {menuIcon}
                  </Button>
               </div>
            </div>
         </div>

         {/* main content */}
         <div ref={chatScreenRef} className="h-[calc(100vh-10rem)] p-4 overflow-auto flex flex-col gap-10">
            {renderMessage()}
         </div>

         {/* chat input */}
         <div className="p-4 border-t absolute bottom-0 left-0 right-0 z-10 bg-white">
            <div className="h-12 flex flex-row items-center gap-4">
               <Button className="hover:bg-gray-100 rounded-full p-2 h-10 w-10 flex justify-center items-center">
                  {imageIcon}
               </Button>
               <input
                  className="h-full flex-1 bg-gray-100 rounded-full pl-3 outline-none"
                  placeholder="Message..."
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => handleSendMessage(e)}
                  // value={mess}
               />
               <Button className="hover:bg-gray-100  rounded-full h-12 w-12 flex justify-center items-center">
                  <span>&#128075;</span>
               </Button>
            </div>
         </div>
      </div>
   );
}
