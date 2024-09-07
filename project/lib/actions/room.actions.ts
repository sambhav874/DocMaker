'use server'
import {nanoid} from 'nanoid'
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { getAccessType, parseStringify } from '../utils';
import { redirect } from 'next/navigation';
import { title } from 'process';


export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
    const roomId = nanoid();
  
    try {
      const metadata = {
        creatorId: userId,
        email,
        title: 'Untitled'
      }
  
      const usersAccesses: RoomAccesses = {
        [email]: ['room:write']
      }
  
      const room = await liveblocks.createRoom(roomId, {
        metadata,
        usersAccesses,
        defaultAccesses: []
      });
      
      revalidatePath('/documents');
  
      return parseStringify(room);
    } catch (error) {
      console.log(`Error happened while creating a room: ${error}`);
    }
  }
export default createDocument;

export const getDocument = async ({ roomId, userId }: { roomId: string; userId: string }) => {

    try{const room = await liveblocks.getRoom(roomId);
        
        const hasAccess = Object.keys(room.usersAccesses).includes(userId);
    
        if(!hasAccess) {
            throw new Error('You do not have access to this document !');
        }
    
        return parseStringify(room);}
        catch(error){
            console.log(`Error happened while getting a room : ${error}`)
        }
}

export const updateDocument = async (roomId : string , title : string) => {
    try {
        const updatedRoom = await liveblocks.updateRoom(roomId , {
            metadata : {
                title
            }
        })
        revalidatePath(`/documents/${roomId}`)

        return parseStringify(updatedRoom);
    }catch(error){
        console.log(`Error happened while updating a room : ${error}`)
    }
}

export const getDocuments = async(email : string) => {
  try{
    const rooms = await liveblocks.getRooms({userId : email});

    return parseStringify(rooms);

  }catch(error){
    console.log(`Error happened while getting documents : ${error}`);
  }
}



export const updateDocumentAccess = async ({roomId , email , userType , updatedBy} : ShareDocumentParams) => {


  try{
    
    const usersAccesses : RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    }

    const room = await liveblocks.updateRoom(roomId , {usersAccesses});

    if (room) {
      const notificationId = nanoid();

      await liveblocks.triggerInboxNotification({
        userId : email ,
        kind : '$documentAccess',
        subjectId: notificationId,
        activityData: {
          userType ,
          title: `You have been granted ${userType} access to the document ${updatedBy.name}`,
          updatedBy:updatedBy.name,
          avatar: updatedBy.avatar,
          email: updatedBy.email,
        },
        roomId
      })
    }

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room);

  } 
  catch(error){
    console.log(`Error happened while updating document access : ${error}`);
  }
}


export const removeCollaborator = async ({roomId , email} : {roomId : string ,email : string}) => {

  try{
    const room = await liveblocks.getRoom(roomId);
    if(room.metadata.email === email){
      throw new Error('You cannot remove yourself from the document');
    }

    const updatedRoom = await liveblocks.updateRoom(roomId , {
      usersAccesses: {
        [email]: null}
    })

    revalidatePath(`/documents/${roomId}`);

    return parseStringify(updatedRoom);
  }
  catch(error){
    console.log(`Error happened while removing collaborator : ${error}`);
  }

}

export const deleteDocument = async (roomId : string) => {

  try{
    await liveblocks.deleteRoom(roomId);
    revalidatePath('/documents/');
    redirect('/documents/')
  }
  catch(error){
    console.log(`Error happened while deleting document : ${error}`);
  }
}

export const updateRoomUsers = async ({ roomId, usersAccesses }: { roomId: string, usersAccesses: RoomAccesses }) => {
  try {
    
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses,
    });
    
    revalidatePath(`/documents/${roomId}`);
    return parseStringify(updatedRoom);

  } catch (error) {
    console.log(`Error happened while updating room users: ${error}`);
  }
};