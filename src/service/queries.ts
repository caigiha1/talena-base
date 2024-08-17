import { Talents } from "@/components/table/data/schema.ts";
import api from "@/service/api.ts";
import {
  IUser,
  QueryUser,
  TalentSchema,
  CommentType,
  RootComments,
  RootMe,
  IDepartment,
  QueryDepartment,
  QueryCvPool,
  ValidateEmail,
  QueryJd,
  IJd,
  JobDescriptionForm,
  QueryCreateJD,
  CreateJobFormValues,
  jd_ID,
  QueryCreateCampaigns,
  QueryCampaign,
  ICampaign,
  Campaign,
  QueryHP,
  HiringPosition,
  cp_ID,
  QueryCreateHP,
} from "@/type";

export const CampaignQueries = {
  listCampaign: async ({
    page,
    pagesize,
    workspace_id,
    state,
    year,
    quarter,
    query_str,
  }: QueryCampaign) => {
    let url = `/campaigns?page=${page}&pagesize=${pagesize}`;
    if (workspace_id) {
      url += `&workspace_id=${workspace_id}`;
    }
    if (state) {
      url += `&state=${state}`;
    }
    if (year && quarter) {
      url += `&year=${year}&quarter=${quarter}`;
    }
    if (query_str) {
      url += `&query_str=${query_str}`;
    }
    const response = await api.get<ICampaign>(url);
    if (response.status !== 200) {
      throw new Error("Error fetching campaign");
    }
    return response.data;
  },
  getCampaignDetails: async (campaign_id: string) => {
    const response = await api.get<Campaign>(`/campaigns/${campaign_id}`);
    if (response.status !== 200) {
      throw new Error("Error fetching campaign");
    }
    return response.data;
  },
  updateStateCampaign: async (campaign_id: string | undefined) => {
    const response = await api.put<Campaign>(
      `/campaigns/${campaign_id}/update_state`,
      campaign_id,
    );
    if (response.status !== 200) {
      throw new Error("Error update state campaign");
    }
    return response.data;
  },
  deleteCampaign: async ({ campaign_ids }: { campaign_ids: string[] }) => {
    let url = `/campaigns?`;
    campaign_ids.forEach((campaign_id) => {
      url += `campaign_ids=${campaign_id}&`;
    });

    const response = await api.delete(url);

    if (response.status !== 200) {
      throw new Error("Error remove campaign");
    }
    return response.data;
  },
  duplicateCampaign: async (body: cp_ID) => {
    const url = `/campaigns/duplicate`;

    const response = await api.post(url, body);

    if (response.status !== 200) {
      throw new Error("Error duplicate campaign");
    }
    return response.data;
  },
  createCampaigns: async ({
    title,
    end_date,
    leads_emails,
    start_date,
    members_emails,
    description,
  }: QueryCreateCampaigns) => {
    const response = await api.post<QueryCreateCampaigns>("/campaigns", {
      title,
      end_date,
      leads_emails,
      start_date,
      members_emails,
      description,
    });
    if (response.status !== 200) {
      throw new Error("Error post job description");
    }
    return response.data;
  },
  updateCampaign: async ({
    id,
    title,
    end_date,
    leads_emails,
    start_date,
    members_emails,
    description,
  }: QueryCreateCampaigns) => {
    const response = await api.put<QueryCreateCampaigns>(`/campaigns/${id}`, {
      title,
      end_date,
      leads_emails,
      start_date,
      members_emails,
      description,
    });
    if (response.status !== 200) {
      throw new Error("Error post update campaign");
    }
    return response.data;
  },
};

export const hiringPositionQueries = {
  listHiringPosition: async ({ page, pagesize, q = "", state, campaign_id }: QueryHP) => {
    let url = `/hiring_positions?page=${page}&pagesize=${pagesize}&campaign_id=${campaign_id}`;
    if (q) {
      url += `&q=${q}`;
    }
    if (state) {
      url += `&state=${state}`;
    }
    const response = await api.get<HiringPosition>(url);
    if (response.status !== 200) {
      throw new Error("Error fetching hiring position");
    }
    return response.data;
  },
  createHiringPosition: async ({
    name,
    campaign_id,
    jd_id,
    hiring_departments,
    recruiters_ids,
  }:QueryCreateHP) => {
    const response = await api.post<QueryCreateHP>(`/hiring_positions`, {
      name,
      campaign_id,
      jd_id,
      hiring_departments,
      recruiters_ids,
    })
    if (response.status !== 200) {
      throw new Error("Error post hiring position");
    }
    return response.data;
  }
};

