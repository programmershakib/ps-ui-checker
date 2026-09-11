import { ThemeProvider } from "../index";
import { useState } from "react";
import Content from "./Content";
import Topbar from "./Topbar";

const App = () => {
    const [mode, setMode] = useState<"light" | "dark">("dark");

    return (
        <ThemeProvider
            mode={mode}
            style={{
                backgroundColor: "var(--ps-background)",
                width: "100%",
                height: "100%",
                minHeight: "100vh",
            }}
        >
            <Topbar mode={mode} setMode={setMode} />

            <Content />
        </ThemeProvider>
    );
};

export default App;
