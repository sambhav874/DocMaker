import React from "react";
import Image from "next/image";

const Loader = () => {
    return ( <div className="loader flex size-full h-screen items-center justify-center gap-3 text-white bg-dark-100">
        <Image src="/assets/icons/loader.svg" alt="Loading..." width={100} height={100} className="animate-spin text-white bg-white" />
    </div>)
}

export default Loader;