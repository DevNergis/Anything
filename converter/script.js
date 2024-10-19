const fileInput = document.getElementById("imageUpload");
const button = document.getElementById("convertButton");
const outputImage = document.getElementById("outputImage");
const inputImage = document.getElementById("inputImage");
const link = document.getElementById("downloadLink");
let filename = "";

fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0]; //선택된 파일

    filename = file.name.split(".")[0];

    inputImage.src = URL.createObjectURL(file);
    button.disabled = false;

    link.style.display = "none";
    inputImage.style.display = "block";
    outputImage.style.display = "none";
});

button.addEventListener("click", () => {
    if (fileInput.files.length === 0) {
        alert("이미지 파일을 넣어주세요.\n(예: .png, .jpg, .jpeg, .webp)");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const dataUrl = canvas.toDataURL("image/png", 0.8);
            link.href = dataUrl;
            link.download = `${filename}.jpeg`;
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
});
