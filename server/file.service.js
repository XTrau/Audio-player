const path = require('path')
const fs = require('fs')
const uuid = require('uuid')

class FileService {
  uploadImage(image) {
    try {
      const fileName = uuid.v4() + '.jpg'
      const filePath = path.resolve('static', fileName)
      image.mv(filePath)
      return fileName
    } catch (e) {
      console.log(e)
    }
  }

  replaceImage(oldImage, newImage) {
    try {
      const fileName = uuid.v4() + '.jpg'
      const prevFilePath = path.resolve('static', oldImage)
      const filePath = path.resolve('static', fileName)
      fs.rm(prevFilePath, () => {})
      newImage.mv(filePath)
      return fileName
    } catch (e) {
      console.log(e)
    }
  }

  uploadAudio(audio) {
    try {
      const fileName = uuid.v4() + '.mp3'
      const filePath = path.resolve('static', fileName)
      audio.mv(filePath)
      return fileName
    } catch (e) {
      console.log(e)
    }
  }

  replaceAudio(oldAudio, newAudio) {
    try {
      const fileName = uuid.v4() + '.jpg'
      const prevFilePath = path.resolve('static', oldAudio)
      const filePath = path.resolve('static', fileName)
      fs.rm(prevFilePath, () => {})
      newAudio.mv(filePath)
      return fileName
    } catch (e) {
      console.log(e)
    }
  }

  removeFile(fileName) {
    const filePath = path.resolve('static', fileName)
    fs.rm(filePath, () => {})
  }
}

module.exports = new FileService()