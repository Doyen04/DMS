import Image from "next/image";
import Header from "@/component/header";
import Footer from "@/component/footer";

export default function Home() {
    return (
        <div className="w-screen h-screen bg-[#f8fafc]">
            <Header />
            <Footer />
        </div>
    );
}
