import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function Paragraph() {
    const context = useContext(ThemeContext);
    
    return (
        <p className={context.theme}>
            React Context is a way to manage state globally.
        </p>
    )
}