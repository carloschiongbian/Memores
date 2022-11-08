import "../public/css/pages/App/App.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes";
import { useContext, useState } from "react";
import AuthContext from "../auth/AuthContext";
import Api from "../services/api";
import { Alert } from "@mui/material";

const schema = yup.object({
  user: yup.string().required(),
  password: yup.string().required(),
});

const HomePage = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
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
        localStorage.setItem("isLogin", true);
        response.data.role === "admin"
          ? navigate(routes.admin.ADMIN_DASHBOARD)
          : navigate(routes.user.DASHBOARD);
        user.setUser(response.data);
      }
    } catch (error) {
      setAlertMessage(error.response.data.error);
      setIsAlertOpen(true);
      setTimeout(() => {
        setIsAlertOpen(false);
        setAlertMessage("");
      }, 3000);
    }
  };

  return (
    <div className="container">
      <div className="homepage-content">
        <div className="homepage-left-section">
          <div className="homepage-memores-introduction">
            <div className="homepage-introduction">
              <h2 className="homepage-introduction-header">What is Memores?</h2>
              <div className="homepage-introduction-content">
                <p className="content-one">
                  Mindful is a web-based intelligent screening tool that
                  healthcare professionals can use to screen patients with
                  Social Anxiety Disorder (SAD), and store patient records. Our
                  goal is to minimize the chances of the misdiagnosis of SAD
                  through the use of a machine learning model. Misdiagnosing
                  mental health disorders in general carry risks towards
                  patients; this includes patients still not knowing what's
                  wrong with them and patients taking incorrect medications or
                  treatments.
                </p>

                <p className="content-two">
                  It does not consider all experiences of social anxiety or the
                  possible reasons why a person might be having them. This tool
                  does not provide a formal diagnosis of Social Anxiety
                  Disorder. Only a professional can make a diagnosis.
                </p>

                <p className="content-three">
                  The screening test is divided into 5 sections - namely,
                  sectlion 1: demographic, section 2: emotional, section 3:
                  physical symptoms, section 4: Liebowitz Social Anxiety Scale
                  (LSAS), and section 5: Social Phobia Inventory (SPIN). After
                  taking the test, the probability of manifesting social anxiety
                  disorder will be shown.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="homepage-right-section">
          <div className="homepage-user-login">
            <div className="login-modal">
              {isAlertOpen && <Alert severity="error">{alertMessage}</Alert>}
              <p className="login-modal-header">Login here</p>

              <div className="login-modal-inputs">
                <form
                  className="login-form"
                  method="POST"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    {...register("user")}
                    type="text"
                    name="user"
                    id="login-username"
                    placeholder="Username"
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
                    placeholder="Password"
                  />
                  {errors.password && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "0px" }}
                    >
                      {errors.password.message}
                    </span>
                  )}
                  <input
                    type="submit"
                    name="login-submit-button"
                    id="login-submit-button"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
