import { enqueueSnackbar } from "notistack";
import { AUTH_KEY_NAME } from "../constants";

export const snackBarErrorMessage = (exceptMessage: string, err?: unknown) => {
  const message =
    //@ts-ignore
    JSON.parse(err.request.response)?.message || exceptMessage;
  console.error(err);

  //   if (message === "Token Expired") {
  //     localStorage.removeItem(AUTH_KEY_NAME);
  //     console.log(message);

  //     enqueueSnackbar("토큰이 만료되었습니다.", {
  //       variant: "error",
  //     });

  //     setTimeout(() => {
  //       window.location.href = "/signin";
  //     }, 1000);
  //     return;
  //   }

  enqueueSnackbar(message, {
    variant: "error",
  });
};
