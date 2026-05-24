let highScore = localStorage.getItem("highScore") || 0;
let h3 = document.createElement("h3");
h3.innerText = `High Score: ${highScore}`;
document.body.insertBefore(h3, document.querySelector(".btn-container"));


let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"]; 
let started=false;
let level=0;

let h2=document.querySelector("h2");

function startGame()
{
   if(started === false)
   {
      started = true;
      levelUp();
   }
}

document.addEventListener("keypress", startGame);
document.addEventListener("click", startGame);

function btnFlash(btn)
{
  btn.classList.add("flash");
  setTimeout(function()
  {
    btn.classList.remove("flash");
  },250);
}

function levelUp()
{
    userSeq=[];
   level++;
   h2.innerText=`Level ${level}`;

   let ranIdx=Math.floor(Math.random()*4);
   let ranColor=btns[ranIdx];
   let ranbtn=document.querySelector(`.${ranColor}`);
   gameSeq.push(ranColor);
   btnFlash(ranbtn);
}

function checkAns(idx)
{

    if(userSeq[idx]===gameSeq[idx])
    {
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{

        let score = level;
        h2.innerHTML=`Game Over! Your score was <b>${score}</b><br>Press any key or tap to start`;

        document.querySelector("body").style.backgroundColor="red";

        setTimeout(function() {document.querySelector("body").style.backgroundColor="white";},150);

        if(score > highScore){
            highScore = score;
            localStorage.setItem("highScore",highScore);
            h3.innerText=`High Score: ${highScore}`;
     }

        reset();
}
}

function btnPress()
{
    let btn=this;
    btnFlash(btn);

    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}

function reset()
{
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}