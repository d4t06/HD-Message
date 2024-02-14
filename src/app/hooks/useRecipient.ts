import { auth, db } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../utils/getRecipientEmial";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { AppUser, Conversation } from "../../../types";

export default function useUserState (conversationUsers: Conversation['users'])getUser {
   const [loggedInUser, loading, _error] = useAuthState(auth);

   // get email
   const recipientEmail = getRecipientEmail(conversationUsers, loggedInUser);

   // get avatar
   const queryGetUser = query(collection(db, 'users'), where('email', '==', recipientEmail))
   const [userSnapshot, __laoding, __error] = useCollection(queryGetUser);

   const recipient = userSnapshot?.docs[0]?.data() as AppUser || undefined



   return {recipient, recipientEmail, loading, loggedInUser}
}