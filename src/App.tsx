import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import Layout from "./features/layout/Layout";
import MainScreen from "./pages/(logged-in)/MainScreen";
import Modal from "react-modal";
import MovieScreen from "./pages/(logged-in)/MovieScreen";
import MovieAdd from "./pages/(logged-in)/MovieAdd";
import NotFound from "./pages/(logged-in)/NotFound";
import ProjectsOnMain from "./pages/(logged-in)/ProjectsOnMain";
import { Provider } from "react-redux";
import { store } from "./store/store";
import CategoryScreen from "./pages/(logged-in)/CategoryScreen";
import UsersScreen from "./pages/(logged-in)/UsersScreen";
import RolesScreen from "./pages/(logged-in)/RolesScreen";
import GenresScreen from "./pages/(logged-in)/GenresScreen";
import AgeScreen from "./pages/(logged-in)/AgeScreen";
import ProjectSearch from "./pages/(logged-in)/ProjectSearch";
import EditScreen from "./pages/(logged-in)/EditScreen";
import AuthProvider from "./features/layout/components/AuthProvider";

Modal.setAppElement("#root");

const router = createBrowserRouter([
  { path: "/login", element: <LoginScreen /> },
  {
    path: "/",
    errorElement: <NotFound />,
    element: <Navigate to="/project" replace />,
  },
  {
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),

    children: [
      { path: "/project", element: <MainScreen /> },
      { path: "/project/movie", element: <MovieScreen /> }, // ./movie/:id - future
      { path: "/project/add", element: <MovieAdd /> },
      { path: "/project/search", element: <ProjectSearch /> },
      { path: "/project/edit", element: <EditScreen /> },
      { path: "/main", element: <ProjectsOnMain /> },
      { path: "/category", element: <CategoryScreen /> },
      { path: "/users", element: <UsersScreen /> },
      { path: "/roles", element: <RolesScreen /> },
      { path: "/genre", element: <GenresScreen /> },
      { path: "/age", element: <AgeScreen /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
