/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
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
          {/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */}
          {/* @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717 */}
          {submission?.validation_json?.logic_warnings?.details?.map(
            // eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            /* @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717 */
            ({ validation }) => {
              return (
                // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                <div key={validation.id} className='u-mb30'>
                  {/* Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717 */}
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                  <div>{validation.id}</div>
                  <div>
                    {/* Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717 */}
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                    <Markdown>{validation.description}</Markdown>
                  </div>
                </div>
              );
            },
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8} className='u-mt15'>
          <Markdown>{`# H1\n## H2\n### H3`}</Markdown>
          <Markdown>{`**bold text**\n\n*italicized text*\n\n> blockquote\n`}</Markdown>
          <Markdown>{`~~strikethrough~~`}</Markdown>
          <Markdown>{`1. First item\n2. Second item\n4. Third item`}</Markdown>
          <Markdown>{`- First item\n- Second item\n- Third item`}</Markdown>
          {/* // eslint-disable-next-line react/jsx-curly-brace-presence */}
          <Markdown>{'`code`'}</Markdown>
          <Markdown>{'---'}</Markdown>
          <Markdown>
            {'[Markdown Guide](https://www.markdownguide.org)'}
          </Markdown>
          <Markdown>
            {'![alt text](https://www.markdownguide.org/assets/images/tux.png)'}
          </Markdown>
          <Markdown>{`## Table\n\n| Syntax | Description |\n| ----------- | ----------- |\n| Header | Title |\n| Paragraph | Text |\n\n`}</Markdown>
          <Markdown>
            {
              "## Codeblock\n\n```\n{\n'firstName': 'John',\n  'lastName': 'Smith',\n  'age': 25\n}\n```"
            }
          </Markdown>
        </Grid.Column>
      </Grid.Row>
    </Grid.Wrapper>
  );
}

export default MarkdownText;
