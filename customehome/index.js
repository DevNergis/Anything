date = document.getElementById("sysdate").children; //0 = dateㅣ1 = time
oldbg = document.getElementById("old"); //bg
newbg = document.getElementById("new"); //bg
app = document.getElementById("app");
search = document.getElementById("search");
input = document.getElementById("search_");
button = document.getElementById("svg");
w = window.innerWidth;
h = window.innerHeight;

nowKey = 1;

const ACCESS_KEY_1 = "n_XM9X3bwgVjq1sdXIE-jwFXSNEnCNgylSqC4wyo7ns";
const ACCESS_KEY_2 = "P4KAdR6BAyUqswxdKYhriezQhYi5MLXCGHQppn53tVc";

function modifyNumber(time) {
    if (parseInt(time) < 10) {
        return "0" + time;
    } else return time;
}

function updateTime() {
    sysdate = new Date();

    date[0].innerText = `${sysdate.getFullYear()}년 ${modifyNumber(
        sysdate.getMonth() + 1
    )}월 ${modifyNumber(sysdate.getDay())}일`;
    date[1].innerHTML = `${modifyNumber(sysdate.getHours())}:${modifyNumber(sysdate.getMinutes())}`;
}

async function getBg(key) {
    oldbg.style.backgroundImage = `url(${localStorage.getItem("bgUrl")})`;
    fetch(
        `https://api.unsplash.com/photos/random?client_id=${key}&query=nature&orientation=landscape`
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            nowKey = 1;
            localStorage.setItem("bgUrl", data.urls.full);
            newbg.style.backgroundImage = `url(${localStorage.getItem("bgUrl")})`;
            setTimeout(() => {
                newbg.classList.add("disappear");
            }, 500);
        })
        .catch((error) => {
            temp = error.message;
            if (temp.split(`', "`)[1].split(`"`)[0] == "Rate Limit exceeded") {
                if (nowKey == 1) {
                    getBg(ACCESS_KEY_2);
                } else {
                    console.warn(
                        "Unsplash 의 API 시간당 요청 제한 횟수에 도달했습니다. 잠시 뒤 다시 시도해 주십시오."
                    );
                }
            }
        });
}

// run
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        app.classList.add("show");
    }, 1);
});

button.addEventListener("click", () => {
    if (input.value.trim().length > 0) {
        window.location.href = `https://www.google.com/search?q=${input.value.trim()}`;
    }
});

input.addEventListener("keydown", (event) => {
    if (event.code == "Enter" && input.value.trim().length > 0) {
        input.blur();
        window.location.href = `https://www.google.com/search?q=${input.value.trim()}`;
    }
});

input.addEventListener("input", () => {
    getQueryComplete();
});

updateTime();
getBg(ACCESS_KEY_1);

setInterval(updateTime, 1000);
