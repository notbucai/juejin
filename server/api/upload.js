const img = async (ctx, next) => {

 const file = ctx.request.files.file;
 const reader = fs.createReadStream(file.path);
 const ext = file.name.split('.').pop();
 const upStream = fs.createWriteStream(`upload/${Math.random().toString()}.${ext}`);
 reader.pipe(upStream);

  ctx.body = {
    code: 0,
    data: ""
  }
  
}

module.exports = {
  img
}