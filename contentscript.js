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

  element = document.getElementsByClassName("cart")[0];
  var items = element.getElementsByClassName("items")[0].getElementsByTagName('tbody');
;
  var output = "Invoice:\n";
  const menuItem = (item, price) => item+price.padStart(40-item.length,".")
  for (p of items){
    if (p.children.length == 0){
      continue;
    }
    var row = p.children[0];
    const [,title, id, weight, price, quantity, total] = row.children;
    //var name = row[1].
    if (title.innerText == '') 
      continue;
    var weightText = weight.getElementsByTagName('input')[0].value;
    weightText = weightText.padStart(20-title.innerText.length,' ');
    output += `${title.innerText}${weightText}${weight.innerText}\t${price.innerText}\t${quantity.innerText}\t${total.innerText}\n`;

  }

  const cartTotal = element.getElementsByClassName("totals form-inline")[0].children[1].children[0].children;

  for (item of cartTotal){
    var val = item.children[1].innerText;
    var caption = item.children[0].innerText;
    output+= caption + ' ' + val.padStart(35-caption.length, ' ');
    output+='\n';
  }
//   const subtotal  = cartTotal[0].children[1].innerText;
//   const tax  = cartTotal[1].children[1].innerText;
//   const total  = cartTotal[2].children[1].innerText;
//   output += `Subtotal = ${subtotal}\n`
//   output += `Tax = ${tax}\n`
//   output += `Total = ${total}`

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
