import "./styles.css"
import { createRoot } from "react-dom/client";
import "@sendbird/uikit-react/dist/index.css";
import App from "./App"

//Collect the Zendesk client
export const client = ZAFClient.init();

//Create set the size of the top bar client
client.invoke('resize', { width: '800px',height: '500px'});

//The the topbar icon shape and color. SVG symbols found in icon_top_bar.svg
client.on('pane.activated', () => client.set('iconSymbol', 'online'));
client.on('app.registered', () => client.set('iconSymbol', 'online'));

//Render the UIKit in to the top bar client
const root = createRoot(document.getElementById("app"))
client.get("currentUser").then(user => root.render(<App env={"dev"} user={String(user.currentUser.id)} />));

