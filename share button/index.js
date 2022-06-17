const button = document.querySelector(".container")
const bar1 = document.querySelector(".bar1")
const bar2 = document.querySelector(".bar2")
const facebook = document.querySelector(".facebook")
const instagram = document.querySelector(".instagram")
const linkedin= document.querySelector(".linkedin")
const logos = document.querySelector("i")

const allElements = [button,bar1,bar2,facebook,instagram,linkedin, logos[0],logos[1],logos[2]]

button.addEventListener("click",expand)

function expand() {allElements.forEach(element => element.classList.toggle("exp"))}
