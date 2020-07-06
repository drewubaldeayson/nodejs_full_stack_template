const uuid = require('uuid/v1');
const fs = require('fs');
let CONSTANTS = require('../../../constants/constants').CONSTANTS;

function saveImage(baseImage) {
    const uploadPath = CONSTANTS.UPLOADS_PARAMS.IMAGE_PATH;
    const localPath = `${uploadPath}`;
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
    const fileType = baseImage.substring("data:".length,baseImage.indexOf("/"));
    //Forming regex to extract base64 data of file.
    
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = baseImage.replace(regex, "");
    const filename = `${uuid()}.${ext}`;
    const fullPath = "/image_uploads/"+filename;

    if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath);
    }
    
    fs.writeFileSync(localPath+filename, base64Data, 'base64');
    return fullPath;
}

module.exports.saveImage = saveImage;