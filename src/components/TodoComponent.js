import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchTodo, setPagination } from "../actions/todoAction";
import PaginatorComponet from "./PaginatorComponent";

class TodoComponent extends React.Component {
  async componentWillMount() {
    try {
      await this.props.fetchTodo();
      await this.props.setPagination(1, 5, this.props.todo);
    } catch (ex) {
      console.log("error connecting to the server: ", ex);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {this.props.pagination ? (
                  this.props.pagination.paginatedTodo.map(todo => (
                    <tr key={todo.id}>
                      <td>{todo.id}</td>
                      <td>{todo.title}</td>
                      <td>{todo.completed ? "true" : "false"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <th>Not data</th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-12">
              {this.props.pagination ? (
                <PaginatorComponet
                  changePage={this.changePage}
                  paginatorData={this.props.pagination.paginatorData}
                  pages={this.props.pagination.pages}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  changePage = async currentPage => {
    await this.props.setPagination(currentPage, 5, this.props.todo);
  };
}

TodoComponent.propTypes = {
  fetchTodo: PropTypes.func.isRequired,
  todo: PropTypes.array.isRequired,
  setPagination: PropTypes.func.isRequired,
  pagination: PropTypes.object
};

const mapStateToProps = state => ({
  todo: state.todoReducer.todo,
  pagination: state.todoReducer.pagination
});

export default connect(
  mapStateToProps,
  { fetchTodo, setPagination }
)(TodoComponent);
