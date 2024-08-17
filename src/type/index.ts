import { Talents, Users } from "@/components/table/data/schema.ts";
import { z } from "zod";

export interface IButtonProps {
  title: string | undefined;
  onClick?: () => void;
  className?: string;
  link?: string;
  full?: boolean;
  size?: "small" | "medium" | "lager" | "extra";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  bg?: "danger" | "primary" | "secondary";
  classNameTitle?: string;
  icon?: any;
}
export interface IIconButtonProps {
  title?: string | undefined;
  onClick?: () => void;
  className?: string;
  link?: string;
  full?: boolean;
  size?: "small" | "medium" | "lager" | "extra";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  bg?: "danger" | "primary" | "secondary";
  classNameTitle?: string;
  icon: any;
  focusColor?: string;
}

export type UserSchema = {
  total: number;
  data: Users[];
};

export type DepartmentSchema = {
  total: number;
  data: Departments[];
};

export interface ITabs {
  link: string;
  title: string;
}
export interface ILocation {
  hash?: string;
  key?: string;
  pathname?: string;
  search?: string;
  state?: boolean | null;
}

export type WithId = {
  id: string;
};

export type WorkSpace = {
  name: string;
};

export type WorkSpaceSchema = {
  total: number;
  data: WorkSpace[];
};

export type IDepartment = {
  total: number;
  data: Departments[];
};

export type Departments = {
  id: string;
  name: string;
  members_details: MembersDetail[];
  created_at: string;
  updated_at: string;
};

export type MembersDetail = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar: string;
  department_info: DepartmentInfo;
};

export type DepartmentInfo = {
  id: string;
  name: string;
};

export type TalentSchema = {
  total: number;
  data: Talents[];
};

type Educations = {
  start: string;
  end: string;
  university: string;
  cpa_gpa: number;
  major: string;
  degree: string;
  level: string;
};

export type ArrayEducations = Educations[];

type Certificates = {
  date: string;
  name: string;
  description: string;
};

export type ArrayCertificates = Certificates[];

export type IUser = {
  total: number;
  data: DetailUser[];
};

export type DetailUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar: undefined | string;
  department: Departments;
  workspace: Workspace;
  created_at: string;
  updated_at: string;
};

export type CommentType = { cv_pool_id?: string; comment: string };

export type ValidateEmail = { email: string };

export type jd_ID = { jd_id: string };

export type cp_ID = { campaign_id: string };

export type campaign_ids = { campaign_ids: string[] };

export const LocalStorageKey = {
  accessToken: "accessToken",
  loginType: "loginType",
} as const;

export type RootComments = {
  data: DaumComments[];
};

export type DaumComments = {
  id: string;
  cv_pool_id: string;
  comment: string;
  created_at: string;
  updated_at: string;
  user: User;
};

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar: undefined | string;
  department_info: string[];
};

export type RootMe = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar: undefined | string;
  department: Department;
  workspace: Workspace;
  created_at: string;
  updated_at: string;
};

export type Department = {
  id: string;
  name: string;
  members_details: User[];
};

export type Workspace = {
  id: string;
  name: string;
};

export interface Message {
  id: number;
  text: string;
  is_answer: boolean;
  suggestions?: string[];
  is_end?: boolean;
}

export type QueryUser = Partial<{
  page: number;
  pagesize: number;
  q: string;
  ordering: string;
  department_ids: string[];
  roles: string[];
}>;
export type IJd = {
  total: number;
  data: JDDetail[];
};

export interface JDDetail {
  id: string;
  name: string;
  title: string;
  working_hour_from: string;
  working_hour_to: string;
  working_location: string;
  salary_from: number;
  salary_to: number;
  currency: string;
  employment_type: string;
  employee_level: string;
  introduction: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  description: string;
  radar: Radar;
  owner: User;
  status: string;
  application_form: ApplicationForm;
  created_at: string;
  updated_at: string;
  questions: string[];
}

export type Radar = Partial<{
  skills: Skill[];
}>;

