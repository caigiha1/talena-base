import {
  ActiveIcon,
  AdminBadge,
  CheckboxBadge,
  DraftIcon,
  DropdownBadge,
  EndedIcon,
  HiringManagerBadge,
  InterviewerBadge,
  MultipleChoiceBadge,
  OpenQuestionBadge,
  RecruiterBadge,
  RecruiterLeadIcon,
  ShortAnswerBadge,
} from "@/common/Icon.tsx";

export const badges = [
  {
    value: "ADMIN",
    label: "Admin",
    icon: AdminBadge,
  },
  {
    value: "INTERVIEWER",
    label: "Interviewer",
    icon: InterviewerBadge,
  },
  {
    value: "HIRING_MANAGER",
    label: "Hiring Manager",
    icon: HiringManagerBadge,
  },
  {
    value: "RECRUITER",
    label: "Recruiter",
    icon: RecruiterBadge,
  },
  {
    value: "RECRUITER_LEAD",
    label: "Recruiter Lead",
    icon: RecruiterLeadIcon,
  },
];

export const campaignStateBadges = [
  {
    value: "ACTIVE",
    label: "Active",
    icon: ActiveIcon,
  },
  {
    value: "DRAFT",
    label: "Draft",
    icon: DraftIcon,
  },
  {
    value: "ENDED",
    label: "Ended",
    icon: EndedIcon,
  },
];

export const role = [
  { label: "Admin", value: "ADMIN" },
  { label: "Hiring Manager", value: "HIRING_MANAGER" },
  { label: "Interviewer", value: "INTERVIEWER" },
  { label: "Recruiter", value: "RECRUITER" },
  { label: "Recruiter Lead", value: "RECRUITER_LEAD" },
];

export const question_type_data = [
  { label: "Short Answer", value: "ShortAnswer", icon: ShortAnswerBadge },
  { label: "Open Question", value: "OpenQuestion", icon: OpenQuestionBadge },
  {
    label: "Multiple Choice",
    value: "MultipleChoice",
    icon: MultipleChoiceBadge,
  },
  { label: "Checkbox", value: "Checkbox", icon: CheckboxBadge },
  { label: "Dropdown", value: "Dropdown", icon: DropdownBadge },
];

export const level = [
  { label: "Senior", value: "Senior" },
  { label: "Mid-level", value: "Mid-level" },
  { label: "Junior", value: "Junior" },
  { label: "Intern", value: "Intern" },
  { label: "Fresher", value: "Fresher" },
];

export const languages = [
  { label: "English", value: "English" },
  { label: "French", value: "French" },
  { label: "Spanish", value: "Spanish" },
  { label: "German", value: "German" },
  { label: "Japanese", value: "Japanese" },
  { label: "Korean", value: "Korean" },
  { label: "Chinese", value: "Chinese" },
  { label: "Arabic", value: "Arabic" },
  { label: "Russian", value: "Russian" },
];

export const domains = [
  {
    label: "Technology and software development",
    value: "Technology and software development",
  },
  {
    label: "E-commerce and digital marketing",
    value: "E-commerce and digital marketing",
  },
  {
    label: "Healthcare and biotechnology",
    value: "Healthcare and biotechnology",
  },
  { label: "Finance and banking", value: "Finance and banking" },
  {
    label: "Renewable energy and sustainability",
    value: "Renewable energy and sustainability",
  },
  { label: "Tourism and hospitality", value: "Tourism and hospitality" },
  { label: "Education and training", value: "Education and training" },
  {
    label: "Logistics and supply chain management",
    value: "Logistics and supply chain management",
  },
];

export const locations = [
  { label: "An Giang", value: "An Giang" },
  { label: "Bà Rịa-Vũng Tàu", value: "Ba Ria - Vung Tau" },
  { label: "Bạc Liêu", value: "Bac Lieu" },
  { label: "Bắc Kạn", value: "Bac Kan" },
  { label: "Bắc Giang", value: "Bac Giang" },
  { label: "Bắc Ninh", value: "Bac Ninh" },
  { label: "Bến Tre", value: "Ben Tre" },
  { label: "Bình Dương", value: "Binh Duong" },
  { label: "Bình Định", value: "Binh Dinh" },
  { label: "Bình Phước", value: "Binh Phuoc" },
  { label: "Bình Thuận", value: "Binh Thuan" },
  { label: "Cà Mau", value: "Ca Mau" },
  { label: "Cao Bằng", value: "Cao Bang" },
  { label: "Cần Thơ", value: "Can Tho" },
  { label: "Đà Nẵng", value: "Da Nang" },
  { label: "Đắk Lắk", value: "Dak Lak" },
  { label: "Đắk Nông", value: "Dak Nong" },
  { label: "Điện Biên", value: "Dien Bien" },
  { label: "Đồng Nai", value: "Dong Nai" },
  { label: "Đồng Tháp", value: "Dong Thap" },
  { label: "Gia Lai", value: "Gia Lai" },
  { label: "Hà Giang", value: "Ha Giang" },
  { label: "Hà Nam", value: "Ha Nam" },
  { label: "Hà Nội", value: "Ha Noi" },
  { label: "Hà Tĩnh", value: "Ha Tinh" },
  { label: "Hải Dương", value: "Hai Duong" },
  { label: "Hải Phòng", value: "Hai Phong" },
  { label: "Hòa Bình", value: "Hoa Binh" },
  { label: "Hồ Chí Minh", value: "Ho Chi Minh" },
  { label: "Hậu Giang", value: "Hau Giang" },
  { label: "Hưng Yên", value: "Hung Yen" },
  { label: "Khánh Hòa", value: "Khanh Hoa" },
  { label: "Kiên Giang", value: "Kien Giang" },
  { label: "Kon Tum", value: "Kon Tum" },
  { label: "Lai Châu", value: "Lai Chau" },
  { label: "Lào Cai", value: "Lao Cai" },
  { label: "Lạng Sơn", value: "Lang Son" },
  { label: "Lâm Đồng", value: "Lam Dong" },
  { label: "Long An", value: "Long An" },
  { label: "Nam Định", value: "Nam Dinh" },
  { label: "Nghệ An", value: "Nghe An" },
  { label: "Ninh Bình", value: "Ninh Binh" },
  { label: "Ninh Thuận", value: "Ninh Thuan" },
  { label: "Phú Thọ", value: "Phu Tho" },
  { label: "Phú Yên", value: "Phu Yen" },
  { label: "Quảng Bình", value: "Quang Binh" },
  { label: "Quảng Nam", value: "Quang Nam" },
  { label: "Quảng Ngãi", value: "Quang Ngai" },
  { label: "Quảng Ninh", value: "Quang Ninh" },
  { label: "Quảng Trị", value: "Quang Tri" },
  { label: "Sóc Trăng", value: "Soc Trang" },
  { label: "Sơn La", value: "Son La" },
  { label: "Tây Ninh", value: "Tay Ninh" },
  { label: "Thái Bình", value: "Thai Binh" },
  { label: "Thái Nguyên", value: "Thai Nguyen" },
  { label: "Thanh Hóa", value: "Thanh Hoa" },
  { label: "Thừa Thiên – Huế", value: "Thua Thien Hue" },
  { label: "Tiền Giang", value: "Tien Giang" },
  { label: "Trà Vinh", value: "Tra Vinh" },
  { label: "Tuyên Quang", value: "Tuyen Quang" },
  { label: "Vĩnh Long", value: "Vinh Long" },
  { label: "Vĩnh Phúc", value: "Vinh Phuc" },
  { label: "Yên Bái", value: "Yen Bai" },
];
