
export const fetchChannel = async (client, channelUrl, apiConfig) => {

  const settings = {
    url: `${apiConfig.baseUrl}/group_channels/${channelUrl}?show_member=true`,
    headers: apiConfig.headers,
    type: 'GET'
  };
  try {
    return { error: false, data: await client.request(settings) }
  } catch (e) {
    return { error: true, message: "Channel not fetched!", description: e }
  }
};

export const fetchMessages = async (channelUrl, client, count, apiConfig) => {

  const settings = {
    url: `${apiConfig.baseUrl}/group_channels/${channelUrl}/messages/?message_ts=${Date.now()}&prev_limit=${count}`,
    headers: apiConfig.headers,
    type: 'GET'
  };
  try {
    return { error: false, data: await client.request(settings) }
  } catch (e) {
    return { error: true, message: "Messages not fetched!", description: e }
  }
};