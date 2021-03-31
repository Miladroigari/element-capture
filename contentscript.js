chrome.extension.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.type === "start") {
    start();
  }
  sendResponse({});
});

function send(request) {
  chrome.extension.sendMessage(request, function (response) {});
}

function start() {
  var element,
    dimensions = {};

  element = document.getElementsByClassName("panel panel-default")[2];
  dimensions.top = -window.scrollY;
  dimensions.left = -window.scrollX;
  var elem = document.getElementsByClassName("panel panel-default")[2];
  while (elem !== document.body) {
    dimensions.top += elem.offsetTop;
    dimensions.left += elem.offsetLeft;
    elem = elem.offsetParent;
  }
  dimensions.width = element.offsetWidth;
  dimensions.height = element.offsetHeight;
  send({ type: "up", dimensions: dimensions });
}

send({ type: "enable" });
