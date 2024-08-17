import AddDepartment from "./add-department";
import { DataTableViewOptions } from "@/components/table/data-table-view-options.tsx";
import ImportCvPage from "@/components/table/talent-pool/import-cv-page.tsx";
import AddMember from "@/components/table/user-management/add-member.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button.tsx";
import { cn, exportToExcel, generateExcel } from "@/lib/utils.ts";
import {
  reset as resetDepart,
  selectQuery as selectQueryDepartment,
  setQuery as setQueryDepartment,
} from "@/redux/slices/department-manager-slice.ts";
import {
  reset as resetTalentPool,
  selectMinMaxYOE,
  selectQueryGpa,
  selectQueryLanguage,
  selectQueryLevel,
  selectQueryOrdering,
  selectQueryPosition,
  selectQuerySearch,
  selectQuerySkills,
  selectQueryUniversity,
  setQuerySearch,
} from "@/redux/slices/talent-pool-slice";
import {
  reset as resetUserMana,
  selectQueryOrderingUser,
  selectQuery as selectQueryUser,
  setQuery as setQueryUser,
  selectRoles,
  selectQueryDepartmentManager,
} from "@/redux/slices/user-manager-slice.ts";
import { useAppDispatch, useAppSelector } from "@/redux/store.ts";
import {
  useDeleteDepartment,
  useDeleteUser,
  useDeleteCV,
  useExtractCVPool,
} from "@/service/react-query-hooks.ts";
import { ILocation, WithId } from "@/type";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";
import { SearchIcon, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Icons } from "@/common/Icon.tsx";

type DataTableToolbarProps<TData> = Readonly<{
  table: Table<TData>;
  location: ILocation | undefined;
  currentTableRef: React.MutableRefObject<null> | null;
  onOfflineExport?: () => void;
}>;

