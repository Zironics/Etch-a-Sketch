let grid=document.querySelector('.grid');
let reset=document.querySelector('.reset');
let backGroundColor="#ffffff";
let backgroundSelector=document.getElementById('background');
let eraser=document.querySelector('.eraser');
let size=document.querySelector('#size');
let line=document.querySelector('.lines');
let n=parseInt(size.value);
let colorSelector=document.getElementById('select');
let color=colorSelector.value;
let divs;
let fill=false;
let erase=false;
let mousedown=false;


colorSelector.addEventListener("change",function(){
    color=colorSelector.value;
});


function setBackground(newBackground)
{
    divs.forEach(element =>{
        element.style.backgroundColor=newBackground;
    });
}

function changeColor(div,color)
{
    div.style.backgroundColor=color;
}


const createGrid = q =>{
      let array=[];
      for(i=0;i<q*q;i++){
          let div=document.createElement('div');
          div.classList.add('item');
          array.push(div);
      }
      grid.replaceChildren(...array);
      grid.style.gridTemplateColumns=`repeat(${q},1fr)`;
      divs=document.querySelectorAll('.item');
      listen();
      setBackground(backGroundColor);
};

function toggleLines()
{
    divs.forEach(element => {
        element.classList.toggle('lines');
    });
}

createGrid(n);

reset.addEventListener("click",function(){
     setBackground(backGroundColor);
});

eraser.addEventListener('click',function(){
    eraser.classList.toggle('active');
    erase=!erase;
});

backgroundSelector.addEventListener('change',function(){
      backGroundColor=backgroundSelector.value;
      setBackground(backGroundColor);
});

size.addEventListener('change',function(e){
    if(e.target.value>99 || e.target.value<1) 
    {
        alert("Error the number you entered cannot be accepted, respect the range [1-99]");
        return;
    }
    n=parseInt(e.target.value);
    createGrid(n);
});

grid.addEventListener('mousedown',function(){
     fill=true;
});

grid.addEventListener("mouseup",function()
{
   fill=false;
});

line.addEventListener('click',function(){
     line.classList.toggle('active');
     toggleLines();
});


function listen()
{
divs.forEach(element => {
     element.addEventListener('mouseenter',function(){
        if(fill)
        {
           if(erase)
           {
               changeColor(element,backGroundColor);
           }
           else 
           {
               changeColor(element,color);
           }
        }
     });
});
}