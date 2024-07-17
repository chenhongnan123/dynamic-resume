"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import React from "react";
import clsx from "clsx";
import { useParams, usePathname } from "next/navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { LiaAddressCard } from "react-icons/lia";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { LangSwitcher } from "./LangSwitcher";
import { defaultLocale, getDictionary } from "@/lib/i18n";
import { useContext, useState, useEffect } from 'react';
import { rootContext } from "@/components/RootProvider";
import { LoginAvatar } from './LoginAvatar'

const links = [
  {
    value: "personalIntroduction",
    href: "#PersonalIntroduction",
  },
  {
    value: "skills",
    href: "#Skills",
  },
  {
    value: "experience",
    href: "#WallOfLove",
  },
  {
    value: "hobby",
    href: "#hobby",
  },
];

export const Navbar = () => {
  const { userInfo, headerDict } = useContext(rootContext);
  const {
    iconLinks,
  } = siteConfig;
  const liStyles = "flex flex-col gap-2 text-sm font-medium text-inherit";
  const params = useParams();
  const pathName = usePathname();
  const isLoginPage = pathName?.includes("/login");
  const lang = params?.lang;
  const langName = (lang || defaultLocale) as string;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [headerDict, setHeaderDict] = useState<any>({});

  // useEffect(() => {
  //   async function init() {
  //     const dict = await getDictionary(langName);
  //     setHeaderDict(dict.header);
  //   }
  //   init()
  //   return () => {
  //   };
  // });
  

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Button
              isIconOnly
              variant="light"
            >
              <LiaAddressCard className="text-4xl"/>
            </Button>
            {!isLoginPage && <p className="hidden md:block font-bold text-inherit">{headerDict?.title}</p>}
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      
      {!isLoginPage && 
        <NavbarContent
        className="hidden md:flex"
        justify="center"
        >
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.value}>
                <Link
                  href={link.href}
                  aria-label={headerDict[link.value]}
                  title={headerDict[link.value]}
                  className={liStyles}
                >
                  {headerDict[link.value]}
                </Link>
              </li>
            ))}
          </ul>
        </NavbarContent>
      }

      {!isLoginPage && 
        <NavbarContent
          className="hidden md:flex"
          justify="end"
        >
            {/* <ul className="items-center gap-6 md:flex">
              {iconLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    aria-label={link.name}
                    title={link.name}
                    target="_blank"
                    className={liStyles}
                  >
                    {link.icon &&
                      React.createElement(link.icon, { className: "text-lg" })}
                  </Link>
                </li>
              ))}
              <li className="flex max-w-[24px] flex-col items-center justify-center text-inherit">
                <ThemeSwitch />
              </li>
            </ul> */}
            <NavbarItem>
              <ThemeSwitch />
            </NavbarItem>
            <NavbarItem>
              <LangSwitcher />
            </NavbarItem>
            <NavbarItem>
              <LoginAvatar userInfo={userInfo} langName={langName} liStyles={liStyles}/>
            </NavbarItem>
        </NavbarContent>
      }
      {!isLoginPage &&   
        <NavbarContent className="md:hidden" justify="end">
          <Button
            isIconOnly
            variant="light"
            onClick={() => setIsMenuOpen(true)}
          >
            <AiOutlineMenu className="text-2xl"/>
          </Button>
          {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full z-50">
                <div className="p-5 bg-background border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        href="/"
                        aria-label="Landing Page Boilerplate"
                        title="Landing Page Boilerplate"
                        className="inline-flex items-center text-inherit"
                      >
                        <LiaAddressCard className="text-4xl"/>
                        <p className="font-bold text-inherit">Dynamic resume</p>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="tracking-wide transition-colors duration-200 font-norma"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.value}>
                        <Link
                          href={link.href}
                          aria-label={headerDict[link.value]}
                          title={headerDict[link.value]}
                          className={liStyles}
                        >
                          {headerDict[link.value]}
                        </Link>
                      </li>
                    ))}
                    </ul>
                  </nav>
                  <div className="pt-2">
                    <div className="py-2 font-bold">Links</div>
                    <div className="flex items-center gap-x-5 justify-between">
                      <ul className="items-center gap-6 flex">
                        {iconLinks.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              aria-label={link.name}
                              title={link.name}
                              target="_blank"
                              className={liStyles}
                            >
                              {link.icon &&
                                React.createElement(link.icon, { className: "text-lg" })}
                            </Link>
                          </li>
                        ))}                      
                      </ul>
                      <div className="flex items-center justify-end gap-x-5 w-1/2">
                        <div className="flex max-w-[24px] flex-col items-center justify-center text-inherit">
                          <ThemeSwitch />
                        </div>
                        <LangSwitcher></LangSwitcher>
                        <div>
                          <LoginAvatar userInfo={userInfo} langName={langName} liStyles={liStyles}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </NavbarContent>
      }
    </NextUINavbar>
  );
};
