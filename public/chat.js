const socket = io.connect("http://localhost:3000");

var counter = document.getElementById("counter");

var message = document.getElementById("message");

var handle = document.getElementById("handle");

var btn = document.getElementById("send");

var output = document.getElementById("output");

var feedback = document.getElementById("feedback");

btn.addEventListener("click", function() {
    socket.emit("chat", {message:message.value,handle:handle.value});
});


socket.on("chatting", function(data) {
    output.innerHTML+='<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
    feedback.style.display = 'none';
});


message.addEventListener("keypress", function() {
    socket.emit("typing", {handle:handle.value});
});

socket.on("typing", function(data) {
    feedback.style.display = 'block';
    feedback.innerHTML='<p><strong>' + data.handle + ':</strong> is Typing</p>';
    
});

socket.on('broadcast',function(data) {
    counter.innerHTML = data.description;
 });

/*socket.on('counter', function (data) {

    counter.innerHTML=data.count;

  });*/