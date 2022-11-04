import "../public/css/pages/App/style.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes";
import { useContext } from "react";
import AuthContext from "../auth/AuthContext";
import Api from "../services/api";

const schema = yup.object({
  user: yup.string().required(),
  password: yup.string().required(),
});

const HomePage = () => {
  const user = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await Api().post("/login", data);
      if (response.status === 200) {
        response.data.role === "admin"
          ? navigate(routes.admin.ADMIN_DASHBOARD)
          : navigate(routes.user.DASHBOARD);
        user.setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="screen-1">
    <input
     {...register("user")}
     type="text"
     name="user"
     id="login-username"
     placeholder="Enter Username"
   />
   {errors.user && (
     <span
       className="text-danger"
       style={{ fontSize: "12px", marginBottom: "0px" }}
     >
       {errors.user.message}
     </span>
   )}
   <input
     {...register("password")}
     type="password"
     name="password"
     id="login-password"
     placeholder="Enter Password"
   />
   {errors.password && (
     <span
       className="text-danger"
       style={{ fontSize: "12px", marginBottom: "0px" }}
     >
       {errors.password.message}
     </span>
   )}
  <button class="login"
     method="POST"
     onSubmit={handleSubmit(onSubmit)}
   > Login </button>
   </div> 
  );
};

export default HomePage;
