import Auth from "@/app/components/Auth";
import ChatScreen from "@/app/components/ChatScreen";
import Sidebar from "@/app/components/Sidebar";
import { db } from "@/config/firebase";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { Conversation } from "../../../../types";
import { generateQueryGetAllMessages } from "@/app/utils/generateQuery";
import { transformMessage } from "@/app/utils/transformMessage";

type Props = {
   params: {
      id: string;
   };
};

export const revalidate = 10;

export function generateMetadata ({params: {id}} : Props) {
   return {
      title: "chat with" + id
   }
}

const Conversation = async ({ params: { id } }: Props) => {

      // get conversation info
      const docRef = doc(db, 'conversation', id);
      const docSnap = await getDoc(docRef)
      const conversation = {...docSnap.data() as Conversation, id: id}
      
      // get all messages
      const queryGetMessages = generateQueryGetAllMessages(conversation.id);
      const messagesSnap =  await getDocs(queryGetMessages)

      const messages = messagesSnap?.docs?.map(doc => {
         return transformMessage(doc)
       })

      //  console.log("check message", messages);
       

      // check the conversation with recipient is exits

      

   return (
      <>
         <Auth>
            <div className="flex flex-row">
               <div className="md:w-3/5 sm:hidden  ">
                  <Sidebar id={id}/>
               </div>
               <div className="flex-1">
                  <ChatScreen messages={JSON.stringify(messages)} conversation={JSON.stringify(conversation)}/>
               </div>
            </div>
         </Auth>
      </>
   );
};

export default Conversation;
