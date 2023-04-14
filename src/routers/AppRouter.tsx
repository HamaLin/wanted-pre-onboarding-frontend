import React from "react";
import AppLayout from "./AppLayout";
import { AUTH_KEY_NAME } from "../constants";
import Todo from "../pages/todo";

const AppRouter = ({
  component: Component,
  authProtected,
}: {
  component: React.ReactElement;
  authProtected?: boolean | undefined;
}) => {
  const accessToken = localStorage.getItem(AUTH_KEY_NAME);

  if (authProtected && !accessToken) {
    window.location.href = "/signin";
    // navigate("/signin");
    return <>Nope!</>;
  } else if (accessToken) {
    return (
      <AppLayout>
        <Todo />
      </AppLayout>
    );
  } else return <AppLayout>{Component}</AppLayout>;
};

export default AppRouter;
