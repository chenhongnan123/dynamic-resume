import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface UserInfo {
  id?: number;
  sub?: string;
  platform?: string;
  username?: string;
  name?: string;
  avatar?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
  name_en?: string;
  name_zh?: string;
  position?: string,
  position_en?: string;
  position_zh?: string;
  introduction?: string;
  introduction_en?: string;
  introduction_zh?: string;
  skills?: string;
  skills_en?: string;
  skills_zh?: string;
  hireLink?: string;
  fileName?: string;
  filePath?: string;
}

export interface ProjectExpType {
  id?: number;
  timestamp?: number;
  order: number;
  userid?: string;
  usersub?: string;
  username?: string;
  durationTime: number[] | string[] | string;
  technology_stack_en?: string[] | never[] | string;
  technology_stack_zh?: string[] | never[] | string;
  technology_stack?: string[] | never[] | string;
  company_name_en?: string;
  company_name_zh?: string;
  company_name?: string;
  details_en?: string;
  details_zh?: string;
  details?: string;
  fileName?: string;
  fileExtension?: string;
  fileSize?: string;
  filePath?: string;
  fileType?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface File {
  fileName?: string;
  fileExtension?: string;
  fileSize?: string;
  filePath?: string;
  fileType?: string;
  createdAt?: string;
  updatedAt?: string;
}