const readline = require('readline')
const fs = require('fs')
const request = require('request')

const readInterface = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  console: false
});

readInterface.on('line', async line => {
  const id = line
    .replace('https://www.youtube.com/watch?v=', '')
    .replace('https://youtu.be/', '')

  const path = `downloads/${id}.jpg`

  try {
    await fs.promises.access(path)
  } catch (e) {
    request(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`).pipe(fs.createWriteStream(path))
  }
});
