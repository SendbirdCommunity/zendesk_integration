const client = ZAFClient.init();

const topBarClientPromise = client.get('instances').then(function(instancesData) {
  console.log("bacground working")
  let instances = instancesData.instances;
  for (let instanceGuid in instances) {
    if (instances[instanceGuid].location === "top_bar") {
      return client.instance(instanceGuid);
    }
  }
});

client.on("app.registered",() => {
  topBarClientPromise.then(topBarClient => {
      topBarClient.invoke('popover', 'show');
      topBarClient.invoke('popover', 'hide');
  });
});