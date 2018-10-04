
const columns = Array.from(document.querySelectorAll('.column'))
const audios = document.getElementsByTagName('audio')
const images = Array.from(document.querySelectorAll('img'))

function checkOtherImagesDoesntHavePlayingClass({ dataset }) {
  images.forEach(img => {
    if (
      img.classList.contains('playing') &&
      dataset.name !== img.dataset.name
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
  true,
)

columns.forEach(column => column.addEventListener('click', playSound))