export const JdsQueries = {
  listJd: async ({
    page,
    pagesize,
    q = "",
    campains = [],
    start_date = "",
    end_date = "",
  }: QueryJd) => {
    let url = `/job_description?page=${page}&pagesize=${pagesize}&query_str=${q}`;
    if (start_date) {
      url += `&start_date=${start_date}`;
    }
    if (end_date) {
      url += `&end_date=${end_date}`;
    }
    campains.forEach((campain) => {
      url += `&campains=${campain}`;
    });
    const response = await api.get<IJd>(url);
    if (response.status !== 200) {
      throw new Error("Error fetching users");
    }
    return response.data;
  },
  getJDDetails: async (id: string) => {
    const response = await api.get<JobDescriptionForm>(
      `/job_description/${id}`,
    );
    if (response.status !== 200) {
      throw new Error("Error fetching job description");
    }
    return response.data;
  },
  deleteJD: async ({ jd_ids }: { jd_ids: string[] }) => {
    let url = `/job_description?`;
    jd_ids.forEach((jd_id) => {
      url += `jd_ids=${jd_id}&`;
    });

    const response = await api.delete(url);

    if (response.status !== 200) {
      throw new Error("Error remove jd");
    }
    return response.data;
  },
  getRewriteContent: async ({ command = "CORRECT_GRAMMAR", text = "" }) => {
    const response = await api.post<string>("/job_description/rewrite", {
      command,
      text,
    });
    if (response.status !== 200) {
      throw new Error("Error rewriting job description");
    }
    return response.data;
  },
  duplicateJD: async (body: jd_ID) => {
    const response = await api.post(`/job_description/duplicate`, body);
    if (response.status !== 200) {
      throw new Error("Error duplicate job description");
    }
    return response.data;
  },
  updateJD: async (body: QueryCreateJD) => {
    const response = await api.put<JobDescriptionForm>(
      `/job_description/${body.id}`,
      body,
    );
    if (response.status !== 200) {
      throw new Error("Error update job description");
    }
    return response.data;
  },
};

export const usersQueries = {
  getMe: async () => {
    const response = await api.get<RootMe>("/auth/me");
    if (response.status !== 200) {
      throw new Error("Error fetching cv_pool");
    }
    return response.data;
  },
  listUsers: async ({
    page,
    pagesize,
    q = "",
    department_ids = [],
    roles = [],
    ordering,
  }: QueryUser) => {
    let url = `/users?page=${page}&pagesize=${pagesize}&q=${q}`;
    department_ids.forEach((department_id) => {
      url += `&department_ids=${department_id}`;
    });
    roles.forEach((role: string) => {
      url += `&role=${role}`;
    });
    if (ordering) {
      url += `&ordering=${ordering}`;
    };

    const response = await api.get<IUser>(url);
    if (response.status !== 200) {
      throw new Error("Error fetching users");
    }
    return response.data;
  },
  deleteUser: async ({ user_ids }: { user_ids: string[] }) => {
    let url = `/workspaces/members?`;
    user_ids.forEach((user_id) => {
      url += `user_ids=${user_id}&`;
    });

    const response = await api.delete(url);
    if (response.status !== 200) {
      throw new Error("Error fetching cv_pool");
    }
    return response.data;
  },
  deleteWorkspaceMember: async ({ user_ids }: { user_ids: string[] }) => {
    let url = `/workspaces/members?`;
    user_ids.forEach((user_id) => {
      url += `user_ids=${user_id}&`;
    });

    const response = await api.delete(url);
    if (response.status !== 200) {
      throw new Error("Error remove member");
    }
    return response.data;
  },
  validateMember: async (body: ValidateEmail) => {
    const response = await api.post(`/users/validations`, body);
    if (response.status !== 200) {
      throw new Error("Error validate member");
    }
    return response.data;
  },
};
export const useGetConversation = {
  useGetConversationId: async (cvId: string = "", botType: string = "") => {
    let url;
    if (botType === "TEXT2SQL") {
      url = `/conversations?bot_type=${botType}`;
    } else if (botType === "CV_BOT") {
      url = `/conversations?bot_type=${botType}&knowledge_id=${cvId}`;
    } else {
      url = `/conversations?bot_type=${botType}&knowledge_id=${cvId}`;
    }
    const response = await api.get<any>(url);

    if (response.status !== 200) {
      throw new Error("Error fetching ConversationId");
    }
    return response.data;
  },
};

export const departmentsQueries = {
  getAllDepartments: async ({ page, pagesize, q = "" }: QueryDepartment) => {
    const response = await api.get<IDepartment>(
      `/departments/details?page=${page}&pagesize=${pagesize}&q=${q}`,
    );

    if (response.status !== 200) {
      throw new Error("Error fetching users");
    }
    return response.data;
  },
};

