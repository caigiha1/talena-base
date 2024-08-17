import { useState, ReactNode } from "react";
import Header from "./Header";
import SidebarV2 from "./SidebarV2/index";
import { Toaster } from "@/components/ui/toaster.tsx";
import { classNames } from "@/utils/classNames";

type Iprops = {
  children: ReactNode;
  pageName?: string;
  backButton?: boolean;
};

const DefaultLayout = ({ children, pageName, backButton }: Iprops) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark overflow-hidden w-[100vw] h-[100vh] bg-default relative">
      {/* backdrop when click on will close sidebar */}
      <div
        className={classNames(
          "absolute lg:hidden z-10 w-full h-full bg-transparent",
          sidebarOpen ? "block" : "hidden"
        )}
        onClick={() => setSidebarOpen(false)}
        onKeyDown={() => {}}
      ></div>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-full w-full max-h-full overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <div className="flex h-full items-center">
          <SidebarV2
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col max-h-full overflow-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header
            pageName={pageName}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            backButton={backButton}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className="flex-1 w-full overflow-auto mb-4">{children}</main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
      <Toaster />
    </div>
  );
};

export default DefaultLayout;
