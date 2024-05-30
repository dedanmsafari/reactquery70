import {
  useQuery,
  useQueries,
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getProduct,
  getProducts,
  getProjects,
  getTodoById,
  getTodos,
  getTodosIds,
} from "./api";
import { Todo } from "../types/todo";
import { Product } from "../types/products";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};

export const useTodosIds = () => {
  return useQuery({
    queryKey: ["todoIds"],
    queryFn: getTodosIds,
  });
};

export const useTodosById = (ids: Todo["id"][] | undefined) => {
  return useQueries({
    queries: (ids ?? []).map((id) => ({
      queryKey: ["todo", id],
      queryFn: () => getTodoById(id!),
    })),
  });
};

export const useProjects = (page: number) => {
  return useQuery({
    queryKey: ["Projects", page],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  });
};

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
};

export const useProduct = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: !!id,
    placeholderData: () => {
      const cachedProducts = (
        queryClient.getQueryData(["products"]) as {
          pages: Array<Product[]> | undefined;
        }
      )?.pages?.flat(2);
      if (cachedProducts) {
        return cachedProducts.find((item) => item.id === id);
      }
    },
  });
};
