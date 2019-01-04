var express = require('express');
var router = express.Router();
var mongodb=require('../mongo');
/* GET home page. */
router.post('/api/list', function(req, res, next) {
  var type=req.body.type*1,
      page=req.body.page,
      size=req.body.size*1;
    mongodb(function(err,cols,con){
         if(err){
              return res.json({code:0,msg:err})
         }else{
             cols.find({type:type}).count(function(error,num){
                    if(error){
                      return res.json({code:0,msg:err})
                    }
             page=(page-1)*size;
             cols.find({type:type}).skip(page).limit(size).toArray(function(error,result){
              if(error){
                  return res.json({code:0,msg:err})
              }
              num=Math.ceil(num/size);
              res.json({code:1,msg:result,total:num});
              con.close();
          })
             })  
         }  
    })
});

module.exports = router;
