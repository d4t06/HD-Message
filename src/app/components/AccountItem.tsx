"use client"

import Image from "next/image";
import useUserState from "../hooks/useRecipient";
import { convertFirestoreTimestampToString } from "../utils/transformMessage";

type Props = {
   active?: boolean;
   width?mber;
   height?: number;
   conversation: { users: string[] };
   chatScreen?: boolean;
   onClick?: () => void
};

export default function AccountItem({
   active,
   width,
   height,
   chatScreen,
   conversation,
   onClick
}: Props) {
   const { recipient, recipientEmail, loading } = useUserState(
      conversation.users
   );

   return (
      <div
         className={`cursor-pointer flex flex-row items-center ${
            chatScreen ? "px-2 py-1 w-fit" : "w-full p-3"
         } rounded-lg hover:bg-slate-100 ${active ? "bg-slate-100" : ""}`}
      >
         {recipient?.photoURL ? (
            <div className={`h-[${height || 3}rem] w-[${width || 3}rem]`}>
               <Image
                  height={100}
                  width={100}
                  src={recipient?.photoURL}
                  className="rounded-full flex-shrink-0"
                  alt=""
               />
            </div>
         ) : (
            <div className="h-[3rem] w-[3rem] bg-gray-300 rounded-full text-center flex-shrink-0">
               <span className="text-2xl text-white leading-[3rem]">
                  {recipientEmail?.charAt(0)}
               </span>
            </div>
         )}
         <div className="ml-4">
            <h3
               className={`text-md ${!recipient?.email ? "line-through" : ""}`}
            >
               {recipientEmail}
            </h3>
            {!chatScreen ? (
               <p className="text-sm mt-1 text-gray-500">Da gui mot anh</p>
            ) : recipient?.lastSeen ? (
               <p className="text-md mt-1 text-gray-500">
                  {convertFirestoreTimestampToString(recipient?.lastSeen)}
               </p>
            ) : (
               ""
            )}
         </div>
      </div>
   );
}
