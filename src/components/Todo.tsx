import { SubmitHandler, useForm } from "react-hook-form";

import { useTodosById, useTodosIds } from "../services/queries";
import type { Todo } from "../types/todo";
import {
  useDeleteTodo,
  usePostTodo,
  useUpdateTodo,
} from "../services/mutations";

export default function TodoComponent() {
  const { register, handleSubmit } = useForm<Todo>();

  const { data: todoIds, isLoading } = useTodosIds();
  const todos = useTodosById(todoIds);
  const { mutate, isPending } = usePostTodo();
  const { mutate: updateMutate } = useUpdateTodo();
  const { mutateAsync: deleteMutate } = useDeleteTodo();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    mutate(data);
  };

  const handleChecked = (todo: Todo | undefined) => {
    if (todo) updateMutate({ ...todo, checked: true });
  };
  const handleDelete = async (todo: Todo) => {
    await deleteMutate(todo.id!);
    console.log("Successfully Deleted ");
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo</h4>
        <input placeholder="Title" {...register("title")} />
        <br />
        <input placeholder="Description" {...register("description")} />
        <br />
        <input
          type="submit"
          disabled={isPending}
          value={isPending ? "Creating" : "Add Todo"}
        />
      </form>

      {isLoading && <h5>Loading Todos...</h5>}

      <ul>
        {todos.map((todo, index) => (
          <div key={index}>
            {todo.isLoading && <h5>Loading Todo...</h5>}
            <li>
              <div>ID: {todo.data?.id}</div>
              <span>
                <strong>title: {todo.data?.title}</strong> <br />
                <strong>Description: {todo.data?.description}</strong>
              </span>
              <button
                onClick={() => handleChecked(todo.data)}
                disabled={todo.data?.checked}
              >
                {todo.data?.checked ? "Done" : "Close"}
              </button>{" "}
              <button onClick={() => handleDelete(todo.data!)}>Delete</button>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}
