/**
 * Single source of truth for the portfolio. The page and the AI assistant both read from here.
 */

export const personalInfo = {
  name: "Sravani N",
  title: "Senior Java Full Stack Developer",
  headline: "I build reliable backend systems and the products on top of them.",
  summary:
    "Senior Java full stack developer with 6+ years of experience in insurance and finance. I design Spring Boot microservices and APIs, build Angular and React frontends, and care about the details that keep systems fast and dependable at scale. Lately I've been going deeper into event-driven architecture and applied AI.",
  aiSummary:
    "Sravani is a Senior Java Full Stack Developer with over 6 years of experience. She specializes in Java, Spring Boot, microservices, Angular, and React. She has a strong foundation in Data Structures and Algorithms, and has built robust solutions for enterprise domains like insurance and finance. She is also expanding her skills into event-driven systems (Kafka, RabbitMQ) and AI/ML with Python, RAG and Spring AI.",
  location: "United States",
  linkedin: "https://www.linkedin.com/in/sravani-n-417s987",
  github: "https://github.com/sravani551",
  email: "sravaninimmisetty1@gmail.com",
  siteUrl: "https://www.intelliforge.tech",
};

export const focusAreas = [
  "Spring Boot microservices & APIs",
  "Event-driven systems (Kafka, RabbitMQ)",
  "Angular & React frontends",
  "Applied AI: RAG, Spring AI",
];

