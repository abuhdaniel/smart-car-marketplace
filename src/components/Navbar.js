export function Navbar() {
    return `
    <header class="navbar">

        <div class="container nav-container">

            <h2 class="logo">🚗 Smart Car Marketplace</h2>

            <nav>

                <ul>

                    <li><a href="#">Home</a></li>
                    <li><a href="#">Vehicles</a></li>
                    <li><a href="#">Compare</a></li>
                    <li><a href="#">Favorites</a></li>
                    <li><a href="#">Cart <span id="cart-count">(0)</span></a></li>
                    <li><a href="#">About</a></li>

                </ul>

            </nav>

        </div>

    </header>
    `;
}