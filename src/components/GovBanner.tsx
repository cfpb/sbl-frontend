import { Banner, LanguageLink } from 'design-system-react';
import { useParams } from 'react-router-dom';

const AllLanguageCodes = ['en', 'es', 'zh', 'vi', 'ko', 'tl', 'ru', 'ar', 'ht'];

export default function GovBanner(): JSX.Element {
  // TODO:
  // Language URL path is inconsistent, based on what we have in the design system.
  // This logic will need to be adapted as we add more content.
  const { languageId, isSpanish } = useParams();
  const currentLanguage: string =
    isSpanish === 'es' ? 'es' : languageId ?? 'en';

  // Hide currently selected language
  const availableLanguages = AllLanguageCodes.filter(
    (lang: string) => lang !== currentLanguage,
  );

  const links: JSX.Element[] = availableLanguages.map(
    (lang: string): JSX.Element => <LanguageLink key={lang} code={lang} />,
  );

  return (
    <Banner
      links={links}
      phoneNumber='1-855-411-2372'
      tagline={
        <>
          An official website of the{' '}
          <span className='u-nowrap'>United States government</span>
        </>
      }
    />
  );
}

GovBanner.defaultProps = {
  currentLanguage: 'en',
};
