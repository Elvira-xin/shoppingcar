$(function () {
    let id = location.search.substring(4);
    let obj = phoneData.find(function (e, i) {
        return e.pID == id;
    })
    $('.sku-name').text(obj.name)
    $('.preview-img>img').attr('src', obj.imgSrc)
    $('.summary-price  em').text('￥' + obj.price)

    let chooseNumber = $('.choose-number');
    let add = $('.add');
    let reduce = $('.reduce');
    add.on('click', function () {
        let old = parseInt(chooseNumber.val());
        old++;
        if (old > 1) {
            reduce.removeClass('disabled')
        }
        chooseNumber.val(old)
    })
    reduce.on('click', function () {
        let old = parseInt(chooseNumber.val());
        old--;
        if (old < 1) {
            return;
        }
        console.log(old)
        if (old === 1) {
            reduce.addClass('disabled')
        }
        chooseNumber.val(old)
    })

    $('.addshopcar').on('click', function () {
        let number = parseInt($('.choose-number').val());
        let jsonStr = localStorage.getItem('shopCartData');
        let arr;
        if (jsonStr == null) {
            arr = []
        } else {
            arr = JSON.parse(jsonStr)
        }
        let isExit = arr.find(e => {
            return e.pID === id;
        })
        if (isExit !== undefined) {
            isExit.number += number;
        } else {
            let good = {
                pID: obj.pID,
                name: obj.name,
                price: obj.price,
                imgSrc: obj.imgSrc,
                number: number
            }
            arr.push(good)
        }
        jsonStr = JSON.stringify(arr);
        localStorage.setItem('shopCartData', jsonStr);
        location.href = 'cart.html';
    })

})