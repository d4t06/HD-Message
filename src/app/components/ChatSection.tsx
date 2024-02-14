import Image from "next/image";
import avatar from '@/assets/images/avatar.jpg'
import { AppUser, MessageTransformed } from "../../../types";
import { User } from "firebase/auth";
import { forwardRef } from "react";

type Props = {
   self?: boolean,
   data: MessageTransformed,
   recipient: AppUser,
   loggedInUser : User,
}

function ChatSection ({self, data, recipient, loggedInUser}: Props, ref : any)  {

   // console.log("check data", data);

   if (ref) {
      return (
      <div ref={ref} className={`flex ${self ? 'flex-row-reverse' : "flex-row"} items-start gap-3 last:pb-12 justify-self-end`}>
         {/* <Image src={avatar} height={28} width={28} alt="" className="rounded-full"/> */}
         <div className="ml-3">
            <p className={`text-md mt-1 first:mt-0 p-3 ${self ? 'bg-[#2887fe] text-white' : "bg-gray-100"} first:rounded-tl-full rounded-r-full last:rounded-bl-full`}>
               {data?.text && data.text}
            </p>            
         </div>
      </div>
      )
   }

   return (
      <div className={`flex ${self ? 'flex-row-reverse' : "flex-row"} items-start gap-3 last:pb-12 justify-self-end`}>
         {/* <Image src={avatar} height={28} width={28} alt="" className="rounded-full"/> */}
         <div className="ml-3">
            <p className={`text-md mt-1 first:mt-0 p-3 ${self ? 'bg-[#2887fe] text-white' : "bg-gray-100"} first:rounded-tl-full rounded-r-full last:rounded-bl-full`}>
               {data?.text && data.text}
            </p>            
         </div>
      </div>
   )
}

export default forwardRef(ChatSection)