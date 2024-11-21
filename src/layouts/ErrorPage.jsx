import React, { useEffect } from "react";
import { useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      <h1>Not Found</h1>
    </>
  );
};

export default NotFound;
