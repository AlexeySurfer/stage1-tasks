const filters = document.querySelector('.filters');
const btnNext = document.querySelector('.btn-next');
const btnSave = document.querySelector('.btn-save');
const btnReset = document.querySelector('.btn-reset');
const btnLoad = document.querySelector('.btn-load');
const canvas = document.querySelector('canvas');
const image = document.querySelector('img');
const fileInput = document.querySelector('input[type="file"]');
const fullscreen = document.querySelector('.fullscreen');
const btnsContainer = document.querySelector('.btn-container');
const btns = document.querySelectorAll('.btn');
let counter=0, tpm=`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/14.jpg`;
filters.addEventListener('input', handleUpdate);
filters.addEventListener('change', handleUpdate);
btnNext.addEventListener('click', loadNext);
btnSave.addEventListener('click', savePicture);
btnReset.addEventListener('click', reset);
fileInput.addEventListener('change', loadPicture);
btnsContainer.addEventListener('click', toggleActiveBnt);

function handleUpdate(event){
  if(event.target.matches('input')){
    // console.log(event.target.getAttribute("name"));
    event.target.nextElementSibling.value=event.target.value;
    const suffix = event.target.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${event.target.name}`, event.target.value + suffix);
  }
}
function loadNext(event){
  let countVal;
  counter++;
  if (counter==21){
    counter=1;
  }
  if(counter<10){
    countVal='0'+counter.toString();
  }
  else{
    countVal=counter.toString();
  }
  let h = new Date().getHours();
  let time="night";
  if(h>=6 && h<12){
    time="morning";
    }
  if(h>=12 && h<18){
    time="day";
    }
  if(h>=18 && h<24){
    time="evening";
    }
  tpm=`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/`+time+`/`+countVal+`.jpg`;
  drawImage(tpm);
}

function drawImage(src) {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous'); 
  img.src = src;
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    image.src=canvas.toDataURL("image/jpeg");
    image.style.visibility="visible";
  };  
}
function drawCanvas(src) {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous'); 
  img.src = src;
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
  };  
}

function savePicture(){
  const ctx = canvas.getContext("2d");
  ctx.filter = `blur(${document.querySelector('input[name="blur"]').value+document.querySelector('input[name="blur"]').dataset.sizing})`
             + `invert(${document.querySelector('input[name="invert"]').value+document.querySelector('input[name="invert"]').dataset.sizing})`
             + `sepia(${document.querySelector('input[name="sepia"]').value+document.querySelector('input[name="sepia"]').dataset.sizing})`
             + `saturate(${document.querySelector('input[name="saturate"]').value+document.querySelector('input[name="saturate"]').dataset.sizing})`
             + `hue-rotate(${document.querySelector('input[name="hue"]').value+document.querySelector('input[name="hue"]').dataset.sizing})`;
  ctx.drawImage(canvas, 0, 0);
  let link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
  drawCanvas(tpm);
}

function loadPicture(){
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    tpm=reader.result;
    drawImage(reader.result);
  }
  reader.readAsDataURL(file);
}

function reset(){
  document.querySelector('input[name="blur"]').value=0;
  document.querySelector('input[name="invert"]').value=0;
  document.querySelector('input[name="sepia"]').value=0;
  document.querySelector('input[name="saturate"]').value=100;
  document.querySelector('input[name="hue"]').value=0;
  document.querySelector('input[name="blur"]').nextElementSibling.value=0;
  document.querySelector('input[name="invert"]').nextElementSibling.value=0;
  document.querySelector('input[name="sepia"]').nextElementSibling.value=0;
  document.querySelector('input[name="saturate"]').nextElementSibling.value=100;
  document.querySelector('input[name="hue"]').nextElementSibling.value=0;
  document.documentElement.style.setProperty(`--blur`, `0px`);
  document.documentElement.style.setProperty(`--invert`, `0%`);
  document.documentElement.style.setProperty(`--sepia`, `0%`);
  document.documentElement.style.setProperty(`--saturate`, `100%`);
  document.documentElement.style.setProperty(`--hue`, `0deg`);
  drawImage(tpm);
}

document.addEventListener("DOMContentLoaded", function(event) { 
    // canvas.width = image.naturalWidth;
    // canvas.height = image.naturalHeight;
    // const ctx = canvas.getContext("2d");
    // ctx.drawImage(image, 0, 0);
  // drawImage(image.src);
  drawImage(tpm);
});

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      }
  }
}
fullscreen.addEventListener('click', toggleFullScreen);

function toggleActiveBnt(event){
  if (event.target.classList.contains('btn')) {
    btns.forEach((elem) => {
      elem.classList.remove('btn-active');
  });
  event.target.classList.add('btn-active');
  if (event.target.classList.contains('btn-load--input')) {
  event.target.classList.add('btn-active');
    btnLoad.classList.add('btn-active');
  }
  }
}