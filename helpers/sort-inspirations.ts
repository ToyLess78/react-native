import { Inspiration } from '../types';

export const sortInspirations = (inspirations: Inspiration[], sortOrder: 'asc' | 'desc'): Inspiration[] => {
    return [...inspirations].sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();

        if (sortOrder === 'asc') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });
};