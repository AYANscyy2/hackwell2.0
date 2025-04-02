"use client";
import React from "react";
// import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import LoginCard from "./LoginCard";
import {
  ArrowRight,
  CheckCircle,
  BarChart,
  Users,
  Cpu,
  BrainCircuit,
} from "lucide-react";
import { Button } from "../ui/button";
// import { useRouter } from "next/navigation";

export const LandingPageMain = () => {
  // const navigate = useRouter();

  const handleLogin = (type: "allocator" | "employee") => {
    console.log(`Login as ${type}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-20 md:px-10 lg:py-32">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 to-white"></div>
          <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          <div className="container mx-auto max-w-7xl">
            <div className="mx-auto mb-16 max-w-4xl text-center">
              <div className="bg-primary/10 text-primary mb-6 inline-block rounded-full px-3 py-1 text-sm font-semibold">
                Intelligent Resource Allocation
              </div>
              <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight md:text-5xl lg:text-6xl">
                Match the Right <span className="text-gradient">Tasks</span>{" "}
                with the Right <span className="text-gradient">People</span>
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-700 md:text-xl">
                Optimize resource allocation with our intelligent task-to-skill
                matching system. Increase productivity and employee
                satisfaction.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Request Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Login Options */}
            <div className="my-20 flex flex-col justify-center gap-8 md:flex-row md:gap-12">
              <LoginCard
                title="Allocator Portal"
                description="For project managers and team leads"
                type="allocator"
                onClick={() => handleLogin("allocator")}
              />
              <LoginCard
                title="Employee Portal"
                description="For team members and contributors"
                type="employee"
                onClick={() => handleLogin("employee")}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-slate-50 px-6 py-20 md:px-10">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <div className="bg-secondary/10 text-secondary mb-4 inline-block rounded-full px-3 py-1 text-sm font-semibold">
                Why Choose SkillSync
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Powerful Features for Modern Teams
              </h2>
              <p className="mx-auto max-w-2xl text-slate-700">
                Our platform helps organizations efficiently match tasks with
                the right people based on expertise, availability, and
                preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <BrainCircuit className="text-primary h-8 w-8" />,
                  title: "AI-Powered Matching",
                  description:
                    "Automatically match tasks to employees based on their skills, experience, and expertise using advanced algorithms.",
                },
                {
                  icon: <BarChart className="text-primary h-8 w-8" />,
                  title: "Resource Optimization",
                  description:
                    "Reduce time spent on manual task allocation and improve overall resource utilization with powerful analytics.",
                },
                {
                  icon: <Users className="text-primary h-8 w-8" />,
                  title: "Talent Discovery",
                  description:
                    "Identify hidden talent in your organization and leverage their skills effectively for better team performance.",
                },
                {
                  icon: <CheckCircle className="text-primary h-8 w-8" />,
                  title: "Employee Satisfaction",
                  description:
                    "Increase job satisfaction by aligning tasks with employee interests and development goals.",
                },
                {
                  icon: <Cpu className="text-primary h-8 w-8" />,
                  title: "Data-Driven Insights",
                  description:
                    "Gain valuable insights into team performance, skill gaps, and resource allocation with detailed reporting.",
                },
                {
                  icon: <ArrowRight className="text-primary h-8 w-8" />,
                  title: "Time Efficiency",
                  description:
                    "Save countless hours in the allocation process with intelligent automation and streamlined workflows.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="bg-primary/10 mb-5 flex h-14 w-14 items-center justify-center rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="from-primary/90 to-secondary/90 bg-gradient-to-br px-6 py-20 text-white md:px-10">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="mb-8 md:mb-0 md:max-w-2xl">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  Ready to transform your resource allocation?
                </h2>
                <p className="mb-0 text-lg text-white/90">
                  Join thousands of organizations that have improved
                  productivity and employee satisfaction with SkillSync.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-primary bg-white hover:bg-white/90"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// export default Index;
