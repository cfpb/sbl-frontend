import { useLayoutEffect, useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);

  useLayoutEffect(() => {
    const mediaQuery = matchMedia(query);

    function onMediaQueryChange(): void {
      setMatches(mediaQuery.matches);
    }

    mediaQuery.addEventListener('change', onMediaQueryChange);

    return (): void => {
      mediaQuery.removeEventListener('change', onMediaQueryChange);
    };
  }, [query]);

  return matches;
}

export interface UseUpdatePageTitleTypes {
  title: string;
  hasSuffix?: boolean;
}

// a hook that uses the useUpdatePageTitle interface to update document titles
export function useUpdatePageTitle({
  title,
  hasSuffix = true,
}: UseUpdatePageTitleTypes): void {
  useLayoutEffect(() => {
    document.title = `${title}${
      hasSuffix ? ' | Small Business Lending Data Submission Platform' : ''
    }`;
  }, [title, hasSuffix]);
}
