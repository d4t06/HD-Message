import { User } from "firebase/auth";
import { Conversation } from "../../../types";

export default function getRecipientEmial (conversationUsers: Conversation['users'], loggedInUser?: User | null) {

   return conversationUsers.find(user => user !== loggedInUser?.email)
}