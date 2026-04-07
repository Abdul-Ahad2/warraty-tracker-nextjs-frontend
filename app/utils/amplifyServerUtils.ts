import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { amplifyConfig } from './amplify';

export const { runWithAmplifyServerContext } = createServerRunner({
    config: amplifyConfig
});
