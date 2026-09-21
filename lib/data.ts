// ============================================================
// Portfolio Data — Replace placeholders with your actual info
// ============================================================

export const PERSONAL = {
  name: "Saran Siddarth",
  title: "AI Engineer & Full Stack Developer",
  location: "Coimbatore",
  email: "saransid23@gmail.com",
  resumeUrl: "https://delicate-sea-370.linkyhost.com",
  github: "https://github.com/saransid23",
  linkedin: "https://www.linkedin.com/in/saran-siddarth-s-b49662371?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  twitter: "https://twitter.com",
  available: true,
};

export const ABOUT = {
  description: [
    "I'm a passionate AI Engineer and Full Stack Developer who thrives at the intersection of artificial intelligence and modern web development.",
    "With expertise spanning from deep learning models to production grade web applications, I create intelligent digital experiences that push the boundaries of what's possible.",
    "I believe in writing clean, performant code and building products that make a real impact. Currently focused on building AI-powered solutions and scalable full-stack applications.",
  ],
  stats: [
    { label: "Projects Completed", value: "5+" },
    { label: "Technologies", value: "5+" },
  ],
};

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  github: string;
  liveUrl: string;
  image: string;
  color: string;
}

export const PROJECTS: Project[] = [
  {
    id: "tubemint",
    title: "Tubemint",
    description: "Self-Hosted YouTube Video & Audio Downloader",
    longDescription:
      "A self-hosted YouTube video inspector and downloader built with FastAPI, yt-dlp, and FFmpeg. Features video metadata extraction, up to 4K resolution detection, audio conversion (MP3/M4A), and an automated background file cleanup system.",
    techStack: ["FastAPI", "Python", "yt-dlp", "FFmpeg", "Next.js", "Tailwind CSS"],
    github: "https://github.com/saransid23/tubemint",
    liveUrl: "https://tubemint.vercel.app",
    image: "/projects/tubemint.jpg",
    color: "#FF3366",
  },
  {
    id: "spencer-ai",
    title: "Spencer AI Bot",
    description: "Voice-Enabled AI Technical Assistant & Engineer",
    longDescription:
      "A Python-based voice assistant engineered to think, reason, and solve problems like a technical consultant. Includes automated coding/debugging support, system design guidance, and persistent memory using LangChain, Whisper, and FAISS vector databases.",
    techStack: ["Python", "FastAPI", "LangChain", "Whisper", "FAISS", "MongoDB", "Flask"],
    github: "https://github.com/saransid23/Spencer-AI-bot",
    liveUrl: "#",
    image: "/projects/spencer_ai.jpg",
    color: "#A855F7",
  },
  {
    id: "importsense",
    title: "ImportSense AI",
    description: "AI Import Compliance & Landed Cost Calculator",
    longDescription:
      "An intelligent multi-agent import compliance platform that estimates customs duties, GST, shipping costs, and landed prices for international purchases using NLP, FAISS vector search, and live regulations.",
    techStack: [
      "React",
      "JavaScript",
      "FastAPI",
      "Sentence Transformers",
      "FAISS",
      "Multi-Agent AI",
    ],
    github: "https://github.com/saransid23/import-sense-AI",
    liveUrl: "https://import-sense-ai.vercel.app",
    image: "/projects/importsense.png",
    color: "#D9FF2F",
  },
  {
    id: "citycare",
    title: "CityCare",
    description: "Smart City Management & Citizen Service Platform",
    longDescription:
      "A smart city management platform enabling citizens to report issues like potholes, streetlights, and hazards. AI-based keyword detection prioritizes complaints for local authorities to accelerate resolution.",
    techStack: ["JavaScript", "Node.js", "Express", "MongoDB", "Socket.IO", "AI Analytics"],
    github: "https://github.com/saransid23/city-care",
    liveUrl: "#",
    image: "/projects/citycare.png",
    color: "#4ECDC4",
  },
  {
    id: "object-detection",
    title: "Object Detection System",
    description: "Real-Time Computer Vision Platform",
    longDescription:
      "A real-time computer vision platform built using YOLOv5 and TensorFlow capable of detecting and classifying objects with high accuracy and low latency from live video streams.",
    techStack: ["Python", "YOLOv5", "TensorFlow", "OpenCV", "Flask"],
    github: "https://github.com/saransid23/object-detection",
    liveUrl: "#",
    image: "/projects/objectdetection.png",
    color: "#FF6B35",
  },
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  techStack: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "AI & DS Intern",
    company: "PaceLab Technologies",
    period: "2025",
    description:
      "Worked on machine learning workflows, data preprocessing, model training, and computer vision concepts using Python. Gained practical experience in building AI solutions and applying data-driven techniques to real-world problems.",
    techStack: ["Python", "NumPy", "Pandas", "Scikit-learn", "OpenCV", "TensorFlow"],
  },

];
export const SKILLS_MARQUEE = [
  "React",
  "Java",
  "Python",
  "Node.js",
  "MongoDB",
  "Docker",
  "TensorFlow",
  "Git",
];
export const SKILLS_ORBIT = [
  "React",
  "Python",
  "Java",
  "Node",
  "AI",
  "ML",
  "SQL",
  "Docker",
];
export const SERVICES = [
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Crafting pixel-perfect, responsive interfaces with React, Next.js, and modern CSS. Focus on performance, accessibility, and delightful user experiences.",
    icon: "Monitor",
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    description:
      "End-to-end web application development from database design to deployment. Building scalable architectures with modern tech stacks.",
    icon: "Layers",
  },
  {
    id: "ai",
    title: "AI Solutions",
    description:
      "Designing and deploying intelligent systems using LLMs, multi-agent architectures, and custom AI pipelines for real-world applications.",
    icon: "Brain",
  },
  {
    id: "ml",
    title: "Machine Learning",
    description:
      "Building and training custom ML models for computer vision, NLP, and predictive analytics with production-grade deployment.",
    icon: "Cpu",
  },
  {
    id: "datascience",
    title: "Data Science",
    description:
      "Extracting meaningful insights from data using machine learning, statistical analysis, data visualization, and predictive modeling to solve real-world problems.",
    icon: "Database",
  },
  {
    id: "automation",
    title: "Automation",
    description:
      "Streamlining workflows with intelligent automation, CI/CD pipelines, testing frameworks, and DevOps best practices.",
    icon: "Zap",
  },
];
export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Alex Johnson",
    role: "CTO, TechStartup",
    content:
      "Exceptional work on our AI platform. The attention to detail and technical expertise was outstanding. Delivered ahead of schedule with production-ready code.",
    avatar: "/testimonials/avatar1.jpg",
  },
  {
    id: "t2",
    name: "Sarah Chen",
    role: "Product Manager, Enterprise Corp",
    content:
      "One of the most talented developers I've worked with. The ability to bridge AI/ML with beautiful frontend experiences is rare and incredibly valuable.",
    avatar: "/testimonials/avatar2.jpg",
  },
  {
    id: "t3",
    name: "Michael Park",
    role: "Founder, DesignLab",
    content:
      "The portfolio redesign exceeded all expectations. The animations, performance, and overall user experience were world-class. Highly recommended.",
    avatar: "/testimonials/avatar3.jpg",
  },
  {
    id: "t4",
    name: "Emily Roberts",
    role: "Engineering Lead, DataCo",
    content:
      "Brilliant problem solver with deep technical knowledge. Built our ML pipeline from scratch and integrated it seamlessly with our existing infrastructure.",
    avatar: "/testimonials/avatar4.jpg",
  },
];
export const ACHIEVEMENTS = [
  { label: "Projects", value: 5, suffix: "+" },
  { label: "Hackathons", value: 2, suffix: "+" },
  { label: "Technologies", value: 5, suffix: "+" },
  { label: "Certificates", value: 5, suffix: "+" },
];
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];
