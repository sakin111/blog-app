"use client";

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
import { toast } from "sonner";
import { useAddProject } from "@/action/useCreateBlog"; 
import { useRouter } from "next/navigation";

const formSchema = z.object({
  thumbnail: z.url("Must be a valid URL").optional().or(z.literal("")),
  features: z.array(z.string()).optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  liveSite: z.url("Must be a valid URL").optional().or(z.literal("")),
  liveLink: z.url("Must be a valid URL").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;




export function AddProject() {

  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      thumbnail:"",
      features: [],
      description:  "",
      liveSite:  "",
      liveLink:  "",
    },
  });

  const { mutateAsync: addProject, isPending } = useAddProject(); 



  const onSubmit = async (values: FormData) => {
    try {
      await addProject(values); 
      toast.success("Project added successfully!");
      router.push("/project")
      form.reset()
    } catch (err) {
      const error = err as Error;
      toast.error(`Failed to post project: ${error.message}`);
    }
  };

  return (


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
                        field.onChange(e.target.value.split(",").map((f) => f.trim()))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer */}
    
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
 
          </form>
        </Form>


  );
}
