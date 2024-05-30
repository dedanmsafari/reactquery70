import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, postTodo, updateTodo } from "./api";

export const usePostTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoIds"] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["todoIds"] });
      queryClient.invalidateQueries({ queryKey: ["todo", variables.id] });
    },
  });
};
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoIds"] });
      //   queryClient.invalidateQueries({ queryKey: ["todo", variables.id] });
    },
  });
};
