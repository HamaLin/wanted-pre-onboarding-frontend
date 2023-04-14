import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexColumn, Flex } from "../../components/ui/layout";
import { TodoPropsType, TodoUpdatePropsType } from "../../typedefs";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import TodoListComponent from "../../components/TodoListComponent";
import axios from "axios";
import { API_HOST, AUTH_KEY_NAME, NEW_TODO } from "../../constants";
import { snackBarErrorMessage } from "../../services";
import { axiosApi } from "../../apis";

const Wraper = styled(FlexColumn)`
  width: 18%;
  min-width: 350px;
  height: 95%;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Contents = styled(FlexColumn)`
  overflow: hidden;
  padding: 15px;

  > div {
    margin-bottom: 20px;

    :last-of-type {
      margin-bottom: 0;
    }
  }
`;

const Header = styled(Flex)`
  width: 100%;
  height: 40px;
`;

const Body = styled(FlexColumn)`
  overflow: hidden overlay;
  flex-grow: 1;
  padding-right: 10px;

  > div {
    margin-bottom: 10px;
  }
`;

const Index = () => {
  const [todos, setTodos] = useState<TodoPropsType[]>([]);
  const [newTodo, setNewTodo] = useState<TodoPropsType>(NEW_TODO);

  const loadTodos = async () => {
    try {
      const result = await axios.get(API_HOST + "todos", {
        headers: {
          Authorization: localStorage.getItem(AUTH_KEY_NAME),
        },
      });

      setTodos(result?.data);
    } catch (err) {
      snackBarErrorMessage("할 일을 불러오는데 실패했습니다.", err);
    }
  };

  const addNewTodo = async () => {
    try {
      const result = await axios.post(
        API_HOST + "todos",
        {
          todo: newTodo.todo,
        },
        {
          headers: {
            Authorization: localStorage.getItem(AUTH_KEY_NAME),
            "Content-Type": "application/json",
          },
        }
      );

      setTodos((prev) => [...prev, { ...result.data }]);
      setNewTodo(NEW_TODO);

      enqueueSnackbar("성공적으로 등록되었습니다!", {
        variant: "success",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    } catch (err) {
      snackBarErrorMessage("할 일을 등록하는데 실패했습니다.", err);
    }
  };

  const onCreateUpdatedTodoObj = (
    changeProps: TodoUpdatePropsType
  ): TodoPropsType | undefined => {
    const { id, changeType, value } = changeProps;
    let updateTodo = todos?.find((data) => data.id === id);
    let updateParameter: "isCompleted" | "todo" = "isCompleted";

    if (changeType === "TodoChange") updateParameter = "todo";

    //@ts-ignore
    return { ...updateTodo, [updateParameter]: value };
  };

  const onUpdateTodo = async (props: TodoUpdatePropsType) => {
    try {
      const { changeType, id } = props;
      let message = "성공적으로";

      if (changeType === "Delete") {
        await axiosApi("todoDelete", undefined, id);
        message += " 삭제되었습니다.";
      } else {
        const newTodo = onCreateUpdatedTodoObj(props);
        await axiosApi("todoUpdate", newTodo, id);
        message += " 수정되었습니다.";
      }

      await loadTodos();

      enqueueSnackbar(message, {
        variant: "success",
      });
    } catch (err) {
      snackBarErrorMessage("할 일 업데이트에 실패했습니다.", err);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <Wraper>
      <h1>Todo</h1>

      <Card
        style={{
          flexGrow: 1,
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Contents>
          <Header style={{ height: "40px" }}>
            <Input
              style={{ minHeight: "20px" }}
              inputProps={{ value: newTodo?.todo }}
              onChange={(e) =>
                setNewTodo((prev) => ({ ...prev, todo: e.target.value }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") addNewTodo();
              }}
              data-testid="new-todo-input"
            />
            <Button
              style={{
                height: "auto",
                width: "30%",
                marginLeft: "10px",
                minHeight: "0",
              }}
              onClick={() => addNewTodo()}
              data-testid="new-todo-add-button"
            >
              추가
            </Button>
          </Header>
          <Body>
            {todos?.map((data) => (
              <TodoListComponent
                key={data.id}
                props={data}
                updateTodoFc={onUpdateTodo}
              />
            ))}
          </Body>
        </Contents>
      </Card>
      <SnackbarProvider />
    </Wraper>
  );
};

export default Index;