export function DataTableToolbar<TData>({
  table,
  location,
  currentTableRef,
  onOfflineExport,
}: DataTableToolbarProps<TData>) {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const userQuery = useAppSelector(selectQueryUser);
  const departmentQuery = useAppSelector(selectQueryDepartment);
  const talentPoolQuery = useAppSelector(selectQuerySearch);
  const language = useAppSelector(selectQueryLanguage);
  const queryLevel = useAppSelector(selectQueryLevel);
  const position = useAppSelector(selectQueryPosition);
  const queryUniversity = useAppSelector(selectQueryUniversity);
  const queryMinMaxYoe = useAppSelector(selectMinMaxYOE);
  const querySkills = useAppSelector(selectQuerySkills);
  const queryGpa = useAppSelector(selectQueryGpa);
  const queryOrdering = useAppSelector(selectQueryOrdering);
  const queryOrderingUser = useAppSelector(selectQueryOrderingUser);
  const roles = useAppSelector(selectRoles);
  const departmentManager = useAppSelector(selectQueryDepartmentManager);
  const isDepartmentPage = pathname === "/user-manage/department-list";
  const isUserManagementPage = pathname === "/user-manage";
  const isTalentPage = pathname === "/talent";
  const isFiltered =
    (isUserManagementPage &&
      (table.getState().columnFilters.length > 0 ||
        userQuery?.length > 0 ||
        queryOrderingUser?.length > 0 ||
        roles?.length > 0 ||
        departmentManager?.length > 0)) ||
    (isDepartmentPage &&
      (table.getState().columnFilters.length > 0 ||
        departmentQuery?.length > 0)) ||
    (isTalentPage &&
      (table.getState().columnFilters.length > 0 ||
        talentPoolQuery?.length > 0 ||
        language?.length > 0 ||
        queryLevel?.length > 0 ||
        position?.length > 0 ||
        queryUniversity?.length > 0 ||
        queryMinMaxYoe?.length > 0 ||
        querySkills?.length > 0 ||
        queryGpa?.length > 0 ||
        queryOrdering?.length > 0));

  const isSelectedRow = table.getSelectedRowModel().rows.length > 0;
  const selectedRows = table
    .getSelectedRowModel()
    .rows.map(({ original }) => (original as WithId).id);
  const getDynamicName = (_s: string[]) => {
    switch (true) {
      case isTalentPage:
        return "CV";
      case isDepartmentPage:
        return "Department";
      case isUserManagementPage:
        return "User";
      default:
        return "user";
    }
  };

  const renderExportButton = () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {isTalentPage && isSelectedRow ? (
            <Button
              variant="outline"
              className="flex gap-2 min-w-[105px] font-semibold"
            >
              <Icons.ExcelIcon />
              Export {table.getFilteredSelectedRowModel().rows.length} CVs
            </Button>
          ) : isTalentPage && !isSelectedRow ? (
            <Button
              variant="outline"
              className="flex gap-2 min-w-[105px] font-semibold"
              disabled={isPending}
            >
              {isPending ? (
                <Icons.Spinner className="h-4 w-4 animate-spin" />
              ) : (
                <Icons.ExcelIcon />
              )}
              Export
            </Button>
          ) : (
            <div />
          )}
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white border-none">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>Export candidates.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none hover:bg-lightGrey-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="ml-auto hidden bg-primary-500 text-white hover:bg-opacity-60 hover:text-white focus:bg-primary-500 lg:flex"
              onClick={() => {
                if (isTalentPage && isSelectedRow) {
                  exportToExcel(table);
                  return;
                }
                if (isTalentPage && !isSelectedRow) {
                  if (onOfflineExport) {
                    onOfflineExport();
                    return;
                  }
                  mutate({
                    page: 1,
                    pagesize: 9999,
                    language: language,
                    level: queryLevel,
                    position: position,
                    university: queryUniversity,
                    year_of_exp_min: queryMinMaxYoe[0],
                    year_of_exp_max: queryMinMaxYoe[1],
                    skills: querySkills.map((skill) => skill),
                    query_str: talentPoolQuery,
                    gpa_min: queryGpa[0],
                    gpa_max: queryGpa[1],
                  });
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const handleQueryUserManager = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    dispatch(setQueryUser(value));
  };

  const handleQueryDepartment = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    dispatch(setQueryDepartment(value));
  };

  const handleQueryTalentPool = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    dispatch(setQuerySearch(value));
  };

  const handleResetFilter = () => {
    if (isUserManagementPage) {
      table.resetColumnFilters();
      dispatch(setQueryUser(""));
      dispatch(resetUserMana());
    } else if (isDepartmentPage) {
      table.resetColumnFilters();
      dispatch(setQueryDepartment(""));
      dispatch(resetDepart());
    } else if (isTalentPage) {
      table.resetColumnFilters();
      dispatch(resetTalentPool());
    }
    // Reset other state slices that are not specific to page type
  };

  const { mutate: mutationDeleteUser } = useDeleteUser({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const { mutate: mutationDeleteDepartments } = useDeleteDepartment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
  });

  const { mutate: mutationDeleteCVPools } = useDeleteCV({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cv"],
      });
    },
  });

  const { mutate, isPending } = useExtractCVPool({
    onSuccess: (data) => {
      generateExcel(data?.data, "table-data-full", [
        "experiences",
        "links",
        "awards",
        "radar",
        "summary",
        "workspace_id",
        "state",
        "cv_url",
        "id",
        "created_at",
        "updated_at",
        "cv_fulltext",
        "certificates",
      ]);
    },
  });

  const handleDeleteMultiple = (selectedRows: string[]) => {
    if (isUserManagementPage) {
      mutationDeleteUser({
        user_ids: selectedRows,
      });
    }
    if (isDepartmentPage) {
      mutationDeleteDepartments({
        department_ids: selectedRows,
      });
    }
    if (isTalentPage) {
      mutationDeleteCVPools({
        cv_ids: selectedRows,
      });
    }
    table.resetRowSelection();
  };

  return (
    <div className="flex items-center flex-wrap justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {isSelectedRow && (
          <>
            <div
              className="ml-2 flex flex-row items-center text-sm text-lightGrey-600 font-light cursor-pointer gap-2"
              onClick={() => table.toggleAllPageRowsSelected(false)}
            >
              <X className="h-4 w-4" />
              {table.getFilteredSelectedRowModel().rows.length} selected
            </div>
            {renderExportButton()}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="fonts-medium focus-visible:ring-slate-950 dark:ring-offset-slate-950 break-text dark:bg-slate-950 ml-auto hidden h-9 items-center justify-center rounded-md border border-slate-200  bg-danger-800 px-3  text-sm text-white ring-offset-white transition-colors hover:bg-red-400 hover:text-white hover:bg-opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-300 lg:flex border-none">
                  {isSelectedRow && selectedRows.length >= 1
                    ? `Delete ${getDynamicName(selectedRows)}`
                    : null}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white border-none">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your bots and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-none hover:bg-lightGrey-200">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="ml-auto  hidden bg-danger-800 text-white hover:bg-danger-800 hover:bg-opacity-60 hover:text-white focus:bg-danger-800 lg:flex"
                    onClick={() => handleDeleteMultiple(selectedRows)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
        {isUserManagementPage && !isSelectedRow && (
          <div
            className={cn({
              "flex h-9 w-[250px] items-center bg-white m-0.5 rounded-[10px] text-sm text-black transition-colors placeholder:text-slate-900 focus-visible:ring-offset-2 disabled:pointer-events-none hover:bg-slate-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 ring-1 ring-offset-0 ring-offset-lightGrey-200 ring-lightGrey-200":
                true,
            })}
          >
            <SearchIcon className="h-6 w-6 ml-2" />
            {location?.pathname === "/user-manage/department-list" ? (
              <input
                className="h-full w-full bg-transparent pl-2 focus:outline-none border-none focus:ring-0"
                placeholder="Search a member..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) => {
                  table.getColumn("name")?.setFilterValue(event.target.value);
                }}
              />
            ) : (
              <input
                className="h-full w-full border-none focus:outline-none focus:ring-0 bg-transparent pl-2"
                placeholder="Search a member..."
                value={userQuery ?? ""}
                onChange={handleQueryUserManager}
              />
            )}
          </div>
        )}

        {isDepartmentPage && !isSelectedRow && (
          <div
            className={cn({
              "flex h-9 m-2 w-[250px] items-center rounded-[10px] bg-white text-sm text-black transition-colors placeholder:text-slate-900 hover:bg-slate-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-1 ring-offset-0 ring-offset-lightGrey-200 ring-lightGrey-200":
                true,
            })}
          >
            <SearchIcon className="ml-2 h-6 w-6" />
            <input
              className="h-full w-full border-none bg-transparent pl-2 focus:outline-none focus:ring-0"
              placeholder="Search department name..."
              value={departmentQuery ?? ""}
              onChange={handleQueryDepartment}
            />
          </div>
        )}

        {isTalentPage && !isSelectedRow && (
          <>
            {!onOfflineExport ? (
              <div
                className={cn({
                  "md:flex h-9 w-[250px] m-0.5 hidden items-center rounded-md bg-white text-sm text-black transition-colors placeholder:text-slate-900 hover:bg-slate-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-1 ring-offset-0 ring-offset-lightGrey-200 ring-lightGrey-200":
                    true,
                })}
              >
                <SearchIcon className="ml-2 h-6 w-6" />
                <input
                  className="h-full w-full border-none bg-transparent pl-2 focus:outline-none focus:ring-0 placeholder:text-black"
                  placeholder="Search for..."
                  value={talentPoolQuery ?? ""}
                  onChange={handleQueryTalentPool}
                />
              </div>
            ) : (
              <div />
            )}
            <DataTableViewOptions
              table={table}
              currentTableRef={currentTableRef}
            />
          </>
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetFilter}
            className="h-8 px-2 lg:px-3 text-slate-500"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {location?.pathname === "/user-manage/department-list" &&
          !isSelectedRow && <AddDepartment />}

        {isUserManagementPage && !isSelectedRow && <AddMember />}

        {location?.pathname === "/user-manage/department-list" && ""}

        {isTalentPage && isSelectedRow && (
          <div
            className={cn({
              "sm:flex h-9 w-[250px] m-0.5 flex items-center rounded-[10px] bg-white text-sm text-black transition-colors placeholder:text-slate-900 hover:bg-slate-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-1 ring-offset-0 ring-offset-lightGrey-200 ring-lightGrey-200":
                true,
            })}
          >
            <SearchIcon className="ml-2 h-6 w-6" />
            <input
              className={cn({
                "h-full w-full border-none bg-transparent pl-2 focus:outline-none focus:ring-0 placeholder:text-black":
                  true,
                "flex ml-auto": !isSelectedRow,
              })}
              placeholder="Search for..."
              value={talentPoolQuery ?? ""}
              onChange={handleQueryTalentPool}
            />
          </div>
        )}

        {isDepartmentPage && isSelectedRow && (
          <div
            className={cn({
              "flex h-9 m-2 items-center rounded-[10px] w-[250px] bg-white text-sm text-black transition-colors placeholder:text-slate-900 hover:bg-slate-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-1 ring-offset-0 ring-offset-lightGrey-200 ring-lightGrey-200":
                true,
            })}
          >
            <SearchIcon className="ml-2 h-6 w-6" />
            <input
              className="h-full w-full border-none bg-transparent pl-2 focus:outline-none focus:ring-0"
              placeholder="Search department name..."
              value={departmentQuery ?? ""}
              onChange={handleQueryDepartment}
            />
          </div>
        )}

        {isUserManagementPage && isSelectedRow && (
          <div
            className={cn({
              "flex h-9 w-[250px] items-center m-0.5 rounded-[10px] bg-white text-sm text-black transition-colors placeholder:text-slate-900 hover:bg-slate-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-1 ring-offset-0 ring-offset-lightGrey-200 ring-lightGrey-200":
                true,
            })}
          >
            <SearchIcon className="ml-2 h-6 w-6" />
            {location?.pathname === "/user-manage/department-list" ? (
              <input
                className="h-full w-full border-none bg-transparent pl-2 focus:outline-none focus:ring-0"
                placeholder="Search a member..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) => {
                  table.getColumn("name")?.setFilterValue(event.target.value);
                }}
              />
            ) : (
              <input
                className="h-full w-full border-none bg-transparent pl-2 focus:outline-none focus:ring-0"
                placeholder="Search a member..."
                value={userQuery ?? ""}
                onChange={handleQueryUserManager}
              />
            )}
          </div>
        )}

        {isTalentPage && !isSelectedRow && (
          <>
            {renderExportButton()}
            <ImportCvPage />
          </>
        )}
      </div>
    </div>
  );
}
