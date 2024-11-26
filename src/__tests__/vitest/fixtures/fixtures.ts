import { HttpResponse, http } from 'msw';

export const SAMPLE_GET_KNOWLEDGE_MOCK = http.get('http://localhost:3000/constitution.md', () => {
  return HttpResponse.json({});
});

export const SAMPLE_ACTION_MOCK = http.get('/api', () => {
  return HttpResponse.json({});
});
