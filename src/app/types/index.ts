
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
    date: number;
    tags: string[];
    content: string;
    img: string;
    slug: string;
}