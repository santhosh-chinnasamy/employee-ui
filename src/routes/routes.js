import Login from "pages/Auth/Login";
import NotFound from "pages/NotFound";
import Employees from "pages/Employees/List";
import AddEmployee from "pages/Employees/add";
import EditEmployee from "pages/Employees/edit";

const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/404",
    component: NotFound,
    isPrivate: false,
  },
  {
    path: "/",
    component: Employees,
    isPrivate: true,
  },
  {
    path: "/add",
    component: AddEmployee,
    isPrivate: true,
  },
  {
    path: "/edit/:id",
    component: EditEmployee,
    isPrivate: true,
  },
];

export default routes;
