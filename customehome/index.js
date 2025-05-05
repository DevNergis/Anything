date = document.getElementById("sysdate").children; //0 = dateㅣ1 = time
oldbg = document.getElementById("old"); //bg
newbg = document.getElementById("new"); //bg
app = document.getElementById("app");
bar = document.getElementById("bar");
search = document.getElementById("search");
button = document.getElementById("btn");
google = document.getElementById("google");
w = window.innerWidth;
h = window.innerHeight;
resizeTimer = 0;

rawDataUrl = "";

nowKey = 1;

const day = [
	"일요일",
	"월요일",
	"화요일",
	"수요일",
	"목요일",
	"금요일",
	"토요일",
];

const ACCESS_KEY_1 = "n_XM9X3bwgVjq1sdXIE-jwFXSNEnCNgylSqC4wyo7ns";
const ACCESS_KEY_2 = "P4KAdR6BAyUqswxdKYhriezQhYi5MLXCGHQppn53tVc";

function updateTime() {
	sysdate = new Date();

	date[0].innerText = `${sysdate.getMonth() + 1}월 ${sysdate.getDate()}일 ${
		day[sysdate.getDay()]
	}`;
	date[1].innerHTML = `${sysdate.getHours()}:${sysdate
		.getMinutes()
		.toString()
		.padStart(2, "0")}`;
}

async function getBg(key, keynum = 1) {
	nowKey = keynum;
	oldbg.style.backgroundImage = `url(${localStorage.getItem("bgUrl")})`;
	fetch(
		`https://api.unsplash.com/photos/random?client_id=${key}&query=korea&orientation=landscape`
	)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			localStorage.setItem("rawBgUrl", data.urls.raw);

			setImage(localStorage.getItem("rawBgUrl"));
		})
		.catch((error) => {
			temp = error.message;
			if (temp.split(`', "`)[1].split(`"`)[0] == "Rate Limit exceeded") {
				if (nowKey == 1) {
					getBg(ACCESS_KEY_2, 2);
				} else {
					console.warn(
						"Unsplash 의 API 시간당 요청 제한 횟수에 도달했습니다. 잠시 뒤 다시 시도해 주십시오."
					);
				}
			}
		});
}

async function setImage(data) {
	newbg.style.opacity = 0;
	localStorage.setItem(
		"bgUrl",
		data + `&w=${w}&h=${h}&dpr=2&auto=format&fit=crop`
	);

	newbg.style.backgroundImage = `url(${localStorage.getItem("bgUrl")})`;

	const img = new Image();
	img.src = localStorage.getItem("bgUrl");

	img.onload = () => {
		newbg.style.backgroundImage = `url(${localStorage.getItem("bgUrl")})`;
		newbg.style.opacity = 1;
	};
}

button.addEventListener("click", () => {
	if (search.value.trim().length > 0) {
		window.location.href = `https://www.google.com/search?q=${search.value.trim()}`;
	}
});

google.addEventListener("click", () => {
	window.location.href = `https://duckduckgo.com/`;
});

search.addEventListener("keydown", (event) => {
	if (event.code == "Enter" && search.value.trim().length > 0) {
		search.blur();
		window.location.href = `https://duckduckgo.com/?q=${search.value.trim()}`;
	}
});

search.addEventListener("input", () => {
	if (search.value.length > 0) {
		bar.style.background = "rgba(255,255,255,0.8)";
	} else {
		bar.style.background = "";
	}
});

window.addEventListener("resize", () => {
	clearTimeout(resizeTimer);

	resizeTimer = setTimeout(() => {
		console.log("Resize ended");
		oldbg.style.backgroundImage = `url(${localStorage.getItem("bgUrl")})`;
		w = window.innerWidth;
		h = window.innerHeight;
		setImage(localStorage.getItem("rawBgUrl"));
	}, 500);
});

updateTime();
getBg(ACCESS_KEY_1, 1);

setInterval(updateTime, 500);
