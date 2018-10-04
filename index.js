const contentDiv = document.getElementById('content');
const chunks = _.chunk(audioList, 4)

chunks.map(chunk => {
  contentDiv.innerHTML += `
    <div class="row">
    ${chunk.map(audio => `
      <div class="column" data-audio="${audio.audio}">
        <div class="img-text"><h1 draggable="false">${audio.name}</h1></div>
        <img src="images/${audio.audio}.png" draggable="false" class="img-fluid" data-name="${audio.audio}">
        </div>
      <audio data-name="${audio.audio}" src="sounds/${audio.audio}.mp3"></audio>
      `).join('')}
    </div>`
}).join('')

const columns = Array.from(document.querySelectorAll('.column'))
const audios = Array.from(document.getElementsByTagName('audio'))
const images = Array.from(document.querySelectorAll('img'))

function checkOtherImagesDoesntHavePlayingClass({ dataset }) {
  images.forEach(img => {
    if (
      img.classList.contains('playing') &&
      dataset.audio !== img.dataset.name
    ) {
      img.classList.remove('playing')
    }
  })
}

function playSound({ currentTarget }) {
  const wot = currentTarget.dataset.audio
  const audio = document.querySelector(`audio[data-name="${wot}"]`)
  const image = document.querySelector(`img[data-name="${wot}"]`)
  if (!audio) return
  image.classList.add('playing')
  audio.currentTime = 0
  audio.play()
  audio.onended = () => {
    image.classList.remove('playing')
  }
  checkOtherImagesDoesntHavePlayingClass(currentTarget)
}

document.addEventListener(
  'play',
  ({ target }) => {
    audios.forEach(item => {
      if (item !== target) {
        item.pause()
      }
    })
  },
  true
)

columns.forEach(column => column.addEventListener('click', playSound))
