import React, {useState, useEffect} from "react";

import  SBConversation from '@sendbird/uikit-react/Channel';
import SBChannelList from '@sendbird/uikit-react/ChannelList';
import SBChannelSettings from '@sendbird/uikit-react/ChannelSettings'
import withSendbird from '@sendbird/uikit-react/withSendbird';

function CustomizedApp(props) {
    // useState
    const [showSettings, setShowSettings] = useState(false);
    const [currentChannelUrl, setCurrentChannelUrl] = useState("");

    return (
        <div className="customized-app">

            <div className="sendbird-app__wrap">
                <div className="sendbird-app__channellist-wrap">
                    <SBChannelList
                        onChannelSelect={(channel) => {
                            if (channel && channel.url) {
                                setCurrentChannelUrl(channel.url);
                            }
                        }}
                    />
                </div>
                <div className="sendbird-app__conversation-wrap">
                    <SBConversation
                        channelUrl={currentChannelUrl}
                        onChatHeaderActionClick={() => {
                            setShowSettings(true);
                        }}
                    />
                </div>
            </div>
            {showSettings && (
                <div className="sendbird-app__settingspanel-wrap">
                    <SBChannelSettings
                        channelUrl={currentChannelUrl}
                        onCloseClick={() => {
                            setShowSettings(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default withSendbird(CustomizedApp);
