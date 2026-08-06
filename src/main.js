import "./assets/css/main.css";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";

const app = document.querySelector("#app");

app.innerHTML = `
    ${Navbar()}

    ${Hero()}

    ${Home()}

    ${Footer()}
`;