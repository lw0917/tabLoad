require(['./js/main.js'],function(){
    require(['jquery','bscroll','flex'],function($,bscroll){
          var scroll=new bscroll('section',{
              probeType:2,
              click:true
          })
          var page=1,
              size=13,
              type=1,
              baseUrl='http://127.0.0.1:3000/images',
              total=0;
          init();
        function init(){
              loadData();
              Bscroll();
              addEvent();
        }
        function loadData(){
               $.ajax({
                   url:'/api/list',
                   type:'post',
                   dataType:'json',
                   data:{
                        page:page,
                        size:size,
                        type:type
                   },
                   success:function(res){
                       total=res.total;
                      if(res.code===1){
                          renderList(res.msg)
                      }
                   }
               })
        }

        function renderList(data){
              var str='';
              data.map(function(file){
                     var url=file.url.substr(1);
                  str+=` <dl>
                  <dt><img src="${baseUrl}${url}" alt=""></dt>
                  <dd>${file.title}</dd>
              </dl>`
              })
              $('.con').append(str);
        }
        function Bscroll(){
             scroll.on('scroll',function(){
                 if(this.y<this.maxScrollY-140){
                      $('.flag').html('释放加载更多')
                 }else if(this.y<this.maxScrollY-70){
                    $('.flag').html('上拉加载')
                 }
                 if(page>=total){
                    $('.flag').html('没有更多数据啦')
                 }
             })
             scroll.on('scrollEnd',function(){
                 if($('.flag').html()==='释放加载更多'){
                      page++;
                       $('.flag').html('上拉加载')
                       loadData()
                 }
             })
        }
        function addEvent(){
              $('header').on('click','span',function(){
                  $(this).addClass('active').siblings().removeClass('active');
                  page=1;
                  $('.con').html('');
                  type=$(this).attr('data-type');
                  loadData();
              })
        }
    })
})