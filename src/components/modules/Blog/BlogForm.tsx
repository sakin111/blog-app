/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateBlog } from "@/action/useCreateBlog";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";


const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  thumbnail: z.url("Must be a valid URL"),
  tags: z.string().optional(),
  isFeatured: z.enum(["true", "false"]),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export default function BlogForm() {
  const [loading, setLoading] = useState(false);
  const createBlogs = useCreateBlog();
  const router = useRouter()

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      tags: "",
      isFeatured: "false",
    },
  });


  const onSubmit = async (values: BlogFormValues) => {
    try {
      setLoading(true);
    const formattedData = {
      ...values,
      tags: values.tags
        ? values.tags.split(",").map((tag) => tag.trim())
        : [],
      isFeatured: values.isFeatured === "true",
    };
      await createBlogs.mutateAsync(formattedData);
      toast.success("Blog created successfully!");
      router.push("/blogs")
      form.reset();
    } catch (err) {

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-4 my-8 sm:p-6 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">
        Create Blog
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
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
              <FormItem className="w-full">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your content..." rows={5} {...field} />
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
              <FormItem className="w-full">
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://example.com/image.jpg" {...field} />
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
              <FormItem className="w-full">
                <FormLabel>Tags (comma separated)</FormLabel>
                <FormControl>
                  <Input placeholder="Next.js, React, Web Development" {...field} />
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
              <FormItem className="w-full">
                <FormLabel>Featured</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-col sm:flex-row sm:gap-6 gap-3 mt-1"
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

          {/* Submit */}
          <Button type="submit" className="w-full py-2 text-lg sm:text-base" disabled={loading}>
            {loading ? "Posting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
