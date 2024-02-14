import { DocumentData, QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
import { MessageTransformed } from "../../../types";

export const transformMessage = (message: QueryDocumentSnapshot<DocumentData>) : MessageTransformed => {

   return {
      conversation_id: message.id,
      ...message.data() as {user: string, text: string},
      sent_at: convertFirestoreTimestampToString(message?.data()?.sent_at as Timestamp)
   }
}


export const convertFirestoreTimestampToString = (timeStamp : Timestamp) => {
   return new Date(timeStamp.toDate().getTime()).toLocaleString();
}