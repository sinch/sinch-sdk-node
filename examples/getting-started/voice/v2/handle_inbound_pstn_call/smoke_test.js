async function main() {
  const resp = await fetch('http://localhost:3000/voice/events', {
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
  
  const body = await resp.json();
  console.log(resp.status, body);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
