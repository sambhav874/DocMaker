import { SignIn } from "@clerk/nextjs";
import React from "react";

const signINpage = () => {
    return(
        <div className="auth-page">
            <SignIn />
        </div>
    )
}

export default signINpage;