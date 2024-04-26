import { Grid } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import Markdown from 'react-markdown';
import { useFilingAndSubmissionInfo } from 'utils/useFilingAndSubmissionInfo';

export function MarkdownText(): JSXElement {
  const { submission } = useFilingAndSubmissionInfo({
    lei: '123456789TESTBANK123',
    filingPeriod: '2024',
  });

  return (
    <Grid.Wrapper center>
      <Grid.Row>
        <Grid.Column width={8} className='u-mt15'>
          MARKDOWN TEST
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8} className='u-mt15'>
          {submission?.validation_json?.logic_warnings?.details?.map(
            ({ validation }) => {
              return (
                <div key={validation.id} className='u-mb30'>
                  <div>{validation.id}</div>
                  <div>
                    <Markdown>{validation.description}</Markdown>
                  </div>
                </div>
              );
            },
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid.Wrapper>
  );
}

export default MarkdownText;
