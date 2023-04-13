const images = ["1.png", "2.png", "3.png"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img"); // HTML에 <img> 생성
bgImage.className = "background";

bgImage.src = `img/${chosenImage}`; // <img src=""> 설정

document.body.appendChild(bgImage);