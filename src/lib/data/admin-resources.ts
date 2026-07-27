import type { AdminResourceConfig } from "@/types";

export const adminResourceConfigs: AdminResourceConfig[] = [
  {
    resource: "education",
    label: "Education",
    titleKey: "degree",
    subtitleKey: "institution",
    fields: [
      { key: "degree", label: "Degree", type: "text", required: true },
      { key: "institution", label: "Institution", type: "text", required: true },
      { key: "cgpa", label: "CGPA / Score", type: "text", placeholder: "8.9 / 10" },
      { key: "startDate", label: "Start", type: "text", required: true, placeholder: "2021" },
      { key: "endDate", label: "End", type: "text", required: true, placeholder: "2025" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    resource: "experience",
    label: "Experience",
    titleKey: "role",
    subtitleKey: "company",
    fields: [
      { key: "role", label: "Role", type: "text", required: true },
      { key: "company", label: "Company", type: "text", required: true },
      { key: "companyLogo", label: "Company logo path", type: "text", placeholder: "/images/COMPANY_LOGO.png" },
      { key: "startDate", label: "Start", type: "text", required: true, placeholder: "May 2025" },
      { key: "endDate", label: "End", type: "text", required: true, placeholder: "Jul 2025" },
      {
        key: "responsibilities",
        label: "Responsibilities",
        type: "array",
        helperText: "One per line",
      },
      {
        key: "achievements",
        label: "Achievements",
        type: "array",
        helperText: "One per line",
      },
    ],
  },
  {
    resource: "achievements",
    label: "Achievements",
    titleKey: "title",
    subtitleKey: "issuer",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "issuer", label: "Issuer", type: "text" },
      {
        key: "category",
        label: "Category",
        type: "text",
        required: true,
        placeholder: "Certificate / Hackathon / Award / CP",
      },
      { key: "image", label: "Image path", type: "text", placeholder: "/images/CERTIFICATE_IMAGE.jpg" },
      { key: "date", label: "Date", type: "text", placeholder: "2025" },
      { key: "url", label: "Link (optional)", type: "text" },
    ],
  },
  
];
