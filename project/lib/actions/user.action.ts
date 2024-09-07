'use server'

import { clerkClient } from "@clerk/nextjs/server"
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({userIds} : {userIds : string[]}) => {
    try {
        const {data} = await clerkClient.users.getUserList({
            emailAddress: userIds,
        });
        
        

        if (!Array.isArray(data)) {
            throw new Error("Expected an array but got something else");
        }

        const users = data.map((user: any) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress,
            avatar: user.imageUrl,
        }));

        const sortedUsers = userIds.map((email) => users.find((user: any) => user.email === email));
        return parseStringify(sortedUsers);
    } catch (error) {
        console.log(`Error fetching users: ${error}`);
        return null;
    }
};



export const getDocumentUsers = async ({ roomId , currentUser , text } : {roomId : string , currentUser : string , text : string}) => {
    
    try{
        const room = await liveblocks.getRoom(roomId);

        const users = Object.keys(room.usersAccesses).filter((email) => email !== currentUser);

        if(text.length){
            const lowerCaseText = text.toLowerCase();
            const filteredUsers = users.filter((email : string) => email.toLowerCase().includes(lowerCaseText))
            return parseStringify(filteredUsers);
        }

        return users;
        
    }catch(error){
        console.log(`Error fetching room: ${error}`);
    }
    }
  