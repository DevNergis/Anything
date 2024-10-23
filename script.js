const background = document.getElementById("background");
const projects = document.getElementsByClassName("project");

const projects_ = Array.from(projects);

function showBackgroundModal(e) {
    e.style.zIndex = "10";
    background.classList.add("show");
}

function hiddenBackgroundModal(e) {
    background.classList.remove("show");
    setTimeout(() => {
        e.style.zIndex = "0";
    }, 30);
}

for (let i of projects_) {
    i.addEventListener("mousemove", () => {
        showBackgroundModal(i);
    });
    i.addEventListener("mouseleave", () => {
        hiddenBackgroundModal(i);
    });
}
