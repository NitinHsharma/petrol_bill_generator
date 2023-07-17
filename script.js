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
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}
function myFunction() {
    const fromDate = document.getElementById('FromDateId').value;
    const toDate = document.getElementById('ToDateId').value;
    const count = document.getElementById('count').value;
    const diffDays = Math.round(datediff(parseDate(fromDate), parseDate(toDate)) / count);
    let date = fromDate;
    for (let index = 0; index < count; index++) {
        var characters = 'ABCD';
        const billNo = characters.charAt(Math.floor(Math.random() * characters.length)) + (Math.floor(Math.random() * 1000) + 1000);
        document.getElementById("billNo").value = billNo;
        var hr = Math.floor(Math.random() * 18 + 5);
        var min = Math.floor(Math.random() * 59);
        var den = getRandomInt(729, 735) + "." + getRandomInt(0, 9) + "Kg/Cu.mtr";
        document.getElementById("timeId").value = pad(hr, 2) + ":" + pad(min, 2);
        document.getElementById("localVal").innerHTML = document.getElementById("localId").value;
        document.getElementById("nozelVal").innerHTML = "0" + (Math.floor(Math.random() * 4) + 1);
        document.getElementById("dateVal").innerHTML = date;
        document.getElementById("timeVal").innerHTML = document.getElementById("timeId").value;
        document.getElementById("volVal").innerHTML = pad(document.getElementById("volId").value, 8);
        document.getElementById("rateVal").innerHTML = document.getElementById("rateId").value;
        var num = document.getElementById("volId").value * document.getElementById("rateId").value;
        num = num.toFixed(2);
        const finalAmt = pad(num, 8);
        document.getElementById("amtVal").innerHTML = finalAmt;
        document.querySelector("#billVal1").innerHTML = document.getElementById("billNo").value;
        document.querySelector("#fipVal").innerHTML = pad(getRandomInt(1, 2), 2);
        // window.alert("done");


        var divContents = document.getElementById("dvContainer").innerHTML;
        var printWindow = window.open('', '', 'height=400,width=800');
        printWindow.document.title = `${date}_${billNo}_${num}`;
        printWindow.document.write(`<html><head><title>${date}_${billNo}_${num}</title>`);
        printWindow.document.write('</head><body >');
        printWindow.document.write(divContents.toString());
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();


        date = new Date(date);
        console.log(date);
        date.setDate(date.getDate() + diffDays);
        console.log(date);
        date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        console.log("Printing done for ==================");
    }
}
