const fs = require('fs')

module.exports = {
    uploadImage: (image) => {
        return new Promise((resolve, reject) => {
            let defaultPath = __dirname + '/../..'
            let imagePath = `/uploads/${new Date().getTime()}.${image.mimetype.split('/')[1]}`
            // data = Buffer.from(image.data, 'base64')
            fs.writeFile(defaultPath + imagePath, image.data, (err) => {
                if (err) reject(err.message);
                else resolve(imagePath)
            });
        })
    },
    sendResponse: (res, error, data) => {
        res.send({
            error,
            data
        })
    }
}