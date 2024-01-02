import { rest } from 'msw';
import applications from './data/applications.json';

const handlers = [
  rest.get('/upload', async (_, response, context) =>
    response(context.json(applications)),
  ),
];

export default handlers;
