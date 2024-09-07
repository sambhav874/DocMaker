import CollaborativeRoom from '@/components/CollaborativeRoom';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getDocument, updateRoomUsers } from '@/lib/actions/room.actions'; // Assuming you have an updateRoomUsers function
import { getClerkUsers } from '@/lib/actions/user.action';

const Edit = async ({ params: { id } }: SearchParamProps) => {

  const user = await currentUser();

  if (!user) redirect('/sign-in');

  const room = await getDocument({
    roomId: id,
    userId: user.emailAddresses[0].emailAddress,
  });

  if (!room) redirect('/');

  const userIds = room.usersAccesses ? Object.keys(room.usersAccesses) : [];

  // Fetch users from Clerk and filter out null values directly
  const validUsers = (await getClerkUsers({ userIds }) || []).filter(user => user !== null);

  console.log('User IDs from room:', userIds);
  console.log('Valid users from Clerk:', validUsers);

  // Check for missing users in Clerk
  const missingUsersInClerk = userIds.filter(
    (userId) => !validUsers.some((clerkUser) => clerkUser.email === userId)
  );

  if (missingUsersInClerk.length > 0) {
    console.log(`The following users are missing in Clerk's data: ${missingUsersInClerk.join(', ')}`);

    const updatedUsersAccesses = { ...room.usersAccesses };
    missingUsersInClerk.forEach((userId) => {
      delete updatedUsersAccesses[userId];
    });

    await updateRoomUsers({
      roomId: id,
      usersAccesses: updatedUsersAccesses,
    });

    console.log(`Removed missing users from Liveblocks: ${missingUsersInClerk.join(', ')}`);
  }

  // Map valid users and assign their access type (editor/viewer)
  const usersData = validUsers.map((user) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write') ? 'editor' : 'viewer',
  }));

  const currentUserType = room.usersAccesses[user.emailAddresses[0].emailAddress]?.includes('room:write')
    ? 'editor'
    : 'viewer';

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