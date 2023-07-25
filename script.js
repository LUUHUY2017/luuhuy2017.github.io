getIndex();
GetCoinGood();
setInterval(getIndex, 1000);
setInterval(GetCoinGood, 1000);

document.getElementById("myBtn").addEventListener("click", onShowHideModal);
document.getElementById("confirm").addEventListener("click", onConfrim);




function getHref(name) {
    var url = "https://attlas.io/futures/" + name;
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let androidURL = 'https://play.google.com/store/apps/details?id=io.attlas';
    let iosURL = 'https://apps.apple.com/tr/app/id1565481713';
    let iosURL2 = 'https://apps.apple.com/tr/app/myApp/id1565481713';
    let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (/android/i.test(userAgent)) {
        url = androidURL;
    }
    else if (isSafari) {
        url = iosURL;
    }
    return url;
}



async function getIndex() {
    document.getElementById("EventTime").innerHTML = dateToDDMMYYYHHMMSS(new Date()) || "";
    getIndex1();
}
async function getIndex1() {
    var symbol = localStorage.getItem("symbol");
    //console.warn(symbol);
    if (symbol == null)
        arr1 = ["BTC"];
    else {
        symbol = symbol.replace(" ", "").replace(/ /g, '').toUpperCase();
        var arr1 = symbol.split(',');
    }


    const res = await fetch("https://api.attlas.io/api/v1/futures/market_watch");
    const record = await res.json();
    var data = record.data;
    var rest = data.filter(item => arr1.includes(item.b));
    rest.sort();
    //console.warn(rest);

    const result = rest.reduce(function (r, a) {
        r[a.b] = r[a.b] || [];
        r[a.b].push(a);
        return r;
    }, Object.create(null));

    var groups = Object.keys(result).map(function (key) {
        //console.warn(result[key]);
        return {
            symbol: key,
            usd: result[key][0].p,
            usd_ph: result[key][0].ph,
            usd_pw: result[key][0].pw,
            usd_p1m: result[key][0].p1m,
            usd_p3m: result[key][0].p3m,
            usd_h: result[key][0].h,
            usd_lh: result[key][0].lh,
            usd_ld: result[key][0].ld,
            usd_all: result[key][0],

            vnd: result[key][1].p,
            vnd_ph: result[key][1].ph,
            vnd_pw: result[key][1].pw,
            vnd_p1m: result[key][1].p1m,
            vnd_p3m: result[key][1].p3m,
            vnd_h: result[key][1].h,
            vnd_lh: result[key][1].lh,
            vnd_ld: result[key][1].ld,
            vnd_all: result[key][1],
        };
    });
    //console.log(groups);

    var para = "";
    for (var i = 0; i < groups.length; i++) {

        var percent = 0;
        var compare = "";
        if (groups[i].usd >= groups[i].usd_ld) {
            compare = "+";
            percent = ((groups[i].usd - groups[i].usd_ld) / groups[i].usd_ld * 100).toFixed(2);
        }
        else {
            compare = "-";
            percent = ((groups[i].usd_ld - groups[i].usd) / groups[i].usd_ld * 100).toFixed(2);
        }


        para += `<tr>`;
        para += "<td style='position:relative' >"
            + "<a  target='_blank' href='" + getHref(groups[i].vnd_all.s) + "' >" + groups[i].symbol + "</a>"

            + "<span style='position:absolute; top:1px; margin-left:2px;  font-size:11px; color: " + (groups[i].usd >= groups[i].usd_p1m ? " #3ab829;" : "#fd254d;") + " '>" + new Intl.NumberFormat("de-DE").format(groups[i].usd_p1m) + " (" + new Intl.NumberFormat("de-DE").format(groups[i].vnd_p1m) + ")" + "</span>"
            + "<span style='position:absolute; top:15px; margin-left:2px;  font-size:11px; color: " + (groups[i].usd >= groups[i].usd_p3m ? " #3ab829;" : "#fd254d;") + " '>" + new Intl.NumberFormat("de-DE").format(groups[i].usd_p3m) + " (" + new Intl.NumberFormat("de-DE").format(groups[i].vnd_p3m) + ")" + "</span>"

            + "<span style='position:absolute; top:1px; right:0; font-size:14px; color: " + (compare == "+" ? " #3ab829;" : "#fd254d;") + " '>" + compare + percent + "%" + "</span>"
            + "<span style='position:absolute; bottom:0; right:0; font-size:14px; color: " + (groups[i].usd >= groups[i].usd_pw ? " #3ab829;" : "#fd254d;") + " '>" + new Intl.NumberFormat("de-DE").format(groups[i].usd_pw) + "</span>"

        para += "</td>";


        para += "<td style='position:relative' >"
            + new Intl.NumberFormat("de-DE").format(groups[i].usd)

            + "<span style='position:absolute; top:1px; margin-left:2px;  font-size:11px; color: #3ab829;'>" + new Intl.NumberFormat("de-DE").format(groups[i].usd_h) + "</span>"
            + "<span style='position:absolute; top:15px; margin-left:2px;  font-size:11px; color: #fd254d;'>" + new Intl.NumberFormat("de-DE").format(groups[i].usd_lh) + "</span>"

            + "<span style='position:absolute; bottom:0; right:0; font-size:14px;  color:  " + (groups[i].usd >= groups[i].usd_ph ? " #3ab829;" : "#fd254d;") + " '>" + new Intl.NumberFormat("de-DE").format(groups[i].usd_ph) + "</span>"

        para += "</td>";

        para += "<td style='position:relative' >"
            + new Intl.NumberFormat("de-DE").format(groups[i].vnd)

            + "<span style='position:absolute; top:1px; margin-left:2px;  font-size:11px; color: #3ab829;'>" + new Intl.NumberFormat("de-DE").format(groups[i].vnd_h) + "</span>"
            + "<span style='position:absolute; top:15px; margin-left:2px;  font-size:11px; color: #fd254d;'>" + new Intl.NumberFormat("de-DE").format(groups[i].vnd_lh) + "</span>"

            + "<span style='position:absolute; bottom:0; right:0; font-size:14px; color:" + (groups[i].vnd >= groups[i].vnd_ph ? " #3ab829;" : "#fd254d;") + " '>" + new Intl.NumberFormat("de-DE").format(groups[i].vnd_ph) + "</span>"

        para += "</td>";



        para += `</tr>`;
    }
    const element = document.getElementById("data");
    element.innerHTML = para;

    //senMessage();
}



