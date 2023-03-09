import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "pages/home/Home";
import Login from "pages/login/Login";
import Profile from "pages/profile/Profile";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    }, 
    {
      path: "/home",
      element: isAuth ? ( 
                <Home /> 
               ) : ( 
                <Navigate to="/" />
               ),
    },
    {
      path: "/profile/:userId",
      element: isAuth ? ( 
                <Profile />
               ) : ( 
                <Navigate to="/" />
               ),
    }
  ])

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
