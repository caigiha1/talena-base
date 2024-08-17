import { PageLink } from "@/constants";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Starter from "@/pages/starter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PageLink.ROOT} element={<Starter />} />
        {/* <Route path={PageLink.COMMING_SOON} element={<CommingSoon />} />
        <Route path={PageLink.AUTH_LOGIN} element={<Login />} />
        <Route path={PageLink.DASHBOARD} element={<Overview />} />
        <Route path={PageLink.AUTH_SIGNUP} element={<SignUp />} />
        <Route path={PageLink.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PageLink.UPDATE_PASSWORD} element={<UpdatePassword />} />
        <Route path={PageLink.WORKSPACE} element={<WorkSpace />} />
        <Route path={PageLink.JOINWORKSPACE} element={<JoinWorkSpace />} />
        <Route path={PageLink.CREATEWORKSPACE} element={<CreateWorkSpace />} />
        <Route path={PageLink.JOB_APPLICATION} element={<JobApplication />} />
        <Route path={PageLink.CAMPAIGNS} element={<Campaigns />} />
        <Route
          path={PageLink.CAMPAIGNS_DETAIL}
          element={<CampaignsDetailPage />}
        />
        <Route
          path={PageLink.HIRING_CANDIDATES}
          element={<HiringCandidates />}
        />
        <Route
          path={PageLink.JOB_DESCRIPTION_VIEW}
          element={<JDDetailPage />}
        />
        <Route
          path={PageLink.JOB_DESCRIPTION_PREVIEW}
          element={<JobDescriptionPreview />}
        />
        <Route
          path={PageLink.JOB_APPLICATION_PREVIEW}
          element={<JobApplicationPreview />}
        />
        <Route
          path={PageLink.JOB_DESCRIPTION_FORM}
          element={<JobDescriptionForm />}
        />
        <Route
          path={`${PageLink.USER_MANAGEMENT}/*`}
          element={<UserManageMent />}
        />
        <Route path={PageLink.TALENT_POOL} element={<TalentPoolPage />} />
        <Route
          path={PageLink.JOB_DESCRIPTION}
          element={<JobDescriptionPage />}
        />
        <Route
          path={PageLink.EDIT_TALENT_POOL}
          element={<TalentPoolDetailPage />}
        /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
