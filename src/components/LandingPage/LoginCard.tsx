"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight, Briefcase, User, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginCardProps {
  title: string;
  description: string;
  type: "allocator" | "employee";
  onClick: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ title, description, type }) => {
  const router = useRouter();

  const handleLogin = () => {
    if (type === "allocator") {
      router.push("/login/allocator");
    } else router.push("login/employee");
  };
  const features =
    type === "allocator"
      ? [
          "Resource optimization",
          "Team analytics",
          "Skills management",
          "Task allocation",
        ]
      : [
          "Profile customization",
          "Skill development",
          "Performance tracking",
          "Task management",
        ];

  return (
    <Card className="card-hover border-border w-full max-w-sm overflow-hidden border-2 transition-all duration-300">
      <div
        className={`h-2 w-full ${type === "allocator" ? "bg-primary" : "bg-secondary"}`}
      ></div>
      <CardHeader className="pb-4">
        <div
          className={`h-14 w-14 rounded-full ${type === "allocator" ? "bg-primary/10" : "bg-secondary/10"} mb-5 flex items-center justify-center`}
        >
          {type === "allocator" ? (
            <Briefcase
              className={`h-7 w-7 ${type === "allocator" ? "text-primary" : "text-secondary"}`}
            />
          ) : (
            <User
              className={`h-7 w-7 ${type === "employee" ? "text-primary" : "text-secondary"}`}
            />
          )}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-muted-foreground mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="mb-5 text-sm">
          {type === "allocator"
            ? "Manage projects, assign tasks, and optimize team resources with advanced analytics and visualization tools."
            : "View assigned tasks, update skills, track your progress, and communicate with team leads all in one place."}
        </p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-sm text-slate-700"
            >
              <CheckCircle
                className={`mr-2 h-4 w-4 ${type === "allocator" ? "text-primary" : "text-secondary"}`}
              />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4">
        <Button
          onClick={() => {
            handleLogin();
          }}
          className={`w-full cursor-pointer ${type === "allocator" ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90 text-black"}`}
        >
          Login as {type === "allocator" ? "Allocator" : "Employee"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
