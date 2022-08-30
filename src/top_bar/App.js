import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChannelEventListeners from "./ChannelEventListerners";
import CustomizedApp from "./CustomizedApp";

const App = (user) => {
    return (
        <div className="App">
            <SendbirdProvider
                appId={"D70D1F08-9EEB-4C33-82B6-639E6D652564"}
                userId={user.user}
            >
                <ChannelEventListeners />
                <CustomizedApp/>
            </SendbirdProvider>

        </div>
    );
};

export default App;
