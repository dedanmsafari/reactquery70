import React from "react";
import { useProjects } from "../services/queries";

const Projects = () => {
  const [page, setPage] = React.useState(1);

  const { data, isFetching, isPlaceholderData } = useProjects(page);

  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (!isPlaceholderData) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <>
      <h4>Projects</h4>
      {data?.map((project) => (
        <p key={project.id}>{project.name}</p>
      ))}
      <button onClick={handlePrevious} disabled={page === 1}>
        Prev
      </button>{" "}
      <button onClick={handleNext} disabled={isPlaceholderData}>
        Next
      </button>
      {isFetching && <p>Loading...</p>}
    </>
  );
};

export default Projects;
