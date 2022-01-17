$(document).ready(function(){
    $('#add-product-form').submit(function(){
        var data = new FormData($('#add-product-form')[0]);
        data.append('category', $('#product_categories').val())
        console.log(data);
        $.ajax({
            url:'/products/upload',
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data: data,
            success: function(res){
                alert(res);
            },
            error: function(){
                alert('Error: In sending the request!');
            }
        })
    })
})