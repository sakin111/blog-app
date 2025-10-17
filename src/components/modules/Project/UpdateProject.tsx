"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { useUpdateProject } from "@/action/useCreateBlog";


// ✅ Zod schema for Project fields
const formSchema = z.object({
  thumbnail: z.url("Must be a valid URL").optional().or(z.literal("")),
  features: z.array(z.string()).optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  liveSite: z.url("Must be a valid URL").optional().or(z.literal("")),
  liveLink: z.url("Must be a valid URL").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface Project {
  id: number;
  thumbnail: string;
  features: string[];
  description: string;
  liveSite: string;
  liveLink: string;
}

interface EditProjectModalProps {
  projects: Project;
  open: boolean;
  onClose: () => void;
}

export function UpdateProject({ projects, open, onClose }: EditProjectModalProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      thumbnail: projects.thumbnail || "",
      features: projects.features || [],
      description: projects.description || "",
      liveSite: projects.liveSite || "",
      liveLink: projects.liveLink || "",
    },
  });

  const { mutateAsync: updateProject, isPending } = useUpdateProject();

  useEffect(() => {
    if (projects) {
      form.reset({
        thumbnail: projects.thumbnail || "",
        features: projects.features || [],
        description: projects.description || "",
        liveSite: projects.liveSite || "",
        liveLink: projects.liveLink || "",
      });
    }
  }, [projects, form]);

  const onSubmit = async (values: FormData) => {
    try {
      await updateProject({ id: projects.id, payload: values });
      toast.success("Project updated successfully!");
      onClose();
    } catch (err) {
      const error = err as Error;
      toast.error(`Failed to update project: ${error.message}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update project details and click “Save changes”.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Thumbnail */}
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short description..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Live Site */}
            <FormField
              control={form.control}
              name="liveSite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Site URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://mysite.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Live Link */}
            <FormField
              control={form.control}
              name="liveLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Repository / Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/username/repo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Features */}
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. authentication, responsive, dark mode"
                      value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value.split(",").map((f) => f.trim())
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer */}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
