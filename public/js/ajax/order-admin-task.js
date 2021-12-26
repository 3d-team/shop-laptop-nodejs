$('.update-cart-button').click(function(){
    let val = $('#deliver-status-option').val();
    $('#deliver-tag-'+this.id).text(val);
    let cart_id = this.id;
    $.ajax({
        url:'/orders/updateCart',  // post target
        method:'post',
        dataType:'json',
        data:{'code': cart_id, 'delivery_status': val},
        success:function(response){  
            if(response.msg == 'success'){ 
                alert('Đã cập nhật trạng thái giao hàng');
            }            
        },  
        error:function(response){                  
            console.log('server error occured')  
        }  
    })

});


// $('.detail-button').click(function(){
//     // get prodruct id
//     productId = this.id;
//     var container = document.getElementsByTagName('cart-container')[0];
//     $.ajax({
//         url:'/orders/admin/detailCart',  // post target
//         method:'post',
//         dataType:'json', 
//         data:{'product_id': productId},
//         success:function(response){  
//             if(response.msg == 'success'){ 
//                 var html_str = ``;
//                 for(const item of response.items){
//                     console.log(item);
//                     html_str += `<div class="cart-item large-12 columns" id="cart-item-id">
//                                                 <div><img src="/images/asus-rog-zephyrus-g14.jpg" alt="Item 1"></div>            
//                                                 <div class="cart-item-detail">
//                                                     <h4>${item.name}</h4>
//                                                     <h5 id="total-unit-item">${item.price}</h5>
//                                                     <h6>Số lượng: ${item.quantity}</h6>
//                                                 </div>
//                                             </div>`;
//                 }
//                 container.innerHTML = html_str;
//             }            
//         },  
//         error:function(response){                  
//             console.log('server error occured')  
//         }  
//     })
// });

