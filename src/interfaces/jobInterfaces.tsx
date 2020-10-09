export interface Job {
    id: string;
    title: string;
    postedAt: string;
    countries: Country[];
    company: Company;
}

export interface Country {
    id: string;
    name: string;
    slug: string;
    type: string;
}

export interface Company {
    id: string;
    name: string;
    slug: string;
    logoUrl: string;
}
