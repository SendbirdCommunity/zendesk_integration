


import React, {useEffect} from "react";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import GroupChannelHandler from "@sendbird/uikit-react/handlers/GroupChannelHandler";

export const client = ZAFClient.init();

const ChannelEventListeners = () => {
    const store = useSendbirdStateContext();
    const sdk = store?.stores?.sdkStore?.sdk;
    useEffect(() => {
        if (sdk?.groupChannel) {
            const handler = new GroupChannelHandler({
                onMessageReceived: (channel) => {
                    console.log("JASON channel new message")
                    client.set('iconSymbol', 'newMessage');
                }
            });
            sdk?.groupChannel?.addGroupChannelHandler("myKey1", handler);
            console.log("JASON added handler");
        }
        return () => {
            sdk?.groupChannel?.removeGroupChannelHandler("myKey1");
        };
    }, [sdk]);
    return <></>;
};

export default ChannelEventListeners;
