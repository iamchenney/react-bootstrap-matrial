var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')

exports.getEntries = function (sourcePath) {
  var entries = {},basename,tmp,pathname;

  glob.sync(sourcePath).forEach(function (entry) {
    basename = path.basename(entry,path.extname(entry));
    tmp = entry.split('/').splice(-3); //slice 从已有的数组中返回选定的元素, -3 倒序选择，即选择最后三个
    var pathname = tmp.splice(1, 1) + '/' + basename; // splice(0, 1)取tmp数组中第一个元素
    entries[pathname] = entry;

  });
  console.log(entries)
  return entries;
}
