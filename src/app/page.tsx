
import Footer from "@/component/footer";
import HeaderProvider from "@/providers/HeaderProvider";

export default function Home() {
    return (
        <div className="w-screen h-screen bg-[#f8fafc]">
            <HeaderProvider />
            <Footer />
        </div>
    );
}
