import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { UserManagementIcon } from "@/lib/icons/userManagementIcon.tsx";
import { PageLink } from "@/constants";
import { Icons, TalentIcon } from "@/common/Icon.tsx";
import Version from "@/components/ui/version.tsx";
import { cn } from "@/lib/utils.ts";
import { classNames } from "@/utils/classNames";
import TalenaIcon from "@/assets/logo/talena-icon";
import TalenaFullIcon from "@/assets/logo/talena-full-icon";
import { RiArrowRightDoubleLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const SidebarV2 = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const testRef: any = useRef(null);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  //  auto close sidebar when hit large breakpoint
  const resizeWindow = () => {
    window.innerWidth <= 1024 ? setSidebarOpen(false) : setSidebarOpen(true);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    resizeWindow();
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <aside
      className={classNames(
        "flex absolute lg:static h-screen flex-col overflow-hidden bg-darkGrey-900 duration-300 ease-linear dark:bg-boxdark z-10",
        sidebarOpen ? "w-[212px]" : "lg:w-20 w-0"
      )}
      ref={testRef}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-5 pt-5.5 lg:pt-6.5">
        {sidebarOpen ? (
          <NavLink to={PageLink.ROOT}>
            <TalenaFullIcon className="mx-auto w-[96px] h-[28px]" />
          </NavLink>
        ) : (
          <NavLink to={PageLink.ROOT}>
            <TalenaIcon className="mx-auto w-[40px] h-[40px]" />
          </NavLink>
        )}
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 lg:mt-9 lg:px-2">
          {/* <!-- Menu Group --> */}
          <div className="flex flex-col gap-4">
            {sidebarOpen ? (
              <div className="text-[#8E99B5] text-[12px] font-medium leading-4">
                Recruitment
              </div>
            ) : (
              <Separator className="bg-darkGrey-600" />
            )}

            <div className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === PageLink.ROOT ||
                  pathname.includes(PageLink.DASHBOARD)
                }
              >
                {(handleClick) => {
                  return (
                    <NavLink
                      to={PageLink.COMMING_SOON}
                      className={cn({
                        "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-smm font-medium text-white duration-300 ease-in-out hover:bg-gray-100/20 dark:hover:bg-meta-4 cursor-pointer":
                          true,
                        "bg-lightGrey-600 dark:bg-meta-4 rounded-lg":
                          pathname === PageLink.DASHBOARD,
                        "px-0 justify-center": !sidebarOpen,
                      })}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                      }}
                    >
                      <Icons.OverviewIcon className="min-w-[24px] min-h-[24px]" />
                      {sidebarOpen && (
                        <p
                          className={cn({
                            "text-darkGrey-300 text-sm": true,
                            "text-white": pathname === PageLink.DASHBOARD,
                          })}
                        >
                          Overview
                        </p>
                      )}
                    </NavLink>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}
              <NavLink
                to={PageLink.TALENT_POOL}
                className={cn({
                  "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-smm font-medium text-white duration-300 ease-in-out hover:bg-gray-100/20 dark:hover:bg-meta-4 cursor-pointer":
                    true,
                  "bg-lightGrey-600 dark:bg-meta-4 rounded-lg":
                    pathname.startsWith(PageLink.TALENT_POOL),
                  "px-0 justify-center": !sidebarOpen,
                })}
              >
                {!pathname.startsWith(PageLink.TALENT_POOL) ? (
                  <TalentIcon className="min-w-[24px] min-h-[24px]" />
                ) : (
                  <Icons.TalentIconWhite className="min-w-[24px] min-h-[24px]" />
                )}
                {sidebarOpen && (
                  <p
                    className={cn({
                      "text-darkGrey-300 text-sm": true,
                      "text-white": pathname.startsWith(PageLink.TALENT_POOL),
                    })}
                  >
                    Talent Pool
                  </p>
                )}
              </NavLink>
              <div>
                <NavLink
                  to={PageLink.CAMPAIGNS}
                  className={cn({
                    "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-smm font-medium text-white duration-300 ease-in-out hover:bg-gray-100/20 dark:hover:bg-meta-4 cursor-pointer":
                      true,
                    "bg-lightGrey-600 dark:bg-meta-4 rounded-lg":
                      pathname.startsWith(PageLink.CAMPAIGNS),
                    "px-0 justify-center": !sidebarOpen,
                  })}
                >
                  {!pathname.startsWith(PageLink.CAMPAIGNS) ? (
                    <Icons.CampaignIcon className="min-w-[24px] min-h-[24px]" />
                  ) : (
                    <Icons.CampaignIconFill className="min-w-[24px] min-h-[24px]" />
                  )}
                  {sidebarOpen && (
                    <p
                      className={cn({
                        "text-darkGrey-300 text-sm": true,
                        "text-white": pathname.startsWith(PageLink.CAMPAIGNS),
                      })}
                    >
                      Campaigns
                    </p>
                  )}
                </NavLink>
              </div>
              <div>
                <NavLink
                  to={PageLink.JOB_DESCRIPTION}
                  className={cn({
                    "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-smm font-medium text-white duration-300 ease-in-out hover:bg-gray-100/20 dark:hover:bg-meta-4 cursor-pointer":
                      true,
                    "bg-lightGrey-600 dark:bg-meta-4 rounded-lg":
                      pathname.startsWith(PageLink.JOB_DESCRIPTION),
                    "px-0 justify-center": !sidebarOpen,
                  })}
                >
                  {!pathname.startsWith(PageLink.JOB_DESCRIPTION) ? (
                    <Icons.JobDescriptionNotFill className="min-w-[24px] min-h-[24px]" />
                  ) : (
                    <Icons.JobDescriptionFill className="min-w-[24px] min-h-[24px]" />
                  )}
                  {sidebarOpen && (
                    <p
                      className={cn({
                        "text-darkGrey-300 text-sm": true,
                        "text-white": pathname.startsWith(
                          PageLink.JOB_DESCRIPTION
                        ),
                      })}
                    >
                      Job description
                    </p>
                  )}
                </NavLink>
              </div>
            </div>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            {sidebarOpen ? (
              <div className="text-[#8E99B5]  text-[12px] font-medium leading-4">
                Account
              </div>
            ) : (
              <Separator className="bg-darkGrey-600" />
            )}

            <ul className="my-6 flex flex-col ">
              {/* <!-- Menu Item Ui Elements --> */}
              <NavLink
                to={PageLink.USER_MANAGEMENT}
                className={cn({
                  "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-smm font-medium text-white duration-300 ease-in-out hover:bg-gray-100/20 dark:hover:bg-meta-4 cursor-pointer":
                    true,
                  "bg-lightGrey-600 dark:bg-meta-4 rounded-lg":
                    pathname.startsWith(PageLink.USER_MANAGEMENT),
                  "px-0 justify-center": !sidebarOpen,
                })}
              >
                {!pathname.startsWith(PageLink.USER_MANAGEMENT) ? (
                  <UserManagementIcon className="min-w-[24px] min-h-[24px]" />
                ) : (
                  <Icons.UserManagerIcon className="min-w-[24px] min-h-[24px]" />
                )}
                {sidebarOpen && (
                  <p
                    className={cn({
                      "text-darkGrey-300 text-sm": true,
                      "text-white": pathname.startsWith(
                        PageLink.USER_MANAGEMENT
                      ),
                    })}
                  >
                    User Management
                  </p>
                )}
              </NavLink>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
      <div className="mt-auto mb-2">
        <div className="grid grid-cols-2">
          <div className="flex text-darkGrey-300 ml-2">
            {sidebarOpen && <Version />}
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={handleSidebarToggle}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              className="mr-6 bg-[#1E293B] border-none max-w-[32px] max-h-[32px]"
            >
              <RiArrowRightDoubleLine
                className={cn({
                  "text-darkGrey-400 min-w-[24px] min-h-[24px]": true,
                  "rotate-180": sidebarOpen,
                })}
              />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarV2;
