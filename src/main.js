import "./assets/css/main.css";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { CartSummary } from "./components/CartSummary";

document.querySelector("#app").innerHTML = `
    ${Navbar()}

    ${Hero()}

    ${Home()}

    ${CartSummary()}

    ${Footer()}
`;