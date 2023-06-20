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
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}


function myFunction() {
    const fromDate = document.getElementById('FromDateId').value;
    const toDate = document.getElementById('ToDateId').value;
    const count = document.getElementById('count').value;
    const diffDays = Math.round(datediff(parseDate(fromDate), parseDate(toDate)) / count);
    let date = fromDate;
    for (let index = 0; index < count; index++) {

        const lowerVolRange = document.getElementById('lowerVolRangeId').value;
        const upperVolRange = document.getElementById('upperVolRangeId').value;
        const vol = getRandomFromRange(lowerVolRange, upperVolRange);
        const lowerRateRange = document.getElementById('lowerRateRangeId').value;
        const upperRateRange = document.getElementById('upperRateRangeId').value;
        const rate = getRandomFromRange(lowerRateRange, upperRateRange);
        const totalAmount = (vol * rate).toFixed(2);
        const billNo = getRandomBillNo();
        // const imageName = getRandomImageName();


        document.getElementById("billNo").value = billNo;
        // var hr = Math.floor(Math.random() * 18 + 5);
        // var min = Math.floor(Math.random() * 59);
        var den = getRandomInt(729, 735) + "." + getRandomInt(0, 9) + "Kg/Cu.mtr";
        // document.getElementById("timeId").value = pad(hr, 2) + ":" + pad(min, 2);
        document.getElementById("localVal").innerHTML = generateRandomLocalId();
        document.getElementById("nozelVal").innerHTML = "0" + (Math.floor(Math.random() * 4) + 1);
        document.getElementById("dateVal").innerHTML = date;
        document.getElementById("timeVal").innerHTML = generateRandomTime();
        document.getElementById("volVal").innerHTML = pad(vol, 8);
        document.getElementById("rateVal").innerHTML = rate;

        // document.getElementById('logo').setAttribute('src', imageName);

        document.getElementById("amtVal").innerHTML = pad(totalAmount, 8);
        document.querySelector("#billVal1").innerHTML = billNo;
        document.querySelector("#fipVal").innerHTML = pad(getRandomInt(1, 2), 2);
        // window.alert("done");
        date = new Date(date);
        date.setDate(date.getDate() + diffDays);
        date = `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)}`;

        var divContents = document.getElementById("dvContainer").innerHTML;
        var printWindow = window.open('', '', 'height=400,width=800');
        printWindow.document.write('<html><head><title>DIV Contents</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(divContents.toString());
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
        console.log("Printing done for ==================");
    }


}
function filldate() {
    document.getElementById('FromDateId').value = document.getElementById('FromDateId').value.split('-').reverse().join("");
}

function redirect() {
    window.open('./thankyou.html');
}

window.onload = function () {
    // set fromdateId to last month date of today
    document.getElementById('ToDateId').valueAsDate = new Date();
    const dateInput = document.getElementById('FromDateId');
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1); // Go back one month
    currentDate.setDate(20); // Set day to 20th
    const formattedDate = currentDate.toISOString().substring(0, 10); // Format as YYYY-MM-DD
    dateInput.value = formattedDate;

}


function generateRandomTime() {
    const isMorning = Math.random() < 0.5; // Randomly select morning or night

    let hours, minutes, period;
    if (isMorning) {
        // Morning time: between 9 AM and 11 AM
        hours = Math.floor(Math.random() * 3) + 9; // Random hours between 9 and 11
        period = 'AM';
    } else {
        // Night time: between 9 PM and 11:59 PM (midnight)
        hours = Math.floor(Math.random() * 4) + 9; // Random hours between 9 and 12
        period = 'PM';
    }
    minutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59

    if (hours === 12) {
        period = isMorning ? 'PM' : 'AM'; // Adjust period for 12 AM/PM
    }

    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const time = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    return time;
}

function generateRandomLocalId() {
    var characters = '0123456789';
    var result = '';
    for (var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


function getRandomBillNo() {
    var characters = 'ABCD'
    return characters.charAt(Math.floor(Math.random() * characters.length)) + (Math.floor(Math.random() * 1000) + 1000);
}

function getRandomFromRange(lowerRange, upperRange) {
    console.log(lowerRange, upperRange);
    var randomNum = Math.floor(Math.random() * (parseFloat(upperRange) - parseFloat(lowerRange) + 1)) + parseFloat(lowerRange);
    console.log(randomNum);
    return randomNum.toFixed(2);
}

function getRandomImageName() {
    var images = [
        'logo_1.png',
        'logo.png',
        'logo_w_2.png',
        'logo_w.png',
    ];
    return images[Math.floor(Math.random() * images.length)];
}
