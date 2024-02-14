import { db } from "@/config/firebase";
import { collection, doc, orderBy, query, where } from "firebase/firestore";

function generateQueryGetAllMessages(conversation_id: string) {
   const queryGetMessages = query(
      collection(db, "messages"),
      where("conversation_id", "==", conversation_id),
      orderBy("sent_at", "asc")
   );

   return queryGetMessages;
}

function generateQueryGetAllConversations(userEmail: string | undefined) {
   const queryGetAllConversations = query(
      collection(db, "conversation"),
      where("users", "array-contains", userEmail)
   );

   return queryGetAllConversations;
}

const generateQueryGetRecipient = (email: string) => {
   const queryGetRecipient = query(
      collection(db, "conversation"),
      where("email", "==", email)
   )
   return queryGetRecipient
}

export { generateQueryGetAllMessages, generateQueryGetAllConversations, generateQueryGetRecipient };
