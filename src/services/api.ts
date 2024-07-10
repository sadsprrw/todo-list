import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { User, TodoItem } from "@/common/types/types";

class APIService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "https://jsonplaceholder.typicode.com",
            timeout: 1000,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            }
        });
    }

    private async axiosCall<T>(config: AxiosRequestConfig): Promise<T | undefined> {
        try {
            const { data } = await this.axiosInstance.request<T>(config);
            return data;
        } catch (err: any) {
            console.error(err);
        }
    }

    async getAllUsers(): Promise<User[] | undefined> {
        return this.axiosCall<User[]>({ method: "get", url: "/users" });
    }

    async getAllTodos():  Promise<TodoItem[] | undefined> {
        return this.axiosCall<TodoItem[]>({ method: "get", url: "/todos" });
    }

    async createTodo(todo: Partial<TodoItem>):  Promise<TodoItem | undefined> {
        return this.axiosCall<TodoItem>({ method: "post", url: "/todos", data: todo})
    }
}

export const api = new APIService();