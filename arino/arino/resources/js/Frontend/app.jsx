import "../bootstrap";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { Provider } from "react-redux";
import { store } from "@/Redux/app/store.js";
import CustomCursor from "@/Frontend/Components/CustomCursor";
const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}.jsx`),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Provider store={store}>
                <CustomCursor />
                <App {...props} />
            </Provider>
        );
    },
    progress: {
        color: "#fa4a17",
    },
});
