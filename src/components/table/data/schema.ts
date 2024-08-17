import { z } from "zod";

const departmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  total_hiring_manager: z.any(),
  total_interviewer: z.any(),
  total_member: z.any(),
  overall: z.any(),
  members_details: z.any().optional(),
});

export const workspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.string(),
  avatar: z.union([z.undefined(), z.string()]),
  department: departmentSchema,
  workspace: workspaceSchema,
  created_at: z.string(),
  updated_at: z.string(),
});

export const summarySchema = z.object({
  summary: z.string(),
  strengths: z.array(z.string()),
  potential_positions: z.array(z.string()),
});

export const talentSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  language: z.array(z.string()),
  level: z.string(),
  dob: z.string(),
  cv_size: z.number(),
  experiences: z.array(
    z.object({
      start_date: z.string(),
      end_date: z.string(),
      company: z.string(),
      position: z.string(),
      description: z.array(z.string()),
    })
  ),
  radar: z
    .object({
      skills: z.array(
        z.object({
          name: z.string(),
          score: z.number(),
          message: z.string(),
        })
      ),
    })
    .optional(),
  workspace_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  cv_fulltext: z.string(),
  skills: z.array(z.string()),
  state: z.string(),
  links: z.array(z.string()),
  cv_url: z.string(),
  full_text: z.string(),
  summary: summarySchema,
  certificates: z.array(
    z.object({ date: z.string(), name: z.string(), score: z.string() })
  ),
  educations: z.array(
    z.object({
      start_date: z.string(),
      end_date: z.string(),
      school_name: z.string(),
      cpa_gpa: z.number(),
      description: z.array(z.string()),
      major: z.string(),
      degree: z.string(),
      level: z.string(),
    })
  ),
  awards: z.array(z.object({ date: z.string(), name: z.string() })),
  year_of_exp: z.number(),
});

export const applicationQuestionSchema = z.object({
  is_required: z.boolean(),
  type: z.string(),
  question: z.string(),
  answers: z.array(z.string()),
});

export const applicationFormSchema = z.object({
  phone_number: z.string(),
  living_location: z.string(),
  year_experience: z.string(),
  cover_letter: z.string(),
  question_for_company: z.string(),
  additional_question: z.array(applicationQuestionSchema),
});

export const JobDescriptionSchema = z.object({
  id: z.string(),
  title: z.string(),
  name: z.string(),
  working_hour_from: z.string(),
  working_hour_to: z.string(),
  working_location: z.string(),
  salary_from: z.number(),
  salary_to: z.number(),
  currency: z.string(),
  employment_type: z.string(),
  employee_level: z.string(),
  introduction: z.string(),
  responsibilities: z.array(z.string()),
  requirements: z.array(z.string()),
  benefits: z.array(z.string()),
  description: z.string(),
  radar: z
    .object({
      skills: z.array(
        z.object({
          name: z.string(),
          score: z.number(),
        })
      ),
    })
    .optional(),
  owner: userSchema,
  status: z.string(),
  application_form: applicationFormSchema,
  created_at: z.string(),
  updated_at: z.string(),
});

export type Users = z.infer<typeof userSchema>;
export type Talents = z.infer<typeof talentSchema>;
export type Departments = z.infer<typeof departmentSchema>;
export type ApplicationQuestion = z.infer<typeof applicationQuestionSchema>;
export type ApplicationForm = z.infer<typeof applicationFormSchema>;
export type JobDescription = z.infer<typeof JobDescriptionSchema>;
