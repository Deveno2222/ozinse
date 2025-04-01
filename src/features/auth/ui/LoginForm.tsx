import { useForm, Controller } from "react-hook-form";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import type { LoginForm } from "../types";
import PasswordInput from "../../../components/PasswordInput";
import { useLoginMutation } from "../api/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "../model/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { control, handleSubmit, formState, reset } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [onLogin] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errors } = formState;

  const login = async (data: LoginForm) => {
    try {
      const response = await onLogin(data).unwrap();
      if (response) {
        dispatch(setToken(response.result));
        navigate("/");
      }
      reset();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form className="flex flex-col gap-8 mt-8" onSubmit={handleSubmit(login)}>
      <div className="flex flex-col gap-4">
        <Controller
          name="email"
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <CustomInput
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...field} // Передаем value и onChange
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <PasswordInput
              label="Пароль"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...field}
            />
          )}
        />
      </div>

      <CustomButton type="submit">Войти</CustomButton>
    </form>
  );
};

export default LoginForm;
