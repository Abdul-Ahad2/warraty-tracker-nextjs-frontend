'use client';

import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { CookieStorage } from 'aws-amplify/utils';
import { amplifyConfig } from '@/utils/amplify';

Amplify.configure(amplifyConfig, { ssr: true });

const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

cognitoUserPoolsTokenProvider.setKeyValueStorage(
  new CookieStorage({
    domain: isLocalhost ? undefined : (typeof window !== 'undefined' ? window.location.hostname : undefined),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
