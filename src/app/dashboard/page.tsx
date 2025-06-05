import Footer from "@/component/footer";
import HeaderProvider from "@/providers/HeaderProvider";
import React from "react";


const Dashboard = () => {
    return (
        <div>
            <HeaderProvider />
                
            <Footer />
        </div>
    )
}

export default Dashboard;