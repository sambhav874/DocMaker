'use client'
import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import React from 'react';
import { Editor } from './editor/Editor';
import Header from './Header';
import Loader from './Loader';
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs';
import ActiveCollaborators from './ActiveCollaborators';

const CollaborativeRoom = ({roomId , roomMetadata}: CollaborativeRoomProps) => {
    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<Loader />}>
                <div className='collaborative-room'>
                    <Header>
                        <div className="flex w-fit items-center justify-center gap-2">
                            <p className="document-title">This is a fake account</p>
                            <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
                                <ActiveCollaborators />
                            </div>
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </Header>

                    <div className="flex min-h-screen w-full bg-dark-100 px-2 py-4 fixed">
                        <div className="flex w-full max-w-4xl bg-slate-900 text-black rounded-lg shadow-lg">
                            <div className="w-full">
                                <Editor />
                            </div>
                        </div>
                    </div>
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    );
};

export default CollaborativeRoom;
