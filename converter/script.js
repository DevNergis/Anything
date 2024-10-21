const fileInput = document.getElementById("imageUpload");
const button = document.getElementById("convertButton");
const outputImage = document.getElementById("outputImage");
const inputImage = document.getElementById("inputImage");
const link = document.getElementById("downloadLink");
const selecter = document.getElementById("selecter");
const message = document.getElementById("message");
let file;
let filename = "";

function messageAlert(m) {
    message.innerText = m;
}

function checkCorrectImage() {
    filename = file.name.split(".")[0];

    pathpoint = file.name.lastIndexOf(".");
    filepoint = file.name.substring(pathpoint + 1, file.name.length);
    filetype = filepoint.toLowerCase();

    if (
        filetype != "png" &&
        filetype != "jpg" &&
        filetype != "jpeg" &&
        filetype != "jfif" &&
        filetype != "webp"
    ) {
        //정의된 확장자가 아닌 경우.
        messageAlert("Please upload the correct image.");
        link.style.display = "none";
        return;
    }

    //사용자가 선택한 이미지로 변경
    inputImage.src = URL.createObjectURL(file);
    button.disabled = false;

    link.style.display = "none";
    inputImage.style.display = "block";
    outputImage.style.display = "none";
}

function convertImage() {
    if (file == null || file == undefined) {
        messageAlert("Please upload the image file.");
        return;
    }
    const reader = new FileReader();

    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const dataUrl = canvas.toDataURL(`image/${selecter.value}`, 0.8);
            link.href = dataUrl;
            link.download = `${filename}.${selecter.value}`;
            link.textContent = "변환된 이미지 다운로드";
            button.disabled = true;
            link.style.display = "block";

            outputImage.src = dataUrl;
            inputImage.style.display = "none";
            outputImage.style.display = "block";
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

fileInput.addEventListener("change", (e) => {
    messageAlert("");
    file = e.target.files[0]; //선택된 파일
    checkCorrectImage();
});

selecter.addEventListener("change", () => {
    button.disabled = false;

    link.style.display = "none";
    inputImage.style.display = "block";
    outputImage.style.display = "none";
});

button.addEventListener("click", () => {
    if (fileInput.files.length === 0) {
        messageAlert("Please upload the image file.");
        return;
    }
    convertImage();
});
