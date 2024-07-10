
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export interface TodoItem {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    stared?: boolean;
}

export interface TodoFilter {
    title: string;
    status: string;
    userId: number;
}