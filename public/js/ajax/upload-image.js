$(document).ready(function(){
    $('#add-product-form').submit(function(){
        // var pack = $('#add-product-form').serializeArray();
        // console.log(pack);
        // $.ajax({
        //     url:'/products/upload',
        //     method:'post',
        //     dataType:'json',
        //     data: {mess: "Server đã nhận", form: pack},
        //     success: function(response){
        //         alert(response.msg);
        //     },
        //     error: function(){
        //         alert('Error: In sending the request!');
        //     }
        // })
        var data = new FormData($('#add-product-form')[0]);
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