export const skillCategories = [
  {
    name: "Backend",
    skills: ["Java", "Spring Boot", "Spring Cloud", "Microservices", "REST APIs", "GraphQL", "JAXB/XSLT"],
  },
  {
    name: "Messaging & Data",
    skills: ["Kafka", "RabbitMQ", "SQL Server", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    name: "Frontend",
    skills: ["Angular", "React", "TypeScript", "JavaScript", "Next.js", "HTML/CSS"],
  },
  {
    name: "Cloud & DevOps",
    skills: ["Microsoft Azure", "AWS", "Docker", "Jenkins", "GitHub Actions"],
  },
  {
    name: "AI & ML",
    skills: ["Python", "RAG", "Spring AI", "TensorFlow", "Scikit-learn"],
  },
  {
    name: "Engineering Practices",
    skills: ["System Design", "Data Structures & Algorithms", "Testing (JUnit, MockMvc)", "CI/CD"],
  },
];

export type Job = {
  title: string;
  company: string;
  industry: string;
  period: string;
  description: string;
  highlights: string[];
  tech: string[];
};

export const experience: Job[] = [
  {
    title: "Senior Software Engineer",
    company: "The Cincinnati Insurance Companies",
    industry: "Insurance",
    period: "Mar 2026 – Present",
    description: "Leading development of intelligent enterprise applications in the insurance domain.",
    highlights: [
      "Driving architectural decisions for robust backend systems.",
      "Optimizing query performance for large-scale data sets.",
      "Integrating modern tech stacks to improve platform reliability.",
    ],
    tech: ["Java", "Spring Boot", "React", "Azure"],
  },
  {
    title: "Senior Software Engineer",
    company: "Liberty Mutual Insurance",
    industry: "Insurance",
    period: "May 2025 – Feb 2026",
    description: "Built and optimized enterprise systems for financial and insurance operations.",
    highlights: [
      "Secured REST and GraphQL APIs for critical services.",
      "Applied indexing and pagination strategies to maintain high query performance.",
      "Processed complex XML data via JAXB and XSLT.",
    ],
    tech: ["Java", "Spring Boot", "Angular", "GraphQL", "SQL Server"],
  },
  {
    title: "Software Engineer",
    company: "Nextworld",
    industry: "Technology",
    period: "Feb 2025 – May 2025",
    description: "Developed and maintained full-stack software solutions.",
    highlights: [
      "Contributed to CI/CD pipelines using Jenkins and Docker.",
      "Utilized core DSA concepts for ranking and recommendation logic.",
      "Ensured efficient in-memory caching and rapid lookups.",
    ],
    tech: ["Java", "Spring Boot", "React", "Docker", "AWS"],
  },
  {
    title: "Software Engineer",
    company: "Wipro",
    industry: "Technology Consulting",
    period: "Jan 2020 – May 2023",
    description: "Started my professional journey building foundational backend services and integrations.",
    highlights: [
      "Developed backend logic optimized for growing data and traffic.",
      "Built and deployed scalable applications with a focus on clean engineering.",
      "Applied core data structures (hash maps, tree traversals, comparator-based sorting) to performance-sensitive code.",
    ],
    tech: ["Java", "Spring", "Angular", "PostgreSQL", "Jenkins"],
  },
];

export type Project = {
  title: string;
  repo: string;
  summary: string;
  highlights: string[];
  tech: string[];
};

const gh = (repo: string) => `https://github.com/sravani551/${repo}`;

export const featuredProjects: Project[] = [
  {
    title: "Event-Driven Order Pipeline",
    repo: gh("event-driven-order-pipeline"),
    summary:
      "Order processing system using Kafka for domain events and RabbitMQ for background tasks, built to stay correct under failures.",
    highlights: [
      "Transactional outbox: no lost or phantom events",
      "Idempotent consumers: exactly-once effects on at-least-once delivery",
      "Retry tiers and dead-letter queues, verified by an end-to-end CI test",
    ],
    tech: ["Python", "Kafka", "RabbitMQ", "PostgreSQL", "Docker"],
  },
  {
    title: "Spring Cloud Microservices",
    repo: gh("Microservice-example"),
    summary:
      "Service discovery, an API gateway and per-dependency circuit breakers, so one failing service degrades gracefully instead of taking the system down.",
    highlights: [
      "Eureka discovery with client-side load balancing",
      "Resilience4j breakers and timeouts on every remote call",
      "Docker Compose smoke test through the gateway in CI",
    ],
    tech: ["Java", "Spring Cloud", "Resilience4j", "Docker"],
  },
  {
    title: "Chat Service API",
    repo: gh("ChatApp"),
    summary:
      "One-to-one messaging API with accounts, conversations, read receipts and unread counts.",
    highlights: [
      "BCrypt-hashed passwords; DTO responses only",
      "Database-enforced one chat per user pair",
      "RFC 9457 problem details and API integration tests",
    ],
    tech: ["Java", "Spring Boot", "JPA", "Bean Validation"],
  },
  {
    title: "Library Management System",
    repo: gh("LibraryManagementSystem"),
    summary:
      "Full-stack app for members, books and loans: a Spring Boot API with an Angular frontend.",
    highlights: [
      "Optimistic locking so the last copy can't be borrowed twice",
      "Concurrency test with eight competing threads",
      "OpenAPI docs; backend and frontend CI",
    ],
    tech: ["Spring Boot", "Angular", "JPA", "OpenAPI"],
  },
  {
    title: "Registration App",
    repo: gh("Registration-Form"),
    summary:
      "Angular 19 reactive form with a secured Spring Boot API, validation on both sides and file upload.",
    highlights: [
      "Server field errors mapped inline in the form",
      "Uploads stored under random keys with type and size limits",
      "Unit tests for both frontend and backend in CI",
    ],
    tech: ["Angular 19", "Spring Security", "MySQL", "TypeScript"],
  },
  {
    title: "RAG Chunking Comparison",
    repo: gh("Week03"),
    summary:
      "Retrieval experiment comparing fixed, structural and semantic chunking of the same document by hit@3.",
    highlights: [
      "pgvector with an HNSW index on Supabase",
      "Batched OpenAI embeddings",
      "Reproducible pipeline with a comparison report",
    ],
    tech: ["Python", "pgvector", "OpenAI", "RAG"],
  },
];

export const education = [
  {
    degree: "Master's degree, Computer and Information Systems Security",
    school: "Wilmington University",
  },
];

export const certifications = [
  { title: "Generative AI for Beginners", issuer: "Online certification" },
  { title: "Java Masterclass", issuer: "Online certification" },
];

export const stats = [
  { value: "6+", label: "Years of experience" },
  { value: String(experience.length), label: "Companies" },
  { value: "Insurance & Finance", label: "Domain focus" },
];
