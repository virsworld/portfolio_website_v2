
export interface Project {
    id: number;
    title: string;
    year: number;
    tags: string[];
    description: string;
    img: string;
    slug: string;
}

export interface Blog {
    id: number;
    title: string;
    year: number;
    date: string;
    tags: string[];
    description: string;
    content: string;
    img: string;
    slug: string;
}