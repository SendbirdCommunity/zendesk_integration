import "./styles.css"
import { parseHTMLJSON, loading } from "./utils";
import { fetchChannel, fetchMessages } from "./api";

var client = ZAFClient.init();
client.invoke('resize', { height: 700, width: '100%' });
var client = ZAFClient.init();

//Initialize sidebar UI
client.on('app.registered', () => init());

//After ticket is updated wait some time before fetching fresh channel
client.on('ticket.updated', () => {
    loading(true)
    setTimeout(() => init(), 3000)
});


const init = () => {

    //Show loading
    loading(true)

    //Fetch global params
    client.metadata().then(function (metadata) {
        const apiConfig = {
            headers: {
                "Api-Token": metadata.settings.sendbird_api_token,
                "Content-Type": "application/json, charset=utf8"
            },
            baseUrl: `https://api-${metadata.settings.sendbird_app_id}.sendbird.com/v3`
        }
        //Hide loader
        loading(false)
        updateViews(apiConfig)

    });
}



const updateViews = async (apiConfig) => {

    //Fetch required ticket data
    const ticket = await client.get("ticket")
    if (Object.keys(ticket.errors).length !== 0) return

    //Fetch required channel data
    const channel = await fetchChannel(client, `zendesk-${ticket.ticket.id}`, apiConfig);
    if (channel.error) return

    //Fetch required message data
    const messages = await fetchMessages(channel.data.channel.channel_url, client, 10, apiConfig)
    if (messages.error) return

    //Display required data
    updateTicketDetailsView(ticket.ticket)
    updateMemberView(channel)
    updateChannelView(channel)
    updateMessageView(messages)
}


//Display current ticket details. 
const updateTicketDetailsView = (ticket) => {
    document.getElementById("assignee-id").innerHTML = ticket.assignee.user ? ticket.assignee.user.id : "z-queue";
    document.getElementById("requester-id").innerHTML = ticket.requester.id;
}

//Display current Sendbird channel details. 
const updateMemberView = (channel) => {
    document.getElementById("channel_data").innerHTML = parseHTMLJSON(channel.data.members);
}

//Display current Sendbird channel details.
const updateChannelView = (channel) => {
    document.getElementById("channel-url").innerHTML = parseHTMLJSON(channel.data.channel_url);
}

//Update UI with message sample list
const updateMessageView = (messages) => {
    document.getElementById("message-history").innerHTML = parseHTMLJSON(messages.data);
}