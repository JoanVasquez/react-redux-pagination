import { FETCH_TODO, PAGINATE } from "./types";
import Paginator from "paginator";

export const fetchTodo = () => async dispatch => {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos");
    let todo = await response.json();
    dispatch({
      type: FETCH_TODO,
      payload: todo
    });
  } catch (ex) {
      throw ex;
  }
};

export const setPagination = (currentPage, pageSize, todo) => dispatch => {
  try {
    let paginator = new Paginator(pageSize, 7);
    let paginatorData = paginator.build(todo.length, currentPage);
    let pages = [
      ...Array(paginatorData.last_page + 1 - paginatorData.first_page).keys()
    ].map(index => paginatorData.first_page + index);
    let paginatedTodo = todo.slice(
      paginatorData.first_result,
      paginatorData.last_result + 1
    );
    dispatch({
      type: PAGINATE,
      payload: {
        paginatedTodo,
        paginatorData,
        pages
      }
    });
  } catch (ex) {
      throw ex;
  }
};
