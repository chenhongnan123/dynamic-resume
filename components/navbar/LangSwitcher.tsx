"use client";
import {Select, SelectItem} from "@nextui-org/select";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from 'react-i18next';

export const localeNames: any = {
  en: "🇺🇸 English",
  zh: "🇨🇳 中文",
};

export const LangSwitcher = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathName = usePathname();
  const langName = i18n.language;
  const handleSwitchLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!pathName) {
      router.push('/');
      return;
    }
    const preLang = pathName.split('/')[1];
    const newPath = pathName.replace(`/${preLang}`, `/${value}`);
    router.push(newPath);
  };

  return <Select 
    defaultSelectedKeys={[langName]}
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