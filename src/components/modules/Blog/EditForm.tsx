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
import { useUpdateBlog } from "@/action/useCreateBlog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  thumbnail: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Blog {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  tags?: string[];
  isFeatured?: boolean;
}

interface EditBlogModalProps {
  blog: Blog;
  open: boolean;
  onClose: () => void;
}

export function EditForm({ blog, open, onClose }: EditBlogModalProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blog?.title || "",
      content: blog?.content || "",
      thumbnail: blog?.thumbnail || "",
      tags: blog?.tags || [],
      isFeatured: blog?.isFeatured || false,
    },
  });

  const { mutateAsync: updateBlog, isPending } = useUpdateBlog();


  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        content: blog.content,
        thumbnail: blog.thumbnail || "",
        tags: blog.tags || [],
        isFeatured: blog.isFeatured || false,
      });
    }
  }, [blog, form]);

  const onSubmit = async (values: FormData) => {
    try {
     
      const formattedTags = Array.isArray(values.tags)
        ? values.tags
        : typeof values.tags === "string"
        ? (values.tags as string).split(",").map((tag) => tag.trim())
        : [];

      const payload = {
        ...values,
        tags: formattedTags,
        isFeatured: values.isFeatured || false as boolean,
      };


      await updateBlog({ id:blog.id, payload });
      toast.success("Blog updated successfully!");
      onClose();
    } catch (err) {
      const error = err as Error;
      toast.error(`Failed to update blog: ${error.message}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogDescription>
            Update blog information below and click “Save changes”.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog content..."
                      className="min-h-[140px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. react, nextjs, frontend"
                      value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value.split(",").map((tag) => tag.trim())
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Featured */}
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value ? "true" : "false"}
                      onValueChange={(val) => field.onChange(val === "true")}
                      className="flex gap-4 mt-1"
                    >
                      <label className="flex items-center gap-2">
                        <RadioGroupItem value="true" id="featured-yes" />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <RadioGroupItem value="false" id="featured-no" />
                        No
                      </label>
                    </RadioGroup>
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
