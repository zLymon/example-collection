let i = 0

self.addEventListener('message', e => {
  console.log(e)
})

function timeCount () {
  i = i + 1
  postMessage(i)

  setTimeout(() => {
    timeCount()
  }, 1);
}

timeCount()