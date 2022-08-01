
var client = ZAFClient.init();

client.on('ticket.saved', function(data) {

  console.log('FROM LOCAL BACKGROUND DEVELOPMENT: Ticket saved ');
});

client.on('app.registered', function(){
  console.log("FROM LOCAL BACKGROUND DEVELOPMENT: Background listener got registered")
})
