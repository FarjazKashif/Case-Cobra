import { createClient } from 'next-sanity';

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2024-10-19', // Use the current date for the latest version
    useCdn: process.env.NODE_ENV === 'production',
};

export const sanityClient = createClient(config);
