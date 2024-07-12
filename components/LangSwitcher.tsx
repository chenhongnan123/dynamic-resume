"use client";
import {Select, SelectSection, SelectItem} from "@nextui-org/select";
import { useParams, useRouter, usePathname } from "next/navigation";

import { defaultLocale, localeNames } from "@/lib/i18n";

export const LangSwitcher = () => {
  const router = useRouter();
  const params = useParams();
  const pathName = usePathname();
  console.log(pathName, 'pathName');
  const lang = params?.lang;
  let langName = lang || defaultLocale;
  const handleSwitchLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!pathName) {
      router.push(`/${value}`);
      return;
    }
    const preLang = pathName.split('/')[1];
    const newPath = pathName.replace(`/${preLang}`, `/${value}`);
    router.push(newPath);
  };

  return <Select 
    defaultSelectedKeys={[`${langName}`]}
    variant={'bordered'}
    className="w-32" 
    onChange={handleSwitchLanguage}
  >
    {Object.keys(localeNames).map((key: string) => {
      const name = localeNames[key];
      return (
        <SelectItem className="cursor-pointer" key={key} value={key}>
          {name}
        </SelectItem>
      );
    })}
  </Select>
}