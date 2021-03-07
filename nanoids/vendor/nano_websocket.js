export let transactionsArray = [];

function log_dtg(date=undefined) {
	let dtg = new Date();
    if (date !== undefined) dtg = new Date(date);
    return ''+ dtg.toDateString() +' '+ dtg.toLocaleTimeString();
}

function new_websocket(url, ready_callback, message_callback) {
    let socket = new WebSocket(url);
    socket.onopen = function() {
        console.log('WebSocket is now open');
        if (ready_callback !== undefined) ready_callback(this);
    }
    socket.onerror = function(e) {
        console.error('WebSocket error');
        console.error(e);
    }
    socket.onmessage = function(response) {
        // console.log('New message from: '+ url);
        // console.log(response);
        if (message_callback !== undefined) message_callback(response);
    }

    return socket;
}

new_websocket('wss://ws.mynano.ninja/', function(socket) {
    // onopen
    let params = {
        action: 'subscribe',
        topic: 'confirmation',
        ack: true
    }
    socket.send(JSON.stringify(params));
}, function(response) {
    // onmessage
    let data = JSON.parse(response.data);
    if (data.topic != 'confirmation') return;	// discard ack
    let message = data.message;
    message_handler(message);
});

function message_handler(message) {

    transactionsArray.unshift(message);

}