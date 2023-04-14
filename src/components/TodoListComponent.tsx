import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { TodoPropsType, TodoUpdatePropsType } from "../typedefs";
import { Input } from "./ui/Input";
import { Flex, FlexAll } from "./ui/layout";

const Wraper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  min-height: 50px;
  overflow: hidden;

  > label {
    display: flex;
    cursor: pointer;
    flex-grow: 1;
    overflow: hidden;
    > span {
      margin-left: 5px;
    }
  }

  > div {
    min-width: 95px;
  }
`;

const CheckBox = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  min-width: 1.5rem;
  min-height: 1.5rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  cursor: pointer;

  &:checked {
    border: 2px solid #8f589a;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-color: #bd96f3;
  }
`;

const TodoButton = styled.button<{ btnType?: "error" | undefined }>`
  width: 100%;
  height: 30px;
  border-radius: 8px;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  background-color: ${(props) =>
    props.btnType === "error" ? "#e32e2e" : "#12c912"};
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.btnType === "error" ? "#af1d1d" : "#10a110"};
  }
`;

const TodoListComponent = ({
  props,
  updateTodoFc,
}: {
  props: TodoPropsType;
  updateTodoFc: (props: TodoUpdatePropsType) => void;
}) => {
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState<TodoPropsType>({
    id: 0,
    todo: "",
    isCompleted: false,
    userId: 0,
  });

  const onCheck = () => {
    setLocalData((prev) => ({
      ...prev,
      isCompleted: !prev.isCompleted,
    }));

    updateTodoFc({
      id: props.id,
      changeType: "Check",
      value: !localData.isCompleted,
    });
  };

  useEffect(() => {
    setLocalData(props);
  }, [props]);

  return (
    <Wraper>
      <label>
        <CheckBox
          type="checkbox"
          checked={localData.isCompleted || false}
          onChange={() => {
            if (!editMode) onCheck();
          }}
        />
        {editMode ? (
          <Input
            inputProps={{ value: localData.todo }}
            onChange={(e) => {
              setLocalData((prev) => ({ ...prev, todo: e.target.value }));
            }}
            data-testid="modify-input"
          />
        ) : (
          <span
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textDecoration: localData.isCompleted ? "line-through" : "none",
            }}
          >
            {props.todo}
          </span>
        )}
      </label>
      <Flex>
        <TodoButton
          onClick={() => {
            if (!editMode) setEditMode((prev) => !prev);
            if (editMode) {
              updateTodoFc({
                id: localData.id,
                changeType: "TodoChange",
                value: localData.todo,
              });
              setEditMode(false);
            }
          }}
          data-testid={editMode ? "submit-button" : "modify-button"}
        >
          {editMode ? "제출" : "수정"}
        </TodoButton>
        <TodoButton
          style={{
            marginLeft: "5px",
          }}
          btnType="error"
          onClick={() => {
            if (!editMode)
              updateTodoFc({ id: localData.id, changeType: "Delete" });
            if (editMode) setEditMode(false);
          }}
          data-testid={editMode ? "cancel-button" : "delete-button"}
        >
          {editMode ? "취소" : "삭제"}
        </TodoButton>
      </Flex>
      {/* <FlexAll>
      </FlexAll>
      <Flex
        style={{ flexGrow: 1, cursor: "pointer", overflow: "hidden" }}
        onClick={() => {
          if (!editMode) onCheck();
        }}
      >
        {editMode ? (
          <Input
            inputProps={{ value: localData.todo }}
            onChange={(e) => {
              setLocalData((prev) => ({ ...prev, todo: e.target.value }));
            }}
          />
        ) : (
          <pre
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textDecoration: localData.isCompleted ? "line-through" : "none",
            }}
          >
            {props.todo}
          </pre>
        )}
      </Flex>
      <Flex style={{ minWidth: "40%", alignItems: "center" }}>
        <TodoButton
          onClick={() => {
            if (!editMode) setEditMode((prev) => !prev);
            if (editMode) {
              updateTodoFc({
                id: localData.id,
                changeType: "TodoChange",
                value: localData.todo,
              });
              setEditMode(false);
            }
          }}
        >
          {editMode ? "제출" : "수정"}
        </TodoButton>
        <TodoButton
          style={{
            marginLeft: "5px",
          }}
          btnType="error"
          onClick={() => {
            if (!editMode)
              updateTodoFc({ id: localData.id, changeType: "Delete" });
            if (editMode) setEditMode(false);
          }}
        >
          {editMode ? "취소" : "삭제"}
        </TodoButton>
      </Flex> */}
    </Wraper>
  );
};

export default TodoListComponent;
