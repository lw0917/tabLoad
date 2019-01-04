var mongodb=require('mongodb').MongoClient;
var url='mongodb://127.0.0.1:27017';
module.exports=function(ck,con){
      mongodb.connect(url,{ useNewUrlParser: true },function(err,con){
          if(err){
              return ck&&ck(err)
          }
          var collection=con.db('list').collection('imglist');
          ck&&ck(null,collection,con)
      })
}