var isSent = false;
async function GetCoinGood() {

    const res = await fetch("https://api.attlas.io/api/v1/futures/market_watch");
    const record = await res.json();
    var rest = record.data;
    rest.sort();
    //console.warn(rest);

    const result = rest.reduce(function (r, a) {
        r[a.b] = r[a.b] || [];
        r[a.b].push(a);
        return r;
    }, Object.create(null));

    var groups = Object.keys(result).map(function (key) {
        //console.warn(result[key]);
        return {
            symbol: key,
            usd: result[key][0].p,
            usd_ph: result[key][0].ph,
            usd_pw: result[key][0].pw,
            usd_p1m: result[key][0].p1m,
            usd_p3m: result[key][0].p3m,
            usd_h: result[key][0].h,
            usd_lh: result[key][0].lh,
            usd_ld: result[key][0].ld,
            usd_all: result[key][0],

            vnd: result[key][1].p,
            vnd_ph: result[key][1].ph,
            vnd_pw: result[key][1].pw,
            vnd_p1m: result[key][1].p1m,
            vnd_p3m: result[key][1].p3m,
            vnd_h: result[key][1].h,
            vnd_lh: result[key][1].lh,
            vnd_ld: result[key][1].ld,
            vnd_all: result[key][1],
        };
    });
    console.warn(groups);


    var arr = [];

    var para = "";
    for (var i = 0; i < groups.length; i++) {

        var percent = 0;
        var compare = "";
        if (groups[i].usd >= groups[i].usd_ld) {
            compare = "+";
            percent = ((groups[i].usd - groups[i].usd_ld) / groups[i].usd_ld * 100).toFixed(2);
        }
        else {
            compare = "-";
            percent = ((groups[i].usd_ld - groups[i].usd) / groups[i].usd_ld * 100).toFixed(2);
        }
        groups[i].percent = percent;
        groups[i].compare = compare;
    }

    var topValues = groups.sort((a, b) => b.percent - a.percent).slice(1, 3);
    console.log(topValues);

    var para = "";

    for (var i = 0; i < topValues.length; i++) {
        para += `<tr>`;
        para += "<td style='position:relative' >"
            + "<a  target='_blank' href='" + getHref(topValues[i].vnd_all.s) + "' >" + topValues[i].symbol + "</a>"

            + "<span style='position:absolute; top:1px; margin-left:2px;  font-size:11px; color: " + (topValues[i].usd >= topValues[i].usd_p1m ? " #3ab829;" : "#fd254d;") + " '>" + new Intl.NumberFormat("de-DE").format(topValues[i].usd_p1m) + " (" + new Intl.NumberFormat("de-DE").format(topValues[i].vnd_p1m) + ")" + "</span>"
            + "<span style='position:absolute; top:15px; margin-left:2px;  font-size:11px; color: " + (topValues[i].usd >= topValues[i].usd_p3m ? " #3ab829;" : "#fd254d;") + " '>" + new Intl.NumberFormat("de-DE").format(topValues[i].usd_p3m) + " (" + new Intl.NumberFormat("de-DE").format(topValues[i].vnd_p3m) + ")" + "</span>"

            + "<span style='position:absolute; top:1px; right:0; font-size:14px; color: " + (topValues[i].compare == "+" ? " #3ab829;" : "#fd254d;") + " '>" + topValues[i].compare + topValues[i].percent + "%" + "</span>"
            + "<span style='position:absolute; bottom:0; right:0; font-size:14px; color: " + (topValues[i].usd >= topValues[i].usd_pw ? " #3ab829;" : "#fd254d;") + " '>" + new Intl.NumberFormat("de-DE").format(topValues[i].usd_pw) + "</span>"

        para += "</td>";


        para += "<td style='position:relative' >"
            + new Intl.NumberFormat("de-DE").format(topValues[i].usd)

            + "<span style='position:absolute; top:1px; margin-left:2px;  font-size:11px; color: #3ab829;'>" + new Intl.NumberFormat("de-DE").format(topValues[i].usd_h) + "</span>"
            + "<span style='position:absolute; top:15px; margin-left:2px;  font-size:11px; color: #fd254d;'>" + new Intl.NumberFormat("de-DE").format(topValues[i].usd_lh) + "</span>"

            + "<span style='position:absolute; bottom:0; right:0; font-size:14px;  color:  " + (topValues[i].usd >= topValues[i].usd_ph ? " #3ab829;" : "#fd254d;") + " '>" + new Intl.NumberFormat("de-DE").format(topValues[i].usd_ph) + "</span>"

        para += "</td>";

        para += "<td style='position:relative' >"
            + new Intl.NumberFormat("de-DE").format(topValues[i].vnd)

            + "<span style='position:absolute; top:1px; margin-left:2px;  font-size:11px; color: #3ab829;'>" + new Intl.NumberFormat("de-DE").format(topValues[i].vnd_h) + "</span>"
            + "<span style='position:absolute; top:15px; margin-left:2px;  font-size:11px; color: #fd254d;'>" + new Intl.NumberFormat("de-DE").format(topValues[i].vnd_lh) + "</span>"

            + "<span style='position:absolute; bottom:0; right:0; font-size:14px; color:" + (topValues[i].vnd >= topValues[i].vnd_ph ? " #3ab829;" : "#fd254d;") + " '>" + new Intl.NumberFormat("de-DE").format(topValues[i].vnd_ph) + "</span>"

        para += "</td>";

        para += `</tr>`;

        var compareName = topValues[i].compare == "+" ? " tăng " : " giảm ";
        var mess = "Mã " + topValues[i].symbol + compareName + "đột biến" + topValues[i].percent + " %";

        senMessage(mess);
    }

    const element = document.getElementById("data2");
    element.innerHTML = para;


}






