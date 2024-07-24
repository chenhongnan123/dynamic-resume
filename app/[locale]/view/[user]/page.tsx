import MainContainer from "@/components/home/MainContainer";
// import initTranslations from '@/app/i18n';

export default async function User({
  params: { locale },
}: {
  params: { locale: string };
}) {
    // const { t, resources } = await initTranslations(locale, ['home']);
    return <>
        <MainContainer />
    </>
  }