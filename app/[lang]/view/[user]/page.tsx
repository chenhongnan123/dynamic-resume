import MainContainer from "@/components/home/MainContainer";

export default async function User({
    params: { lang },
  }: {
    params: { lang: string };
  }) {
    return <>
        <MainContainer />
    </>
  }