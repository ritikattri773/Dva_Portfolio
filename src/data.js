const base = import.meta.env.BASE_URL

export const contactInfo = {
  email: "ritik.attri2024@nst.rishihood.edu.in",
  phone: "6230298736",
  linkedin: "https://www.linkedin.com/in/ritik-atri-b44a50315/",
  github: "https://github.com/ritikattri773",
  resume: "https://github.com/ritikattri773"
}

export const profileInfo = {
  name: "Ritik Attri",
  username: "ritikattri773",
  avatar: "https://github.com/ritikattri773.png",
  bio: "Passionate full stack developer, always ready for new challenges and focused on building practical, user-friendly web applications.",
  location: "Newton School of Technology, Rishihood University"
}

export const skills = [
  "Python",
  "TypeScript",
  "JavaScript",
  "SQL",
  "MySQL",
  "Next JS",
  "React",
  "Node.js",
  "Express JS",
  "Prisma ORM",
  "PostgreSQL",
  "AWS",
  "Docker",
  "GenAI",
  "LangChain",
  "LangGraph",
  "Matplotlib",
  "NumPy",
  "Pandas",
  "Excel",
  "Git and Github",
  "MongoDB",
  "Tailwind CSS",
  "UI/UX"
]

const projects = [
  {
    name: "Sales Dashboard — Interactive Performance Metrics",
    description: "Built an interactive Sales Dashboard using Tableau to analyze, visualize, and track key sales performance metrics and trends across different regions and product categories.",
    image: `${base}Hollywood.png`,
    tags: ["Tableau", "Data Visualization", "Data Analytics", "KPI Tracking"],
    github: "https://github.com/IAmNishantSingh/sales-tableau-dashboard-project",
    live: ""
  },
  {
    name: "Credit Threshold Dashboard — Data & Retention Analytics",
    description: "Developed an interactive Credit Threshold Analysis dashboard using Google Sheets to analyze a 7-day snapshot of 15,000+ LinkedIn job postings in India.",
    image: `${base}CredRisk.png`,
    tags: ["Google Sheets", "Data Cleaning", "Data Analysis", "Dashboard Visualization"],
    github: "https://github.com/satyam-coder07/SectionA_Group3_Credit_Threshold_Analysis",
    live: ""
  }
]

export default projects
