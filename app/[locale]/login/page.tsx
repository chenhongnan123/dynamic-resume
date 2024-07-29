"use client"
import {Button} from "@nextui-org/react";
import { BsGithub } from "react-icons/bs";
import { useSession, signIn } from "next-auth/react";


export default function Login() {
    const login = async () => {
      signIn("github", { // 登录方法，第一个参数标注平台
        callbackUrl: `${window.location.origin}`, // 设置登录成功后的回调地址
      });
    };

    return <section className="h-96 flex flex-col justify-center items-center">
      <div className="text-2xl font-bold my-4">Login to dynamic resume</div>
      <Button
      color="default"
      startContent={<BsGithub/>}
      className="w-full md:w-96 text-xl"
      onClick={login}
      >
        Continue with GitHub
      </Button>
      {/* <Button
      color="primary"
      startContent={<BsGithub/>}
      className="w-full md:w-96 text-xl mt-4"
      >
        Continue with GitHub
      </Button> */}
    </section>
  }