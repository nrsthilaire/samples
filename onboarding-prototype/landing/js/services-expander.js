

j$(function () {
      console.log(' services ready......');
      

/* Check for touch event */
window.addEventListener('touchstart', function touched() {  
  document.body.classList.add('touch')
  window.removeEventListener('touchstart', touched, false)
}, false)



j$('.content').on('mouseenter', '.pod-viewmore.link-to-modal', function(){
    j$(this).parent().parent().addClass('pod-hover');

});

j$('.content').on('mouseenter', '.pod-viewmore.link-to-expander', function(){
    j$(this).parent().parent().addClass('pod-hover');

});

j$('.content').on('mouseleave', '.pod-hover', function(){
    j$(this).find('.pod-viewmore');
    j$(this).removeClass('pod-hover');

});




    var getSubCatExpander = function(itemData, parentLink, catName, index) {
          var item = "";
           var subList = "";

        if(itemData.sub != null){  
          // subcategory name
           item = "<dd class='expander-nav-item expander-link font-weight-bold' data-link='" + itemData.link + "'>" + itemData.name + "</dd>";
            j$.each(itemData.sub, function(i) {
                // subcat item
                    subList += "<dd class='expander-subnav-item expander-link link-to-form ' data-link='" + itemData.link + "'data-index='" + i+ "'>" + this.name + "</dd>";
            });
            item += subList;
        }
        else{
          // no subcat 
             item = "<dd class='expander-subnav-item nosubcat expander-link link-to-form ' data-link='" + itemData.link + "'>" + itemData.name + "</dd>";
        }

        return item;

    };

    var createCatExpander = function(itemData) {

      var item = "";
      var subList = "";
            j$.each(itemData.sub, function(i) {
                  var catImg = 'images/services/'+this.link+'.jpg',
                      catName = this.name,
                      catLink = this.link,
                      catSub = this.sub,
                      catQty = this.sub.length,
                      subCatItems = '';
                      console.log('catQty: '+ catQty)
                     if(this.sub != null){
                        var taskList = "";
                          j$.each(this.sub, function(i) {
                                  taskList += getSubCatExpander(this, this.link, catName, i);

                          });
                          subCatItems += taskList +'</div>';
                      }

                    subList += "<div id='expander-"+catLink+"' class='task-category'>"+

                                  "<div class='cat-pod program-container link-to-expander' data-link='"+catLink+"'>"+
                                      "<div class='program-container-wrapper'>"+
                                          "<div class='pod-pic'><img src='"+catImg+"'/></div>"+
                                          "<div class='pod-preview'>"+
                                                "<div class='pod-header text-large link-to-expander'>"+catName+"</div>"+
                                          "</div>"+
                                      "</div>"+
                                  "</div>"+

                                    "<div class='program-expander'>"+
                                        " <div class='x-close expander-close-btn'></div>"+
                                        "<div class='heading6 font-weight-bold text-align-center'>"+catName+"</div>"+
                                        "<div class='text-large text-align-center padding-top-1 padding-bottom-3'>"+catQty+" services you can offer Home Depot customers</div>"+
                                        "<div class='task-lists'><div class='task-list-wrapper'>"+
                                            subCatItems +
                                        "</div></div>"+
                                    "</div>"+

                                "</div>";


            });
            item += subList;



          return item;
    };

  
  var catcontainer = j$('#browse-expand');

  if(catcontainer){
         catcontainer.append(createCatExpander(data.services[0]));
         console.log('catcontainer exists:' + catcontainer.length)
  }




// var gotoOpenExpander = function(link){
//    var vpw = j$(window).width();
//   console.log('::: view port width : '+vpw);
//   j$('.pr-modal').hide();
//   j$('.expanded').removeClass('expanded');
  
//   if(vpw > 768){
//     console.log('opening EXPANDER... expander-'+link);
//     var thisExpander = j$("#expander-"+link);
    
//     setTimeout(function(){
//    //wait for any expander to close before
//         j$('html, body').animate({
//         scrollTop: j$(thisExpander).offset().top - 100
//           }, 1500, function(){
            
//             j$(thisExpander).addClass('expanded');
//       });
//     }, 5000);


    
//   }
//   else{
//         console.log('opening MODAL...'+link);
//         j$('.expanded').removeClass('expanded');

//         var thisModal = j$("#modal-"+link);
//         thisModal.slideDown('fast');
//         j$('body').addClass('noScroll');
//   }

// };



    


// j$('.link-to-expander').on('click', function(){
//   var thisLink = j$(this).data('link');
//   gotoOpenExpander(thisLink);
// });

function setExpanderListHeights(){
            var vpw = j$(window).width();
            console.log('view port width : '+vpw);
            var itemheight = 40;
            var col = 1;
            
            if(vpw > 768){
                col = 2;
            }
            if(vpw > 960){
                col = 3;
            }
            if(vpw > 1080){
                col = 4;
            }
                    console.log(':::: col: '+col);

            j$('.task-lists').each(function(i){
                var qty =  j$(this).data('qty');
                
                if(qty > 20){
                    var itemspercol = qty / col;
                    itemspercol = Math.round(itemspercol);
                    console.log(i+': qty: '+qty+ ' / col:'+ col);

                    console.log(i+': items per col: '+itemspercol);

                    var colheight = itemspercol * itemheight;
                    console.log(i+': colheight: '+colheight);

                    j$(this).find('.task-list-wrapper').height(colheight);
                }
                

            })
        };



    });








