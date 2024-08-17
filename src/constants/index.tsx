import {
  ActiveBadge,
  ActiveIcon,
  ClosedBadge,
  DraftBadge,
  DraftIcon,
  EndedBadge,
  EndedIcon,
  OpenningBadge,
} from "@/common/Icon";

export const PageLink = {
  ROOT: "/",
  OVERVIEW: "/overview",
  JOB_DESCRIPTION: "/job-description",
  CAMPAIGNS: "/campaigns",
  MY_ACCOUNT: "/my-account",
  RECRUITERS: "/recruiters",
  DASHBOARD: "/dashboard",
  AUTH_LOGIN: "/auth/login",
  USER_MANAGEMENT: "/user-manage",
  EDIT_USER_MANAGEMENT: "/user-manage/:id/edit",
  DEPARTMENT_LIST: "/user-manage/department-list",
  AUTH_SIGNUP: "/auth/sign-up",
  FORGOT_PASSWORD: "/auth/forgot-password",
  UPDATE_PASSWORD: "/auth/update-password",
  WORKSPACE: "/workspace",
  JOINWORKSPACE: "/workspace/join-workspace",
  CREATEWORKSPACE: "/workspace/create-workspace",
  TALENT_POOL: "/talent",
  EDIT_TALENT_POOL: "/talent/:id/edit",
  COMMING_SOON: "/comming-soon",
  JOB_DESCRIPTION_FORM: "/job-description/view/:jdID",
  JOB_DESCRIPTION_VIEW: "/job-description/detail/:jdID",
  JOB_APPLICATION: "/job-application/view/:jdID",
  JOB_APPLICATION_PREVIEW: "/job-application/preview",
  JOB_DESCRIPTION_PREVIEW: "/job-description/preview",
  CAMPAIGNS_DETAIL: "/campaigns/detail/:cpID",
  HIRING_CANDIDATES: "/campaigns/hiring-positions/:hpID/candidates",
};

export const LANG_SIDEBAR = {
  overView: "Overview",
  jobDescription: "Job Description",
  camPaigns: "Campaigns",
  myAccount: "My Account",
  recruiters: "Recruiters",
};

export const VALIDATION_FILED = "This field is required";

export const MOCKUP_HEADER_USER_LIST = [
  "Departments Name",
  "Hiring Managers",
  "Interviews",
  "Members",
  "Overall",
  "Action",
];
export const AppConfig = {
  imageFileTypeWhiteList: ["image/png", "image/gif", "image/jpeg", "image/jpg"],
};

export const employmentLevels = [
  { value: "entry", label: "Entry Level" },
  { value: "intern", label: "Intern" },
  { value: "junior", label: "Junior" },
  { value: "middle", label: "Middle" },
  { value: "senior", label: "Senior" },
];

export const currency = [
  { value: "vnd", label: "VND" },
  { value: "usd", label: "USD" },
  { value: "cny", label: "CNY" },
];

export const employmentType = [
  { value: "fulltime", label: "Full Time" },
  { value: "parttime", label: "Part Time" },
  { value: "hybrid", label: "Hybrid" },
];

export const stateBadge = [
  { value: "ACTIVE", label: "Active", icon: ActiveBadge },
  { value: "DRAFT", label: "Draft", icon: DraftBadge },
  { value: "ENDED", label: "Ended", icon: EndedBadge },
];

export const stateIcon = [
  { value: "ACTIVE", label: "Active", icon: ActiveIcon },
  { value: "DRAFT", label: "Draft", icon: DraftIcon },
  { value: "ENDED", label: "Ended", icon: EndedIcon },
];

export const hiringBadge = [
  { value: "OPEN", label: "Open", icon: OpenningBadge },
  { value: "CLOSED", label: "Closed", icon: ClosedBadge },
];
