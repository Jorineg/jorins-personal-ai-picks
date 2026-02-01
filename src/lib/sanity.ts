import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'dkobocct',
    dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
    useCdn: true,
    apiVersion: '2024-01-01'
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

// Fetch all companies
export async function getCompanies() {
    return sanityClient.fetch(`*[_type == "company"] | order(name asc)`);
}

// Fetch all categories with their models
export async function getCategories() {
    return sanityClient.fetch(`
        *[_type == "category"] | order(order asc) {
            _id,
            name,
            slug,
            description,
            "models": *[_type == "aiModel" && references(^._id)] | order(rank asc) {
                _id,
                rank,
                modelName,
                description,
                serviceLink,
                cheapestOption,
                apiAvailable,
                "company": company->{
                    _id,
                    name,
                    logo
                }
            }
        }
    `);
}

// Fetch site settings
export async function getSiteSettings() {
    return sanityClient.fetch(`*[_type == "siteSettings"][0]`);
}
