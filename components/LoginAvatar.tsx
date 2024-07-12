import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginAvatar = ({ userInfo , langName, liStyles }: any) => {
  const router = useRouter();
  return (
    <>
        {userInfo
            ?
            <div>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                    {/* <Avatar
                        isBordered
                        as="button"
                        className="transition-transform w-8 h-8"
                        src={userInfo.picture}
                    /> */}
                    <User   
                    className="cursor-pointer"
                    name={userInfo.name}
                    description={userInfo.email}
                    avatarProps={{
                        src: userInfo.picture
                    }}
                    />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem
                        key="edit"
                        color="primary"
                        onClick={() => {
                            router.push(`/${langName}/edit-profile`)
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
            <div className={`${liStyles} w-18`}>
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
