export function sanitize_to_slug(text: string) {
    let sanitized = text.toLowerCase();

    sanitized = sanitized.replace(/\./g, '-');
    sanitized = sanitized.replace(/\s+/g, '-');
    sanitized = sanitized.replace(/[^a-z0-9-]/g, '');
    sanitized = sanitized.replace(/-+/g, '-');
    sanitized = sanitized.replace(/^-|-$/g, '');

    return sanitized;   
}