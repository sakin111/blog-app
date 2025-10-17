/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const experienceSchema = z.object({
  role: z.string().min(2).optional(),
  company: z.string().min(2).optional(),
  duration: z.string().min(2).optional(),
  details: z.string().optional(),
});

const socialLinksSchema = z.object({
  github: z.url("Invalid URL").optional(),
  linkedin: z.url("Invalid URL").optional(),
  twitter: z.url("Invalid URL").optional(),
});

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.email("Invalid email address").optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  skills: z.string().optional(),
  experience: z.array(experienceSchema).optional(),
  socialLinks: socialLinksSchema.optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function UpdateProfileForm() {

  const router = useRouter()
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/about`, {
        cache:"force-cache"
      });
      const json = await res.json();
      return json.data;
    },
  });



  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      location: "",
      skills: "",
      experience: [{ role: "", company: "", duration: "", details: "" }],
      socialLinks: {},
    },
  });


  useEffect(() => {
    if (data) {
      form.reset({
        email: data.email || "",
        name: data.name || "",
        bio: data.bio || "",
        location: data.location || "",
        skills: data.skills?.join(", ") || "",
        experience: data.experience || [{ role: "", company: "", duration: "", details: "" }],
        socialLinks: data.socialLinks || {},
      });
    }
  }, [data, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      if (!data?.id) throw new Error("User is not loaded yet");

      const payload = {
        ...values,
        skills: values.skills ? values.skills.split(",").map((s) => s.trim()) : [],
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include"
      });

      if (!res.ok) throw new Error("Failed to update profile");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      form.reset()
      router.push("/about")
    },
    onError: (err: any) => {
      toast.error(`Failed to update profile: ${err.message}`);
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!data) return <p className="text-center mt-10">No profile found.</p>;

  return (
    <Card className="max-w-4xl w-full mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Update Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
       
            </div>


           {/* location */}

                 <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            {/* --- Bio --- */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell something about yourself..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* --- Skills --- */}
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="React, TypeScript, Node.js" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-4" />

            {/* --- Experience --- */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Work Experience</h3>
              {fields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-md space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`experience.${index}.role`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input placeholder="Frontend Developer" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`experience.${index}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Company Name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`experience.${index}.duration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="2022 - Present" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.details`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Details</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your role..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="button" variant="destructive" onClick={() => remove(index)}>
                    Remove Experience
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  append({ role: "", company: "", duration: "", details: "" })
                }
              >
                + Add Experience
              </Button>
            </div>

            <Separator className="my-4" />

            {/* --- Social Links --- */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Social Links</h3>
              <FormField
                control={form.control}
                name="socialLinks.github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/username" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialLinks.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/username" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full mt-6" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
