import { httpRouter } from 'convex/server';
import { auth } from './auth';
import { httpAction } from './_generated/server';
import { resend } from './sendEmails';

const http = httpRouter();
http.route({
  path: '/resend-webhook',
  method: 'POST',
  handler: httpAction(async (ctx, req) => {
    return await resend.handleResendEventWebhook(ctx, req);
  }),
});

auth.addHttpRoutes(http);

export default http;
