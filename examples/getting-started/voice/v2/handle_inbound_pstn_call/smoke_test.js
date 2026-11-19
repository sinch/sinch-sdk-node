import * as dotenv from 'dotenv';

async function main() {
  dotenv.config();

  const port = process.env.PORT || '3000';

  const resp = await fetch(`http://localhost:${port}/voice/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'call.incoming',
      call: {
        callId: 'test',
        projectId: 'test',
        serviceId: 'test',
        sessionId: 'test',
        direction: 'INBOUND',
        originationType: 'PHONE',
        callType: 'PHONE',
        from: { type: 'PHONE', phone: { number: '+15551112222' } },
        to: { type: 'PHONE', phone: { number: '+14045001000' } },
        callResult: 'INITIATED',
        startTime: '2025-06-01T10:00:00Z',
        callRate: { currencyCode: 'USD', amount: '0.0000' },
        callResourceUrl: 'https://voice.api.sinch.com',
      },
    }),
  });

  if (!resp.ok) {
    throw new Error(`Server returned ${resp.status}: ${await resp.text()}`);
  }

  const body = await resp.json();
  console.log(resp.status, body);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
