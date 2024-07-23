import MainContainer from "@/components/home/MainContainer";
import initTranslations from '../../../i18n';

export default async function User({
  params: { locale },
}: {
  params: { locale: string };
}) {
    const { t, resources } = await initTranslations(locale, ['home']);
    return <>
        <MainContainer />
        {t('header.title')}
    </>
  }