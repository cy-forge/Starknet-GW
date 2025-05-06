/**
 * Generate a URL-friendly slug from a string
 * @param input - The string to generate a slug from
 * @returns A URL-friendly slug
 */
export function generateSlug(input: string): string {
        return input
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    }