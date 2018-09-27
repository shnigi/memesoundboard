const columns = Array.from(document.querySelectorAll('.column'));
const audios = document.getElementsByTagName('audio');
const images = Array.from(document.querySelectorAll('img'));

function checkOtherImagesDoesntHavePlayingClass(e) {
  images.forEach(img => {
    if (img.classList.contains('playing') && e.target.dataset.name !== img.dataset.name) {
      img.classList.remove('playing');
    }
  });
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-name="${e.currentTarget.dataset.audio}"]`);
  const image = document.querySelector(`img[data-name="${e.currentTarget.dataset.audio}"]`);
  if (!audio) return;

  image.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
  audio.onended = () => {
    image.classList.remove('playing');
  };
  checkOtherImagesDoesntHavePlayingClass(e);
}

document.addEventListener('play', function(e){
    for(var i = 0, len = audios.length; i < len; i++){
        if(audios[i] != e.target){
            audios[i].pause();
        }
    }
}, true);


columns.forEach(column => column.addEventListener('click', playSound));
