import MainContainer from "@/components/home/MainContainer";

export default async function LangHome({
    params: { lang },
  }: {
    params: { lang: string };
  }) {
    return <>
        <MainContainer />
    </>
  }