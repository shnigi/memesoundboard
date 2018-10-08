const contentDiv = document.getElementById('content')
const chunks = _.chunk(audioList, 4)
const categories = _.uniq(audioList.map(item => item.show))
const categoriesButtonsDiv = document.querySelector('.btn-group')

let columns = undefined
let audios = undefined
let images = undefined

const renderCategoriesButtons = () => {
  categoriesButtonsDiv.innerHTML += `
  ${categories.map(category => `<button style="width:${100 / (categories.length + 1)}%">${category}</button>`).join('')}
  <button style="width:${100 / (categories.length + 1) }%">Kaikki</button>
  `
}
renderCategoriesButtons()
const categoryButtons = Array.from(document.querySelectorAll('.btn-group')[0].getElementsByTagName('button'))
categoryButtons.forEach(categoryButton => categoryButton.addEventListener('click', () => filterShowsAndRender(categoryButton.innerText)))

const playSound = ({ currentTarget }) => {
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

// const removeEventListeners = (items) => {
//   items.forEach()
// }

const renderItems = (renders) => {
  // removeEventListeners(renders);
  contentDiv.innerHTML = ''
  renders.map(chunk =>
  contentDiv.innerHTML += `
    <div class="row">
    ${chunk.map(audio => `
      <div class="column" data-audio="${audio.audio}">
        <div class="img-text"><h1>${audio.name}</h1></div>
        <img src="images/${audio.audio}.png" draggable="false" class="img-fluid" data-name="${audio.audio}">
        </div>
      <audio data-name="${audio.audio}" src="sounds/${audio.audio}.mp3"></audio>
      `).join('')}
    </div>`).join('')
    columns = Array.from(document.querySelectorAll('.column'))
    audios = Array.from(document.getElementsByTagName('audio'))
    images = Array.from(document.querySelectorAll('img'))
    columns.forEach(column => column.addEventListener('click', playSound))
}
renderItems(chunks)

const filterShowsAndRender = (showName) => {
  if (showName === 'Kaikki') {
    renderItems(_.chunk(audioList, 4))
    return;
  }
  const filteredShow = audioList.filter(audio => audio.show === showName)
  renderItems(_.chunk(filteredShow, 4))
}


const checkOtherImagesDoesntHavePlayingClass = ({ dataset }) => {
  images.forEach(img => {
    if (
      img.classList.contains('playing') &&
      dataset.audio !== img.dataset.name
    ) {
      img.classList.remove('playing')
    }
  })
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
