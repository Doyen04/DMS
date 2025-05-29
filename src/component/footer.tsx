import React from "react";

const Footer = ()=>{
    return(
        <div className="px-5 h-14 w-full bg-amber-200 border-t-1 fixed bottom-0 flex justify-between items-center">
            <div className="text-xs ">
                &copy;2025 FileHub. All rights reserved.
            </div>
            <div className="flex gap-2 items-center">
                <p className="text-xs">Privacy Policy</p>
                <p className="text-xs">Terms of Service</p>
            </div>
        </div>
    )
}

export default Footer