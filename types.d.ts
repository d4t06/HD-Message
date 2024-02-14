import { Timestamp } from "firebase/firestore"

type Conversation = {
   users: string[],
   // id: string
}

type AppUser = {
   email: string,
   lastSeen: Timestamp,
   photoURL: string,
}

type MessageTransformed = {
   conversation_id: string,
   sent_at: string,
   user: string,
   text: string,
}