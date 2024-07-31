import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export const LoginAvatar = ({ userInfo , langName, liStyles, closeMenu, }: any) => {
  const router = useRouter();
  const pathName = usePathname();
  const isEditPage = pathName?.includes("/edit-profile");
  return (
    <>
        {userInfo
            ?
            <div>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                    <User   
                    className="cursor-pointer"
                    name={userInfo.name}
                    description={userInfo.email}
                    avatarProps={{
                        src: userInfo.image,
                        disableAnimation: true
                    }}
                    />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem
                        isDisabled={isEditPage}
                        key="edit"
                        color="primary"
                        onClick={() => {
                            router.push(`/${langName}/edit-profile`);
                            closeMenu && closeMenu();
                        }}
                        >
                            Edit Profile
                        </DropdownItem>
                        <DropdownItem
                        key="logout"
                        color="primary"
                        onClick={() => signOut({ callbackUrl: `${window.location.origin}`, })}
                        >
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            :
            <div className={`${liStyles} w-18`} id="login-link">
                <Link
                    href={`/${langName}/login`}
                    aria-label={'Log In'}
                    title={'Log In'}
                    className="text-inherit leading-10"
                >Log in</Link>
            </div>}
    </>
  );
};