export type Skill = {
  name: string;
  score: number;
  message: string;
};

export type QueryJd = Partial<{
  page: number;
  pagesize: number;
  q: string;
  campains: string[];
  start_date: string;
  end_date: string;
}>;

export type QueryHP = Partial<{
  page: number;
  pagesize: number;
  q: string;
  state: string;
  campaign_id: string;
}>;

export type QueryCampaign = Partial<{
  page: number;
  pagesize: number;
  workspace_id: string;
  state: string;
  year: number;
  quarter: number;
  query_str: string;
}>;

export type QueryCampaignID = Partial<{
  campaign_id: string;
}>;

export type QueryDepartment = Partial<{
  page: number;
  pagesize: number;
  q: string;
}>;

export type QueryCvPool = Partial<{
  page: number;
  pagesize: number;
  workspace_id: string[];
  query_str: string;
  state: string;
  position: string[];
  level: string[];
  language: string[];
  university: string[];
  skills: string[];
  year_of_exp_min: number;
  year_of_exp_max: number;
  gpa_min: number;
  gpa_max: number;
  ordering: string;
}>;

export type QueryUpdateUser = Partial<{
  user_id: string;
  first_name: string;
  last_name: string;
  department_id: string;
  role: string;
}>;

export type QueryInvitation = Partial<{
  user_emails: string[];
  department_id: string | undefined;
  role: string;
}>;

export type QueryCreateDepartment = Partial<{
  name: string;
  members_emails: string[];
}>;

export type QueryEditDepartment = Partial<{
  name: string;
  members_emails: string[];
  department_id: string;
}>;

export type AdditionalQuestion = Partial<{
  is_required: boolean;
  type: string;
  answers?: {
    option1: string;
  }[];
  options: string[];
  question: string;
}>;

export type ApplicationOption = Partial<"Optional" | "Required" | "Off">;

export type ApplicationForm = Partial<{
  id: string;
  jd_name: string;
  phone_number: ApplicationOption;
  living_location: ApplicationOption;
  year_experience: ApplicationOption;
  cover_letter: ApplicationOption;
  question_for_company: ApplicationOption;
  additional_question: AdditionalQuestion[];
  created_at: string;
  updated_at: string;
}>;

export type JobDescriptionForm = Partial<{
  id: number;
  name: string;
  title: string;
  working_hour_from: string;
  working_hour_to: string;
  working_location: string;
  salary_from: number;
  salary_to: number;
  currency: string;
  employment_type: string;
  employee_level: string;
  introduction: string;
  owner: User;
  radar: Radar;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  description: string;
  status: string;
  application_form: ApplicationForm;
  created_at: string;
  updated_at: string;
}>;
export type GeneratedJDType = {
  introduction: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
};

export const applicationSchema = z.any(
  z.array(
    z
      .object({
        id: z.string().optional(),
        question: z.string().optional(),
        question_type: z.string().optional(),
        is_required: z.boolean().optional(),
        answers: z.array(z.string()).optional(),
        isOpen: z.boolean().optional(),
        type: z.array(z.string()).optional(),
      })
      .optional()
  )
);

export const createJobSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(2, { message: "Job Description must be at least 2 characters." }),
  title: z
    .string()
    .min(2, { message: "Job title must be at least 2 characters." }),
  working_hour_from: z.string().optional(),
  working_hour_to: z.string().optional(),
  working_location: z.string().optional(),
  salary_from: z
    .number()
    .min(2, { message: "Salary must be at least 2 numbers." })
    .transform((v) => Number(v) || 0),
  salary_to: z
    .number()
    .transform((v) => Number(v) || 0)
    .optional(),
  currency: z.string().optional(),
  employment_type: z.string().optional(),
  employee_level: z.string().optional(),
  level: z.string().optional(),
  introduction: z.string().optional(),
  responsibilities: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  questions: applicationSchema.optional(),
  application_form: applicationSchema.optional(),
});

export type CreateJobFormValues = z.infer<typeof createJobSchema>;