export const cvPoolQueries = {
  getAllCv: async ({
    page,
    pagesize,
    workspace_id,
    query_str,
    state = "DONE",
    gpa_min,
    gpa_max,
    level,
    ordering,
    position,
    skills,
    university,
    year_of_exp_max,
    year_of_exp_min,
    language,
  }: QueryCvPool) => {
    let url = `/cv_pool?page=${page}&pagesize=${pagesize}&state=${state}`;
    workspace_id?.forEach((w) => {
      url += `&workspace_id=${w}`;
    });
    if (ordering) {
      url += `&ordering=${ordering}`;
    };
    language?.forEach((language) => {
      url += `&language=${language}`;
    });
    level?.forEach((level) => {
      url += `&level=${level}`;
    });
    position?.forEach((position) => {
      url += `&position=${position}`;
    });
    university?.forEach((university) => {
      url += `&university=${university}`;
    });
    skills?.forEach((skill) => {
      url += `&skills=${skill}`;
    });
    if (query_str) {
      url += `&query_str=${query_str}`;
    }
    if (state) {
      url += `&state=${state}`;
    }
    if (gpa_min) {
      url += `&gpa_min=${gpa_min}`;
    }
    if (gpa_max) {
      url += `&gpa_max=${gpa_max}`;
    }
    if (year_of_exp_max) {
      url += `&year_of_exp_max=${year_of_exp_max}`;
    }
    if (year_of_exp_min) {
      url += `&year_of_exp_min=${year_of_exp_min}`;
    }
    const response = await api.get<TalentSchema>(url);
    if (response.status !== 200) {
      throw new Error("Error fetching cv_pool");
    }
    return response.data;
  },
  getDetailsCv: async (id: string) => {
    const response = await api.get<Talents>(`/cv_pool/${id}`);
    if (response.status !== 200) {
      throw new Error("Error fetching cv_pool");
    }
    return response.data;
  },
  postCv: async (body: FormData) => {
    const response = await api.post(`/cv_pool/upload`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status !== 200) {
      throw new Error("Error fetching comments");
    }
    return response.data;
  },
  getLinkCv: async ({ cv_url }: { cv_url?: string }) => {
    const response = await api.get<{ url: string }>(
      `/cv_pool/download/${cv_url}`,
    );
    if (response.status !== 200) {
      throw new Error("Error download cv");
    }
    return response.data;
  },
  downloadCV: async (cv_url?: string) => {
    const response = await api.get<any>(`/cv_pool/download/${cv_url}`, {
      responseType: "blob",
    });
    if (response.status !== 200) {
      throw new Error("Error download cv");
    }
    return response.data;
  },
  getAllComments: async (id: string) => {
    const response = await api.get<RootComments>(`/comments?cv_pool_id=${id}`);
    if (response.status !== 200) {
      throw new Error("Error fetching comments");
    }
    return response.data;
  },
  postComment: async (body: CommentType) => {
    const response = await api.post(`/comments`, body);
    if (response.status !== 200) {
      throw new Error("Error fetching comments");
    }
    return response.data;
  },
  deleteComment: async (id: string) => {
    const response = await api.delete(`/comments?id=${id}`);
    if (response.status !== 200) {
      throw new Error("Error fetching comments");
    }
    return response.data;
  },
  updateComment: async (body: CommentType) => {
    const response = await api.put(`/comments/${body.cv_pool_id}`, body);
    if (response.status !== 200) {
      throw new Error("Error fetching comments");
    }
    return response.data;
  },
  deleteCv: async (ids: string[]) => {
    let url = `/cv_pool?`;
    ids.forEach((id) => {
      url += `cv_ids=${id}&`;
    });
    const response = await api.delete(url);
    if (response.status !== 200) {
      throw new Error("Error delete CVs");
    }
    return response.data;
  },
  getPositionFilter: async () => {
    const response = await api.get<{ positions: string[] }>(
      "/cv_pool/details/positions",
    );
    if (response.status !== 200) {
      throw new Error("Error fetching positions");
    }
    return response.data;
  },
  getUniversityFilter: async () => {
    const response = await api.get<{ languages: string[] }>(
      "/cv_pool/details/languages",
    );
    if (response.status !== 200) {
      throw new Error("Error fetching languages");
    }
    return response.data;
  },
};

export const authQueries = {
  getMe: async () => {
    const response = await api.get<RootMe>("/auth/me");
    if (response.status !== 200) {
      throw new Error("Error fetching me info");
    }
    return response.data;
  },
};

export const jobDescriptionQueries = {
  generateJd: async (body: CreateJobFormValues) => {
    const response = await api.post("/job_description/generate", body);
    if (response.status !== 200) {
      throw new Error("Error post job description");
    }
    return response.data;
  },
  createJd: async (body: QueryCreateJD) => {
    const response = await api.post("/job_description", body);
    if (response.status !== 200) {
      throw new Error("Error post job description");
    }
    return response.data;
  },
};
