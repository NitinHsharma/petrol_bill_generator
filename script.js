function pad(num, size) {
  var s = "000000000" + num;
  return s.substr(s.length - size);
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function datediff(first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}
function parseDate(str) {
  var mdy = str.split("-");
  return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}

function myFunction() {
  const fromDate = document.getElementById("FromDateId").value;
  const toDate = document.getElementById("ToDateId").value;
  const count = parseInt(document.getElementById("count").value);
  const diffDays = Math.round(
    datediff(parseDate(fromDate), parseDate(toDate)) / count,
  );
  let date = fromDate;

  const billHtmls = [];

  for (let index = 0; index < count; index++) {
    const lowerVolRange = document.getElementById("lowerVolRangeId").value;
    const upperVolRange = document.getElementById("upperVolRangeId").value;
    const vol = getRandomFromRange(lowerVolRange, upperVolRange);
    const lowerRateRange = document.getElementById("lowerRateRangeId").value;
    const upperRateRange = document.getElementById("upperRateRangeId").value;
    const rate = getRandomFromRange(lowerRateRange, upperRateRange);
    const totalAmount = (vol * rate).toFixed(2);
    const billNo = getRandomBillNo();

    document.getElementById("billNo").value = billNo;
    document.getElementById("localVal").innerHTML = generateRandomLocalId();
    document.getElementById("nozelVal").innerHTML =
      "0" + (Math.floor(Math.random() * 4) + 1);
    document.getElementById("dateVal").innerHTML = date;
    document.getElementById("timeVal").innerHTML = generateRandomTime();
    document.getElementById("volVal").innerHTML = pad(vol, 8);
    document.getElementById("rateVal").innerHTML = rate;
    document.getElementById("amtVal").innerHTML = pad(totalAmount, 8);
    document.querySelector("#billVal1").innerHTML = billNo;
    document.querySelector("#fipVal").innerHTML = pad(getRandomInt(1, 2), 2);

    // Capture bill HTML with reset positioning so it renders correctly in the grid
    const billDiv = document.querySelector("#dvContainer > div");
    const clone = billDiv.cloneNode(true);
    clone.style.position = "relative";
    clone.style.left = "0";
    clone.style.top = "0";
    clone.style.margin = "0";
    clone.style.marginLeft = "0";
    clone.style.zoom = "0.70";
    billHtmls.push(clone.outerHTML);

    date = new Date(date);
    date.setDate(date.getDate() + diffDays);
    date = `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)}`;

    console.log("Bill generated for: " + billNo);
  }

  printBillBatch(billHtmls);
}

// zoom: 0.70 is applied to each bill div (layout-level scaling, unlike transform which can be skipped in Chrome's first print pass).
// Zoomed bill: 312×0.70=218px wide, 730×0.70=511px tall. Cell is 70mm × 135mm (~265×510px). 2 rows × 135mm = 270mm fits within A4 printable area even with default browser margins.
function printBillBatch(billHtmls) {
  const BILLS_PER_PAGE = 6;
  const pageStyles = getPageStyles();
  const printWindow = window.open("", "", "height=900,width=1200");

  printWindow.document.write(`<!DOCTYPE html><html><head>
<base href="${window.location.href}">
<title>Bills</title>
<style>
@page {
    size: A4 portrait;
    margin: 0;
}
${pageStyles}
* { box-sizing: border-box; }
body { margin: 0; padding: 0; width: 210mm; }
.page {
    width: 210mm;
    height: 290mm;
    display: grid;
    grid-template-columns: repeat(3, 70mm);
    grid-template-rows: repeat(2, 135mm);
    row-gap: 20px;
    page-break-after: always;
    break-after: page;
    break-inside: avoid;
    overflow: hidden;
}
.bill-cell {
    width: 70mm;
    height: 135mm;
    overflow: hidden;
    position: relative;
}
@media print {
    .page:last-child {
        page-break-after: avoid;
        break-after: avoid;
    }
}
</style>
</head><body>`);

  for (let i = 0; i < billHtmls.length; i += BILLS_PER_PAGE) {
    const pageBills = billHtmls.slice(i, i + BILLS_PER_PAGE);
    printWindow.document.write('<div class="page">');
    for (const html of pageBills) {
      printWindow.document.write(`<div class="bill-cell">${html}</div>`);
    }
    printWindow.document.write("</div>");
  }

  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
}

function getPageStyles() {
  let css = "";
  try {
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          css += rule.cssText + "\n";
        }
      } catch (e) {}
    }
  } catch (e) {}
  return css;
}

function filldate() {
  document.getElementById("FromDateId").value = document
    .getElementById("FromDateId")
    .value.split("-")
    .reverse()
    .join("");
}

function redirect() {
  window.open("./thankyou.html");
}

window.onload = function () {
  document.getElementById("ToDateId").valueAsDate = new Date();
  const dateInput = document.getElementById("FromDateId");
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  currentDate.setDate(20);
  const formattedDate = currentDate.toISOString().substring(0, 10);
  dateInput.value = formattedDate;
};

function generateRandomTime() {
  const isMorning = Math.random() < 0.5;

  let hours, minutes, period;
  if (isMorning) {
    hours = Math.floor(Math.random() * 3) + 9;
    period = "AM";
  } else {
    hours = Math.floor(Math.random() * 4) + 9;
    period = "PM";
  }
  minutes = Math.floor(Math.random() * 60);

  if (hours === 12) {
    period = isMorning ? "PM" : "AM";
  }

  const formattedHours = hours % 12 || 12;
  const time = `${formattedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
  return time;
}

function generateRandomLocalId() {
  var characters = "0123456789";
  var result = "";
  for (var i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function getRandomBillNo() {
  var characters = "ABCD";
  return (
    characters.charAt(Math.floor(Math.random() * characters.length)) +
    (Math.floor(Math.random() * 1000) + 1000)
  );
}

function getRandomFromRange(lowerRange, upperRange) {
  console.log(lowerRange, upperRange);
  var randomNum =
    Math.floor(
      Math.random() * (parseFloat(upperRange) - parseFloat(lowerRange) + 1),
    ) + parseFloat(lowerRange);
  console.log(randomNum);
  return randomNum.toFixed(2);
}

function getRandomImageName() {
  var images = ["logo_1.png", "logo.png", "logo_w_2.png", "logo_w.png"];
  return images[Math.floor(Math.random() * images.length)];
}
