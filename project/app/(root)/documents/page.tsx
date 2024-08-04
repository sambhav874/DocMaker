

import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import AddDocumentBtn from '@/components/AddDocumentBtn'
import { redirect } from "next/navigation";

const Documents = async () => {

  const user = await currentUser();
  
  if(!user) redirect('/sign-in')



  const documents = [];
  return (
    <main className="home-container bg-dark-100 h-screen w-full">
      <Header className="sticky left-0 top-0" >
        <div className="flex items-center gap-2 lg:gap-4">Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {documents.length > 0 ? (
        <div >
          <h1 className="text-3xl font-bold mb-4">Documents</h1>
        </div>
      ) : (
        <div className="document-list-empty flex flex-col justify-center items-center space-y-4">
      <Image
        src="assets/icons/doc.svg"
        width={40}
        height={40}
        alt="no document"
        className="mx-auto h-1/2 w-1/2 bg-dark-100"
      />
      <AddDocumentBtn userId={user.id} email={user.emailAddresses[0].emailAddress} />
    </div>
      )}

    </main>
  )
}

export default Documents;