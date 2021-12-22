$(document).ready(function(){
    $('.change-number-item').bind('keyup input', function(){
        // get prodruct id
        productId = this.id;
        val = this.value;
        $.ajax({
            url:'/orders/changeNumberItem',  // post target
            method:'post',
            dataType:'json', 
            data:{'product_id': productId, number: val},
            success:function(response){  
                if(response.msg=='success'){ 
                    var totalUnitTag = document.getElementById('total-unit-of-cart');
                    totalUnitTag.innerText = 'Tổng tiền: ' +  response.total_unit +' VND';
                    var numberItem = document.getElementById('number-item-in-cart');
                    numberItem.innerText = response.cart_number;
                    var totalUnitItem = document.getElementById('total-unit-item-'+productId);
                    totalUnitItem.innerText = response.total_unit_item + '.VND';
                    console.log(val);
                }
                if(response.msg == 'negative-number'){ 
                    alert("Số lượng sản phẩm không được nhỏ hơn 0!")
                }
                
            },  
            error:function(response){                  
                console.log('server error occured')  
            }  
        })
    });

    $('.button-add-to-cart').click(function(){
        // get prodruct id
        productId = this.id;
        $.ajax({
            url:'/orders/add',  // post target
            method:'post',
            dataType:'json', 
            data:{'product_id': productId},
            success:function(response){  
                if(response.msg=='success'){ 
                    var numberItem = document.getElementById('number-item-in-cart');
                    numberItem.innerText = response.cart_number;
                    console.log(val);
                }
            },  
            error:function(response){                  
                console.log('server error occured')  
            }  
        })
    });

    $('.delete-cart-item-btn').click(function(){
        // get prodruct id
        productId = this.id;
        $.ajax({
            url:'/orders/remove',  // post target
            method:'post',
            dataType:'json',  
            data:{'product_id': productId},
            success:function(response){  
                if(response.msg=='success'){  
                    var totalUnitTag = document.getElementById('total-unit-of-cart');
                    totalUnitTag.innerText = 'Tổng tiền: ' +  response.total_unit +' VND';
                    var numberItem = document.getElementById('number-item-in-cart');
                    numberItem.innerText = response.cart_number;
                    console.log('remove item-' + productId +'from cart successful');  
                }
            },  
            error:function(response){  
                console.log('server error occured')  
            }  
        })
    });    

    $('#submit-cart-btn').click(function(){
        var deliveryAddress = document.getElementById('delivery-address').value;
        $.ajax({
            url:'/orders/submit',  // post target
            method:'post',
            dataType:'json',
            data:{'confirm_submit': 'YES',
                    'address': deliveryAddress},
            success:function(response){  
                if(response.msg == 'success'){
                    var totalUnitTag = document.getElementById('total-unit-of-cart');
                    totalUnitTag.innerText = 'Tổng tiền: ' +  '0' +' VND';
                    var numberItem = document.getElementById('number-item-in-cart');
                    numberItem.innerText = '0';
                    $('#item-lists').toggle("blind");
                    alert("Đặt hàng thành công!");
                }
                if(response.msg == 'empty'){
                    alert("Giỏ hàng trống!");
                }
                if(response.msg == 'not-login'){
                    alert("Bạn chưa đăng nhập!");
                }
            },  
            error:function(response){
                console.log('server error occured')  
            }  
        })
    });

    $('#destroy-cart-btn').click(function(){
        // get prodruct id
        productId = this.id;
        $.ajax({
            url:'/orders/destroy',  // post target
            method:'post',
            dataType:'json',  
            data:{'confirm_destroy': 'YES'},
            success:function(response){  
                if(response.msg=='success'){  
                    var totalUnitTag = document.getElementById('total-unit-of-cart');
                    totalUnitTag.innerText = 'Tổng tiền: ' +  '0' +' VND';
                    var numberItem = document.getElementById('number-item-in-cart');
                    numberItem.innerText = '0';
                    $('#item-lists').toggle("blind");
                }
            },  
            error:function(response){  
                console.log('server error occured')  
            }  
        })
    });
})