"use client";

import Script from "next/script";

const integrationId = process.env.NEXT_PUBLIC_WATSON_INTEGRATION_ID;
const region = process.env.NEXT_PUBLIC_WATSON_REGION;
const serviceInstanceId = process.env.NEXT_PUBLIC_WATSON_INSTANCE_ID;

declare global {
  interface Window { watsonAssistantChatOptions?: Record<string, unknown> }
}

export default function WatsonChatbot() {
  if (!integrationId || !region || !serviceInstanceId) return null;

  return <Script
    src={`https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js`}
    strategy="lazyOnload"
    onLoad={() => {
      window.watsonAssistantChatOptions = {
        integrationID: integrationId,
        region,
        serviceInstanceID: serviceInstanceId,
        onLoad: async (instance: { render: () => Promise<void> }) => instance.render(),
      };
    }}
  />;
}
