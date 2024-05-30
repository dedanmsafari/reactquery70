// import Projects from "./components/Projects";
// import TodoComponent from "./components/Todo";
// import { useMutation } from "@tanstack/react-query";
// import { useQueryClient } from "@tanstack/react-query";
// import { usePostTodo } from "./services/queries";

import Products from "./components/Products";

function App() {
  // const queryClient = useQueryClient();
  // const refetchQuery = queryClient.invalidateQueries({ queryKey: ["todos"] });

  // const { mutate, isPending } = usePostTodo(refetchQuery);

  // const { mutate, isPending } = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["todos"] });
  //   },
  // });

  return (
    <>
      <Products />
      {/* <TodoComponent /> */}
      {/* <Projects /> */}
      {/* {isPending && <h5>Adding Todo...</h5>} */}
      {/* <button
        type="button"
        onClick={() => {
          mutate({
            checked: false,
            title: "added Todo",
            description: "attempting to Add a todo",
          });
        }}
      >
        Add Todo
      </button> */}
    </>
  );
}

export default App;
