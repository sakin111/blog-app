import AboutPage from "@/components/modules/About/AboutPage";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "About Page",
  description:
    "This page is for the creator of the posts Identity",
};


const page = () => {
    return (
        <div>
            <AboutPage/>
        </div>
    );
};

export default page;