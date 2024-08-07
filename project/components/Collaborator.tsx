import { SetStateAction, useState } from "react";
import Image from "next/image";
import UserTypeSelector from "./ui/UserTypeSelector";
import { Button } from "./ui/button";

const Collaborator = ({roomId , creatorId , collaborator , email , user} : CollaboratorProps) => {

    const [loading , setLoading] = useState(false);
    const [userType , setUserType] = useState(collaborator.userType || 'viewer')

    const shareDocumentHandler = async (type : string) => {

    }

    const removeCollaboratorHandler = async (email : string) => {
        
    }
    return(
        <li className="flex items-center justify-between gap-2 py-3">
            <div className="flex gap-2">
            <Image src={collaborator.avatar} alt={collaborator.name} width={36} height={36} className="size-9 rounded-full" />
            <div>
                <p className="line-clamp-2 text-sm font-bold leading-4 text-white"> {collaborator.name}
                    <span className="pl-2 text-blue-100">
                        {loading && 'Updating...'}
                    </span>
                </p>
                <p className=" text-sm font-light text-blue-100">
                    {collaborator.email}
                </p>

            </div>
            
            </div>

            {creatorId === collaborator.id ? (
                <p className="text-sm text-blue-100">Owner</p>
            ) : (
                <div className="flex items-center">
                    <UserTypeSelector userType={collaborator.userType as UserType} setUserType={setUserType} onClickHandler={shareDocumentHandler} />
                    <Button type="button" onClick={() => removeCollaboratorHandler(collaborator.email)} >
                        Remove
                    </Button>
                </div>
            )}
        </li>
    )
}
export default Collaborator;  