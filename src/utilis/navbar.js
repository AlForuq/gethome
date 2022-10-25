import { AddHousePage } from "../pages/AddHousePage";
import { DetailsPage } from "../pages/DetailsPage";
import { Generics } from "../pages/Generics";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyPropertiesPage } from "../pages/MyPropertiesPage";
import { PropertyPage } from "../pages/PropertyPage";

export const navbar = [
  {
    id: 1,
    title: "Home",
    path: "/home",
    Element: <HomePage />,
    search: "?",
    hidden: false, //Navbar bilan chiqadi va Navbar ichida chiqadi
    private: false,
    param: true,
  },
  {
    id: 2,
    title: "Properties",
    path: "/properties",
    Element: <PropertyPage />,
    search: "?",
    hidden: false, //Navbar bilan chiqadi va Navbar ichida chiqadi
    private: false,
    param: true,
  },
  {
    id: "2-1",
    title: "Properties",
    path: "/properties/:id",
    Element: <DetailsPage />,
    search: "?",
    hidden: true, //Navbar bilan chiqadi va Navbar ichida chiqmaydi
    private: false,
    param: true,
  },
  {
    id: 3,
    title: "Contacts",
    path: "/contacts",
    Element: <Generics />,
    search: "?",
    hidden: false,
    private: false,
    param: true,
  },
  {
    id: 4,
    title: "Sign In",
    path: "/signin",
    Element: <LoginPage />,
    search: "?",
    hidden: true,
    private: false,
    param: true,
  },
  {
    id: 5,
    title: "Sign Up",
    path: "/signup",
    Element: <Generics />,
    search: "?",
    hidden: true,
    private: false,
    param: true,
  },
  {
    id: 6,
    title: "My Properties",
    path: "/profile/properties",
    Element: <MyPropertiesPage />,
    search: "?",
    hidden: true,
    private: false,
    param: true,
  },
  {
    id: 7,
    title: "Add House",
    path: "/profile/add",
    Element: <AddHousePage />,
    search: "?",
    hidden: true,
    private: false,
    param: true,
  },
  {
    id: 8,
    title: "Add House",
    path: "/profile/add/:id",
    Element: <AddHousePage />,
    search: "?",
    hidden: true,
    private: false,
    param: true,
  },
];
