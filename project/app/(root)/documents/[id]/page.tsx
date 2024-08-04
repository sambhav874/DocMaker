import CollaborativeRoom from '@/components/CollaborativeRoom';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getDocument } from '@/lib/actions/room.actions';
import { getClerkUsers } from '@/lib/actions/user.action';

const Edit = async ({ params: { id } } : SearchParamProps) => {
  const user = await currentUser();

  if (!user) redirect('/sign-in');

  const room = await getDocument({
    roomId: id,
    userId: user.emailAddresses[0].emailAddress,
  });

  if (!room) redirect('/');

  // Ensure `room.usersAccesses` is defined
  const userIds = room.usersAccesses ? Object.keys(room.usersAccesses) : [];
  
  // Fetch users
  const users = await getClerkUsers({ userIds }) || [];

  
  const usersData = Array.isArray(users) ? users.map((user) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write')
      ? 'editor'
      : 'viewer'
  })) : [];

  const currentUserType = room.usersAccesses[user.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';

  return (
    <CollaborativeRoom 
      roomId={id} 
      roomMetadata={room.metadata} 
      users={usersData} 
      currentUserType={currentUserType} 
    />
  );
};

export default Edit;
