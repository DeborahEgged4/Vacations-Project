import MainRouting from "../../Routing/MainRouting/MainRouting";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import "./MainLayout.css";
import {useState} from "react";

function MainLayout(): JSX.Element {

    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <div className="MainLayout">
            <header>
                <Header />
            </header>
            <aside>
                <Menu
                    user={user}
                />
            </aside>
            <main>
                <MainRouting
                    user={user}
                    isLogged={isLogged}
                    isAdmin={isAdmin}
                    setUser={setUser}
                    setIsLogged={setIsLogged}
                    setIsAdmin={setIsAdmin}
                />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default MainLayout;
