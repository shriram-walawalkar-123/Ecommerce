import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, deleteUser, getAllUsers } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error || deleteError) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      dispatch({ type: DELETE_USER_RESET });
      navigate("/admin/users");
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, message,navigate]);

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 180,
      flex: 0.8,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return `${params.row.role}` === "admin" ? "greenColor" : "redColor";
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              to={`/admin/user/${params.row.id}`}
              className="text-blue-500 underline"
            >
              ✏️ Edit
            </Link>

            <button
              onClick={() => deleteUserHandler(params.row.id)}
              className="ml-4 text-red-500 underline"
            >
              ❌ Delete
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />
      <div>
        <div>
          <h1 className="text-center font-bold text-lg">ALL USERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
