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
  products = element.getElementsByClassName("ui-grid-canvas")[0].children;
  var output = "Invoice:\n";
  var total = 0;
  //output += 'Product \t price \t size \t subtotal\n';
  for (item of products) {
    var text = item.innerText;
    const [title, brand, price, size, subtotal] = text.split("\n");
    total += parseFloat(subtotal.replace("$", ""));
    output += `${brand}-${title}\t${price}\t${size}\t${subtotal}\n`;
  }
  var tax = total * 0.1;
  output += `Total = $${total}\n`;
  output += `Tax(10%) = ${tax}\n`;
  total = total + tax;
  output += `Subtotal=${total}`;
  console.log(output);

  navigator.clipboard.writeText(output).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

send({ type: "enable" });