export type QueryCreateJD = Partial<{
  id?: string;
  name: string;
  title: string;
  working_hour_from: string;
  working_hour_to: string;
  working_location: string;
  salary_from: number;
  salary_to: number;
  currency: string;
  employment_type: string;
  employee_level: string;
  introduction: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  description: string;
  radar?: Radar;
  application_form: ApplicationForm;
}>;

export type Options = {
  option1: string;
};

export type Question = {
  question: string;
  is_required: boolean;
  answers: Options[];
  isOpen: boolean;
  type?: string;
};

export type Answer = {
  option1: string;
};

export type CandidateStatistics = {
  totalApplied: number;
  totalScreening: number;
  totalInterviewing: number;
  totalAcceptOffer: number;
};

export type Campaign = {
  id: string;
  workspace_id: string;
  state: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  candidate_statistics: CandidateStatistics;
  kpi: number;
  created_at: string;
  updated_at: string;
  members: DetailUser[];
  leads: DetailUser[];
  members_emails?: string[];
};

export type ICampaign = {
  total: number;
  data: Campaign[];
};
export const RolesUser = {
  RECRUITER: "RECRUITER",
  RECRUITER_LEAD: "RECRUITER_LEAD",
} as const;

export const formCreateCampaignsSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, {
    message: "Campaigns name must be at least 2 characters.",
  }),
  description: z.string(),
  start_date: z.date({
    required_error: "A start date is required.",
  }),
  end_date: z
    .date({
      required_error: "A end date is required.",
    })
    .optional(),
  members_emails: z.array(
    z.string().min(1, {
      message: "Choose at least 1 member",
    })
  ),
  leads_emails: z.array(
    z.string().min(1, {
      message: "Leads email is required.",
    })
  ),
});

export const formUpdateCampaignsSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, {
    message: "Campaigns name must be at least 2 characters.",
  }),
  description: z.string(),
  start_date: z.date({
    required_error: "A start date is required.",
  }),
  end_date: z
    .date({
      required_error: "A end date is required.",
    })
    .or(z.undefined()),
  members_emails: z.any(),
  leads_emails: z.array(z.string().min(1)).optional(),
});

export type CreateCampaignType = z.infer<typeof formCreateCampaignsSchema>;
export type UpdateCampaignType = z.infer<typeof formUpdateCampaignsSchema>;

export const formCreateHiringPositionsSchema = z.object({
  name: z.string().min(2, {
    message: "Campaigns name must be at least 2 characters.",
  }),
  campaign_id: z.string(),
  jd_id: z.string(),
  recruiters_ids: z.array(
    z.string().min(1, {
      message: "Choose at least 1 member",
    })
  ),
  hiring_departments: z.array(
    z.object({
      department_id: z.string(),
      kpi: z.number().min(0, {
        message: "KPI must be a non-negative number.",
      }),
    })
  ),
});

export type QueryCreateCampaigns = {
  id?: string;
  workspace_id?: number;
  members_emails: string[];
  leads_emails: string[];
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
};

export type QueryCreateHP = {
  id?: string;
  name: string;
  campaign_id: string;
  jd_id: string;
  hiring_departments: HiringDepartment[];
  recruiters_ids: string[];
}

export type HiringDepartment = {
  department: Departments;
  kpi: number;
};

export type HiringPosition = {
  total: number;
  data: IHiringPosition[];
};

export type CandidateStatisticsHiring = {
  total_applied: number;
  total_screening: number;
  total_interviewing: number;
  total_offer_accepted: number;
  total_rejected: number;
  total_passed: number;
};

export type IHiringPosition = {
  id: string;
  name: string;
  campaign: Campaign;
  kpi: number;
  candidate_statistics: CandidateStatisticsHiring;
  job_description: JobDescriptionForm;
  hiring_departments: HiringDepartment[];
  recruiters: Users[];
  state: string;
  started_date: string;
  ended_date: string;
  created_at: string;
  updated_at: string;
};
