const uploadDir = process.cwd() + "/static/";
const fs = require('fs');
const img = async (ctx, next) => {

  const file = ctx.request.files.img;
  if(!file){
    throw new Error("参数错误");
  }
  const ext = file.name.split('.').pop();

  if (!/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(ext)) {
    throw new Error("只能上传图片");
  }
  const reader = fs.createReadStream(file.path);
  const date = new Date();
  const _path = `upload/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${((Math.random() * 1000000000) | 0).toString()}.${ext}`;
  const upStream = fs.createWriteStream(uploadDir + _path);
  reader.pipe(upStream);

  ctx.body = {
    code: 0,
    data: _path
  }
}

module.exports = {
  img
}