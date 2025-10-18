/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateProject } from "./UpdateProject";
import { AllProject, useDeleteProject } from "@/action/useCreateBlog";
import Link from "next/link";






export default function ProjectTable() {
  const { projects = [], isLoading } = AllProject();
  const deleteProject = useDeleteProject();

  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    console.log(id, "this is project id");
    deleteProject.mutate(id, {
      onSuccess: () => {
        toast.success("Project deleted successfully!");
      },
      onError: (error: any) => {
        console.error(error);
        toast.error(error.message || "Failed to delete project.");
      },
    });
  };



  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-full mx-auto">
      <Card className="shadow-md border border-gray-200 rounded-2xl">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Manage Projects
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {projects.length === 0 ? (
            <div className="flex items-center justify-center h-64 bg-black text-white rounded-b-2xl">
              <p className="text-lg font-medium">No Projects Found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b text-gray-700 text-sm uppercase tracking-wide">
                    <th className="p-4 text-left">ID</th>
                    <th className="p-4 text-left">Thumbnail</th>
                    <th className="p-4 text-left">Live Site</th>
                    <th className="p-4 text-left">Description</th>
                    <th className="p-4 text-left">Features</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project: any, index: number) => (
                    <tr
                      key={project.id || index}
                      className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                    >
                      <td className="p-4 text-gray-700 font-medium">
                        {project.id}
                      </td>

                      <td className="p-4">
                        {project.thumbnail ? (
                          <Image
                            src={project.thumbnail}
                            alt="Project Thumbnail"
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 italic">
                            No image
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-blue-600 underline">
                        <Button
                          asChild
                          variant="outline"
                          className="border-gray-300 text-gray-800 hover:bg-gray-800 hover:text-white transition-all ml-5"
                        >

                          <Link
                            href={project.liveSite}
                            target="_blank"
                            rel="noopener noreferrer"
                          >Visit</Link>
                        </Button>
                      </td>

                      <td className="p-4 text-gray-600 truncate max-w-[250px]">
                        {project.description || "No description"}
                      </td>

                      <td className="p-4 text-gray-600 ">
                        {project.features?.length
                          ? project.features.join(", ")
                          : "—"}
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-3 flex-wrap">
                          <Button
                            onClick={() => handleEdit(project)}
                            size="sm"
                            variant="outline"
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                          >
                            <Pencil className="w-4 h-4 mr-1" />
                            Edit
                          </Button>

                          <Button
                            onClick={() => handleDelete(project.id)}
                            size="sm"
                            variant="outline"
                            disabled={deleteProject.isPending}
                            className="border-red-500 text-red-600 hover:bg-red-50"
                          >
                            {deleteProject.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </>
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedProject && (
        <UpdateProject
          projects={selectedProject}
          open={open}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
