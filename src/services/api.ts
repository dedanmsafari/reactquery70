import axios from "axios";
import type { Todo } from "../types/todo";
import type { Project } from "../types/project";
import { Product } from "../types/products";

const BASE_URL = "http://localhost:8080";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () => {
  return (await axiosInstance.get<Todo[]>("todos")).data.map((todo) => todo.id); //? returns [1,2,3] / [id can be undefined]
};

export const getTodoById = async (id: number) => {
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
};

export const getTodos = async () => {
  return (await axiosInstance.get<Todo[]>("todos")).data;
};

export const postTodo = async (newTodo: Todo) => {
  await axiosInstance.post("todos", newTodo);
};

export const updateTodo = async (todo: Todo) => {
  await axiosInstance.put(`todos/${todo.id}`, todo);
};

export const deleteTodo = async (id: number) => {
  await axiosInstance.delete(`todos/${id}`);
};

export const getProjects = async (page: number = 1) => {
  return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=3`))
    .data;
};

export const getProducts = async ({ pageParam }: { pageParam: number }) => {
  return (
    await axiosInstance.get<Product[]>(
      `products?_page=${pageParam + 1}&_limit=3`
    )
  ).data;
};

export const getProduct = async (id: number) => {
  return (await axiosInstance.get<Product>(`products/${id}`)).data;
};
