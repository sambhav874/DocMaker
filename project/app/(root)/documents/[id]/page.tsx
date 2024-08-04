
import CollaborativeRoom from '@/components/CollaborativeRoom';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getDocument } from '@/lib/actions/room.actions';

const Edit = async ({ params : {id}} : SearchParamProps) => {

  const user = await currentUser();
  

  if(!user) redirect('/sign-in');

  const room = await getDocument({
    roomId : id , 
    userId: user.emailAddresses[0].emailAddress
  })
  if(!room ) redirect('/')

    

    //TODO : Assess the permissions of the user to acces the document
  return (
    <><CollaborativeRoom roomId={id} roomMetadata={room.metadata} >
      
      </CollaborativeRoom>
    </>
  );
};

export default Edit;