function dateToDDMMYYYHHMMSS(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    return '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y + "  " + (hh <= 9 ? '0' + hh : hh) + ":" + (mm <= 9 ? '0' + mm : mm) + ":" + (ss <= 9 ? '0' + ss : ss);
}
function onShowHideModal() {
    var x = document.getElementById("myModal");
    if (x.style.display === "none") {
        x.style.display = "block";

    } else {
        x.style.display = "none";
    }
    var symbol = localStorage.getItem("symbol");
    if (symbol != null) {
        symbol = symbol.replace(" ", "").replace(/ /g, '').toUpperCase();
        document.getElementById("name").value = symbol;
    }
}
function onConfrim() {
    const symbol_get = document.getElementById("name").value;
    localStorage.setItem("symbol", symbol_get);

    var x = document.getElementById("myModal");
    x.style.display = "none";
}

var input = document.getElementById("name");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const symbol_get = document.getElementById("name").value;
        localStorage.setItem("symbol", symbol_get);
    }
});

function senMessage(mess) {
    try {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };
        fetch("https://api.telegram.org/bot6514337909:AAGl5ZmX_Fi7yXcJgnSPGQd6xaXUpDCYVBI/sendMessage?chat_id=1062521039&text= " + mess, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    } catch (error) {
        console.error(error);
    }
}
async function senMessage1() {
    try {
        var mess = "Đây là con bot tự động gửi từ huy";
        var settings = {
            "url": "https://api.telegram.org/bot6514337909:AAGl5ZmX_Fi7yXcJgnSPGQd6xaXUpDCYVBI/sendMessage?chat_id=1062521039&text=" + mess,
            "method": "POST",
            "timeout": 0,
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    } catch (error) {
        console.error(error);
    }
}

