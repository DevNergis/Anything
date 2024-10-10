const input = document.getElementById("encryptInput");
const underline = document.getElementsByClassName("input")[0];
const enter = document.getElementsByClassName("enter")[0];
const enterText = document.getElementsByClassName("enterText")[0];
const result = document.getElementsByClassName("result")[0];

enterText.textContent = "Enter";

input.addEventListener("input", () => {
    if (input.value != "") {
        underline.classList.add("focused");
        enterText.innerHTML = "Enter";
    } else {
        underline.classList.remove("focused");
    }
});

input.addEventListener("focus", () => {
    underline.classList.add("focused");
});

input.addEventListener("blur", () => {
    if (input.value == "") {
        underline.classList.remove("focused");
    }
});

function encryption(input) {
    const encryptString =
        "S-*{lER3#uXhHeJnN+Do]M6vFaYQ~P7dA8UWGry=1!g$.0/IqtpTCj}x2_zmL,5?f4%k[VO@Z9bsBw\\ic&K";
    let newEncryptString = "";
    let encoded = "";
    let base64Encode = "";

    function toBase64(bytes) {
        const binString = String.fromCodePoint(...bytes);
        return btoa(binString);
    }

    function isWellFormed(str) {
        if (typeof str.isWellFormed != "undefined") {
            return str.isWellFormed();
        } else {
            try {
                encodeURIComponent(str);
                return true;
            } catch (error) {
                return false;
            }
        }
    }

    if (isWellFormed(input)) {
        base64Encode = toBase64(new TextEncoder().encode(input));
    } else {
        error(
            "The input string is incorrect or doesn't meet the required format"
        );
        return;
    }

    function makeNewEncryptString() {
        newEncryptString =
            newEncryptString.slice(
                newEncryptString.length / 2,
                newEncryptString.length
            ) + newEncryptString.slice(0, newEncryptString.length / 2);
    }

    newEncryptString = encryptString;

    for (let i = 0; i < base64Encode.length; i++) {
        makeNewEncryptString();
        let temp = "";
        for (let j = 0; j < encryptString.length; j++) {
            if (base64Encode[i] == newEncryptString[j]) {
                break;
            }
            temp += encryptString[j];
        }
        encoded += temp.slice(temp.length - 4, temp.length);
    }

    enterText.innerHTML = "Success <i class='fa-solid fa-check'></i>";
    result.textContent = encoded;

    encryptionEnd();
}
function encryptionStart() {
    result.textContent = "";
    input.disabled = true;
    input.style.color = "#666";
    underline.classList.add("disableUnderline");
    enter.classList.add("processing");
    enter.classList.add("loading");
    enterText.textContent = "Processing...";
}

function encryptionEnd() {
    input.disabled = false;
    input.style.color = "";
    underline.classList.remove("disableUnderline");
    enter.classList.remove("processing");
    enter.classList.remove("loading");
}

function error(reason) {
    enterText.innerHTML = "Erorr <i class='fa-solid fa-xmark'></i>";
    result.textContent = reason;
    encryptionEnd();
}

function clickTheButton() {
    encryptionStart();
    if (input.value === "") {
        error("Input is Empty");
        return;
    }
    setTimeout(() => {
        //열심히 프로세싱 만든거 자랑하기용
        encryption(input.value);
    }, 1000);
}

enter.addEventListener("click", () => {
    clickTheButton();
});

input.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        clickTheButton();
    }
});
