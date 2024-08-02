import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faShare } from "@fortawesome/free-solid-svg-icons";
import Doc from "./../../../../components/edit/Experiment";
import Header from './../../../../components/Header';
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Editor } from "@/components/editor/Editor";

const Edit = () => {
  return (
    <>
      <Header>
        <div className="flex w-fit items-center justify-center gap-2">
          <p className="document-title">This is a fake account</p>
        </div>
      </Header>

      <div className="flex min-h-screen w-full bg-dark-100 px-2 py-4 fixed">
        <div className="flex w-full max-w-4xl bg-slate-900 text-black rounded-lg shadow-lg">
          <div className="w-full">
            <Editor />
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
