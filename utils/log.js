const fs = require("fs")
const path = require("path")

const createWriteStream = fileName => {
  const fullFilaName = path.join(__dirname, "../", "log", fileName)
  const writeStream = fs.createWriteStream(fullFilaName, {
    flags: "a"
  })
  return writeStream
}

const accessWriteStream = createWriteStream("access.log")

function access(log) {
  writeLog(accessWriteStream, log)
}

const writeLog = (writeStream, log) => {
  writeStream.write(log + "\n")
}

module.exports = {
  access
}
