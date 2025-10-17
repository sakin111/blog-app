"use client";

import React, { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Mail, Briefcase, ExternalLink } from "lucide-react";
import Image from "next/image";
import { MyProfile } from "@/action/useProfile";




const About: FC = () => {

  const {data, isLoading} = MyProfile()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="h-32 bg-gradient-to-r from-violet-500 to-purple-600 animate-pulse" />
            <CardContent className="p-8 space-y-6">
              <div className="flex flex-col items-center -mt-20">
                <Skeleton className="h-32 w-32 rounded-full border-4 border-white dark:border-slate-900" />
                <Skeleton className="h-8 w-48 mt-4" />
                <Skeleton className="h-4 w-64 mt-2" />
              </div>
              <div className="space-y-4 mt-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8 text-center border-slate-200 dark:border-slate-800 shadow-xl">
          <CardContent>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              No profile found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-xl">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />
          
          <CardContent className="p-6 sm:p-8">
            {/* Profile Picture & Basic Info */}
            <div className="flex flex-col items-center -mt-20 mb-8">
              <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 shadow-lg overflow-hidden bg-gradient-to-br from-violet-400 to-purple-600">
                <Image
                  src={
                    data.profileUrl ||
                    "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                  }
                  alt={data.name || "Profile Picture"}
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
              </div>
              
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">
                {data.name || "Anonymous User"}
              </h1>
              
              <div className="flex items-center gap-2 mt-2 text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{data.email}</span>
              </div>
            </div>

            {/* Bio Section */}
            {data.bio && (
              <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 text-center font-sans">
                  {data.bio || "No bio available."}
                </p>
              </div>
            )}

            {/* Location */}
            {data.location && (
              <div className="flex items-center gap-3 mb-6 text-slate-700 dark:text-slate-300">
                <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Location
                  </p>
                  <p className="font-medium">{data.location}</p>
                </div>
              </div>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      className="bg-gradient-to-r from-gray-500 to-black  border-0 px-3 py-1 hover: text-white transition-all"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {data.experience && (
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Experience
                  </h3>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono">
                    {JSON.stringify(data.experience, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Social Links */}
            {data.socialLinks && Object.keys(data.socialLinks).length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                  Connect
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(data.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-violet-500 dark:hover:border-violet-500 hover:shadow-md transition-all group"
                    >
                      <span className="font-medium text-slate-700 dark:text-slate-300 capitalize">
                        {platform}
                      </span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-violet-500 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;