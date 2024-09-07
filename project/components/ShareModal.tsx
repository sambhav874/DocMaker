import React, { useState } from "react";
import { Button } from "./ui/button";
import { faClose, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelf } from "@liveblocks/react/suspense";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DialogHeader } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import UserTypeSelector from "./ui/UserTypeSelector";
import { getClerkUsers } from "@/lib/actions/user.action"; // Import the updated getClerkUsers function
import Collaborator from "./Collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";

const ShareModal = ({ roomId, collaborators, creatorId, currentUserType }: ShareDocumentDialogProps) => {
  const user = useSelf();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | undefined>(); // Ensure email is typed as a string
  const [userType, setUserType] = useState<UserType>('viewer');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const shareDocumentHandler = async () => {
    setErrorMessage(null);
    try {
      setLoading(true);
      if (email) {
        const clerkUsers = await getClerkUsers({ userIds: [email] });

        if (!clerkUsers || clerkUsers.length === 0 || !clerkUsers[0]) {
          setErrorMessage("The user is not registered on DocMaker.");
          setLoading(false);
          return;
        }
      }
      await updateDocumentAccess({
        roomId,
        email,
        userType: userType as UserType,
        updatedBy: user.info,
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while sharing the document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button
            disabled={currentUserType !== "viewer"}
            className="flex items-center justify-center space-x-1 p-2 text-white bg-dark-300 hover:bg-white hover:text-dark-200"
          >
            Share
            <FontAwesomeIcon
              icon={faShare}
              className="h-4 w-4 text-xl font-light hover:text-dark-200 px-2"
            />
          </Button>
        </DialogTrigger>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center blur bg-opacity-50">
            <DialogContent className="w-full max-w-lg p-6 bg-dark-200 rounded-lg shadow-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  <div className="flex group items-center justify-between">
                    <p className="text-lg text-white group-hover:white font-semibold">
                      Manage who can access the document
                      <div className="border-b hidden group-hover:block duration-500 border-white"></div>
                    </p>
                    <Button
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center p-2 text-white bg-dark-300 hover:bg-white hover:text-dark-200"
                    >
                      <FontAwesomeIcon
                        icon={faClose}
                        className="h-4 w-4 text-xl font-light hover:text-dark-200 px-2"
                      />
                    </Button>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="mt-4 text-white">
                Select which users can view and edit this document:
              </DialogDescription>
              <Label htmlFor="email" className="my-4 text-white">
                Email Address
              </Label>
              <div className="flex items-center gap-3">
                <div className="flex flex-1 rounded-md bg-dark-200">
                  <Input
                    type="email"
                    id="email"
                    className="text-white bg-dark-400 pr-2 mr-2"
                    placeholder="Enter the user's email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Input>
                  <UserTypeSelector
                    userType={userType}
                    setUserType={setUserType}
                  />
                  <Button
                    type="submit"
                    onClick={shareDocumentHandler}
                    className="flex items-center justify-center space-x-1 p-2 text-white bg-dark-300 hover:bg-white hover:text-dark-200"
                    disabled={loading}
                  >
                    {loading ? "Sending" : "Invite"}
                  </Button>
                </div>
              </div>

              {errorMessage && (
                <p className="mt-2 text-red-500">{errorMessage}</p>
              )}

              <div className="my-2 space-y-2">
                <ul className="flex flex-col">
                  {collaborators.map((collaborator) => (
                    <Collaborator
                      key={collaborator.id}
                      roomId={roomId}
                      creatorId={creatorId}
                      email={collaborator.email}
                      collaborator={collaborator}
                      user={user.info}
                    />
                  ))}
                </ul>
              </div>
            </DialogContent>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default ShareModal;