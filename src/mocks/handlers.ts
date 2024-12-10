import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('https://www.greatfrontend.com/api/projects/challenges/newsletter', () => {
    return HttpResponse.json({
      data: { message: 'Subscription successful! Please check your email to confirm.' },
    });
  }),
  // http.get('/test', () => {
  //   return Response.json({
  //     message: 'TEST server msw',
  //   });
  // }),
];
