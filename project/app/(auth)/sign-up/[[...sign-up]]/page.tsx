import { SignUp } from "@clerk/nextjs";
import React from "react";

const signUPpage = () => {
    return(
        <div className="auth-page">
            <SignUp />
        </div>
    )
}

export default signUPpage;