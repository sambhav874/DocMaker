'use client'
import { currentUser } from "@clerk/nextjs/server";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { faClose, faCross, faDeleteLeft, faDumpster, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelf } from "@liveblocks/react/suspense";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { DialogHeader } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import UserTypeSelector from "./ui/UserTypeSelector";
import { getClerkUsers } from "@/lib/actions/user.action";
import Collaborator from "./Collaborator";
import { deleteDocument, updateDocumentAccess } from "@/lib/actions/room.actions";
import { type } from "os";




const DeleteModal = ({roomId} : DeleteModalProps) => {
    
    const [loading , setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    
    const deleteDocumentHandler = async () => {
        
            setLoading(true);
          try{  await deleteDocument(roomId);
            setOpen(false);
        }
        catch(error){
            console.error(error);
        }
        setLoading(false);
    }


    return (<>

<Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center justify-center space-x-1 p-2 text-white bg-dark-300 hover:bg-white hover:text-dark-200">
            Delete
            <FontAwesomeIcon icon={faDeleteLeft} className="h-4 w-4 text-xl font-light hover:text-dark-200 px-2" />
          </Button>
        </DialogTrigger>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center blur bg-opacity-50">
            <DialogContent className="w-full max-w-lg p-6 bg-dark-200 rounded-lg shadow-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
              <DialogHeader>
              <div className="flex flex-col text-white justify-center items-center">
              

<FontAwesomeIcon icon={faDumpster} className="h-8 w-8 text-xl font-light hover:text-dark-200 flex justify-center items-center px-2" />
              </div>
           
          
                <DialogTitle>
                  <div className="flex group items-center justify-between">
                    <p className="text-lg text-white group-hover:white font-semibold">Delete this Document
                        <div className="border-b hidden group-hover:block duration-500  border-white"></div>
                    </p>
                    <Button onClick={() => setOpen(false)} className="flex items-center justify-center p-2 text-white bg-dark-300 hover:bg-white hover:text-dark-200">
                      <FontAwesomeIcon icon={faClose} className="h-4 w-4 text-xl font-light hover:text-dark-200 px-2" />
                    </Button>
                  </div>
                </DialogTitle>
                
                <DialogDescription className="mt-4 text-white">
                Are you sure you want to delete this document? This action cannot be
                undone.
                </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-5">
          <DialogClose asChild className="w-full bg-dark-400 text-white">
            Cancel
          </DialogClose>

          <Button
            variant="destructive"
            onClick={deleteDocumentHandler}
            className=" w-full"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>

</DialogFooter>
              
            </DialogContent>
          </div>
        )}
      </Dialog>


    </>
    )
}

export default DeleteModal;