import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import AddDocumentBtn from '@/components/AddDocumentBtn'
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/actions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";

const Documents = async () => {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const roomDocuments = await getDocuments(user.emailAddresses[0].emailAddress);
  console.log(roomDocuments.data);

  return (
    <main className="home-container bg-dark-100 min-h-screen w-full">
      <Header className="sticky left-0 top-0">
        <div className="flex items-right gap-2 lg:gap-4">Notification</div>
      </Header>

      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container  p-4">
          <div className="relative w-full flex group mb-12 justify-center">
            <h1 className="text-5xl group-hover:text-white text-center font-extralight font-italic text-white font-sans ">Documents</h1>
            <div className="absolute w-1/3 border-b-2 border-transparent group-hover:border-white transition-all duration-300 mt-16"></div></div>
          
          <div className="flex flex-col gap-4">
          <div className="m-4"><AddDocumentBtn userId={user.id} email={user.emailAddresses[0].emailAddress} /></div>
            {roomDocuments.data.map(({ id, metadata, createdAt } : any) => (<>
              
              <div key={id} className="document-card flex bg-dark-500 hover:bg-white max-w-2xl text-white group group-hover hover:text-dark-100 duration-300 p-4 rounded-lg">
                <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                <div className="document-icon hidden rounded-md bg-dark-500 p-2 group-hover:bg-white sm:block">
                  <Image src="/assets/icons/doc.svg" width={40} height={40} alt={""} />
                </div>
                <div className="document-card-header line-clamp-2 text-2xl  hover:text-dark-100">
                  {metadata.title}
                  <div>
                    <p className="text-sm  font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
                  </div>
                </div></Link>
               
              </div></>
            ))}
          </div>
        </div>
      ) : (
        <div className="document-list-empty flex flex-col justify-center items-center space-y-4 p-4">
          <Image
            src="/assets/icons/doc.svg"
            width={40}
            height={40}
            alt="no document"
            className="mx-auto h-1/2 w-1/2 bg-dark-100"
          />
          <AddDocumentBtn userId={user.id} email={user.emailAddresses[0].emailAddress} />
        </div>
      )}
    </main>
  );
}

export default Documents;
