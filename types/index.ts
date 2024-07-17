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
  nameEn?: string;
  nameCn?: string;
  position?: string,
  positionEn?: string;
  positionCn?: string;
  personalIntroductionEn?: string;
  personalIntroductionCn?: string;
  personalIntroduction?: string;
  jti?: string;
}

export interface Skill {
  id?: number;
  userid?: string;
  usersub?: string;
  username?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  nameEn?: string;
  nameCn?: string;
}