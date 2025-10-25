import AllProject from "@/components/modules/Project/AllProject";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Project Page",
  description:
    "the project page for showcasing the project",
};

const project = () => {
    return (
        <div>
            <AllProject/>
        </div>
    );
};

export default project;