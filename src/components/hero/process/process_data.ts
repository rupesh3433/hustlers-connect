// src/components/hero/process/processData.ts

export interface ProcessStep {
    id: string;
    number: string;
    title: string;
    description: string;
    x: number;
    y: number;
    color: string;
  }
  
  export const processSteps: ProcessStep[] = [
    {
      id: "understand",
      number: "1",
      title: "Understand",
      description:
        "Deep dive into your business, audience and growth opportunities",
      x: 300,
      y: 470,
      color: "#2563EB",
    },
    {
      id: "plan",
      number: "2",
      title: "Plan",
      description:
        "Strategic roadmap combining tech, creativity, and marketing",
      x: 550,
      y: 400,
      color: "#7C3AED",
    },
    {
      id: "execute",
      number: "3",
      title: "Execute",
      description:
        "Precise implementation across all digital channels",
      x: 850,
      y: 260,
      color: "#8B5CF6",
    },
    {
      id: "refine",
      number: "4",
      title: "Scale",
      description:
        "Continuous optimization for scalable growth",
      x: 1100,
      y: 120,
      color: "#EC4899",
    },
  ];