import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { Department } from "@/type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/ui/badge";

type Props = {
  readonly department: Department;
  readonly open: boolean;
  readonly setOpen: (open: boolean) => void;
};

export default function DepartmentDetails(props: Props) {
  const { department, open, setOpen } = props;

  const capitalize = (roles: string) => {
    let roleInitial = "";
    switch (roles) {
      case "ADMIN":
        roleInitial = "Admin";
        break;
      case "HIRING_MANAGER":
        roleInitial = "Hiring Manager";
        break;
      case "INTERVIEWER":
        roleInitial = "Interviewer";
        break;
      case "RECRUITER":
        roleInitial = "Recuiter";
        break;
      case "MEMBER":
        roleInitial = "Member";
        break;
      default:
        roleInitial = roles.charAt(0).toUpperCase();
        break;
    }
    return roleInitial;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} defaultOpen={true}>
      <DialogContent className="bg-white border-none" hideCloseButton={false}>
        <DialogTitle className="text-lightGrey-900 pt-4">
          {department.name}
        </DialogTitle>
        <div className="rounded-xl border border-meta-9">
          <Table style={{ maxHeight: "calc(5 * 3rem)", overflowY: "auto" }}>
            <TableHeader className="bg-lightGrey-100">
              <TableRow>
                <TableHead className="w-[70%]">Name</TableHead>
                <TableHead className="w-[30%]">Roles</TableHead>
              </TableRow>
            </TableHeader>
            {department?.members_details.length ? (
              department?.members_details?.map((cell) => (
                <TableBody key={cell.id} className="bg-white border">
                  <TableRow
                    className={cn({
                      "border-b border-meta-9 cursor-pointer hover:bg-meta-9 bg-white":
                        true,
                    })}
                  >
                    <>
                      <TableCell key={cell.id} className="h-12">
                        {cell.first_name} {cell.last_name}
                      </TableCell>
                      <TableCell key={cell.id} className="h-12">
                        <Badge
                          className={cn({
                            "border-transparent bg-badge-green shadow hover:bg-badge-green/80 text-badgeText-green":
                              cell.role === "ADMIN",
                            "border-transparent bg-badge-blue shadow hover:bg-badge-blue/80 text-badgeText-blue":
                              cell.role === "HIRING_MANAGER",
                            "border-transparent bg-badge-orange shadow hover:bg-badge-orange/80 text-badgeText-orange":
                              cell.role === "INTERVIEWER",
                            "border-transparent bg-badge-pink shadow hover:bg-badge-pink/80 text-badgeText-pink":
                              cell.role === "RECRUITER",
                          })}
                        >
                          {capitalize(cell?.role)}
                        </Badge>
                      </TableCell>
                    </>
                  </TableRow>
                </TableBody>
              ))
            ) : (
              <TableBody className="text-center">
                <TableRow>
                  <TableCell>No results</TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
