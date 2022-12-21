import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log("Error", error);
  return (
    <div className="space-y-8">
      <h1 className="text-6xl text-center font-extrabold mt-20 text-blue-900">
        CRM - clients
      </h1>
      <p className="text-center">Error:</p>
      <p className="text-center">{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;
