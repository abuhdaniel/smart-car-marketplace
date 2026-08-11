/**
 * Main navigation bar.
 */
export function Navbar() {
    return `
        <header class="navbar">

            <div class="container nav-container">

                <div class="logo">
                    🚗 Smart Car Marketplace
                </div>

                <nav>
                    <ul>

                        <li>
                            <a href="#home">
                                Home
                            </a>
                        </li>

                        <li>
                            <a href="#vehicles">
                                Vehicles
                            </a>
                        </li>

                        <li>
                            <a href="#compare">
                                Compare
                            </a>
                        </li>

                        <li>
                            <a href="#favorites">
                                Favorites
                            </a>
                        </li>

                        <li>
                            <a href="#cart">
                                Cart <span id="cart-count">(0)</span>
                            </a>
                        </li>

                        <li>
                            <a href="#about">
                                About
                            </a>
                        </li>

                    </ul>
                </nav>

            </div>

        </header>
    `;
}