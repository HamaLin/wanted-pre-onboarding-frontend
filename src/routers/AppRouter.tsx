import React from "react";
import AppLayout from "./AppLayout";
import { AUTH_KEY_NAME, ROUTER_PATH_LIST } from "../constants";
import Todo from "../containers/todo";

const AppRouter = ({
  component: Component,
  authProtected,
}: {
  component: React.ReactElement;
  authProtected?: boolean | undefined;
}): React.ReactElement => {
  const accessToken = localStorage.getItem(AUTH_KEY_NAME);

  if (authProtected && !accessToken) {
    window.location.href = ROUTER_PATH_LIST.login;
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
