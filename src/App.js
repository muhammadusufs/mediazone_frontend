import { ThemeProvider, createTheme } from "@mui/material";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

// Hooks
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Local
import { getItem, removeItem } from "./utils/storage";

// Slices
import { getUser, loginSuccess, setCompany } from "./states/AuthSlices";

// Services
import AuthService from "./services/AuthService";
import jwt_decode from "jwt-decode";
import Informations from "./Screens/Informations";
import Teachers from "./Screens/Teachers";
import Expenses from "./Screens/Expenses";
import History from "./Screens/History";
import Settings from "./Screens/Settings";
import Payment from "./Screens/Payment";
import EditStudent from "./Screens/EditStudent";
import DeleteStudent from "./Screens/DeleteStudent";
import HistoryStudent from "./Screens/HistoryStudent";
import InsertGroup from "./Screens/InsertGroup";
import GroupDetails from "./Screens/GroupDetails";
import EditGroup from "./Screens/EditGroup";
import TeacherDetails from "./Screens/TeacherDetails";
import TeacherAddBonus from "./Screens/TeacherAddBonus";
import TeacherAddDebt from "./Screens/TeacherAddDebt";
import TeacherAddFine from "./Screens/TeacherAddFine";
import EditTeacher from "./Screens/EditTeacher";
import InsertTeacher from "./Screens/InsertTeacher";
import InsertExpense from "./Screens/InsertExpense";
import Suspended from "./Screens/Suspended";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffcd86",
      light: "#ffdfb3",
      dark: "#ffbc5c",
      extraLight: "#fff1ed",
    },
    secondary: {
      main: "#fff",
      light: "#f1f1f1",
      dark: "#f5f5f5",
    },

    light: {
      main: "#f9f9f9",
      light: "#fff",
      dark: "#ebebeb",
      contrastText: "#3d3d3d",
    },

    dark: {
      main: "#3d3d3d",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setUser = async () => {
    try {
      const t = getItem("token");
      const response = await AuthService.getUser(jwt_decode(t).user_id);
      dispatch(loginSuccess(getItem("token")));
      dispatch(getUser(response.data));
      const company = await AuthService.getCompany();
      dispatch(setCompany(company.data));
      if (company.data.company.is_active === false) {
        navigate("/suspended");
      }
    } catch (error) {
      removeItem("token");
    }
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      setUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<PrivateRoutes account="casher" />}>
          <Route path="casher/" element={<Home />} />
          <Route path="/" element={<Home />} />

          <Route
            path="casher/payment/:student_id/:month/:group_id/"
            element={<Payment />}
          />

          <Route
            path="general/students/:student_id/edit/"
            element={<EditStudent />}
          />

          <Route
            path="general/students/:student_id/delete/"
            element={<DeleteStudent />}
          />

          <Route
            path="general/students/:student_id/history/"
            element={<HistoryStudent />}
          />

          <Route path="casher/data/" element={<Informations />} />
          <Route path="casher/data/create-group/" element={<InsertGroup />} />
          <Route
            path="casher/data/view-group/:group_id/"
            element={<GroupDetails />}
          />

          <Route
            path="casher/data/edit-group/:group_id/"
            element={<EditGroup />}
          />

          <Route path="casher/teachers/" element={<Teachers />} />
          <Route
            path="casher/teachers/create-teacher/"
            element={<InsertTeacher />}
          />
          <Route
            path="casher/teachers/:teacher_id/"
            element={<TeacherDetails />}
          />

          <Route
            path="casher/teachers/:teacher_id/add/bonus/"
            element={<TeacherAddBonus />}
          />

          <Route
            path="casher/teachers/:teacher_id/add/debt/"
            element={<TeacherAddDebt />}
          />

          <Route
            path="casher/teachers/:teacher_id/add/fine/"
            element={<TeacherAddFine />}
          />

          <Route
            path="casher/teachers/:teacher_id/edit/"
            element={<EditTeacher />}
          />

          <Route path="casher/expenses/" element={<Expenses />} />
          <Route
            path="casher/expenses/add-expense/"
            element={<InsertExpense />}
          />
          <Route path="casher/sale/" element={<History />} />
          <Route path="casher/settings/" element={<Settings />} />
        </Route>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Suspended />} path="/suspended"></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
