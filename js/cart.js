$(() => {
    let jsonStr = localStorage.getItem('shopCartData');
    let arr;
    if (jsonStr !== null) {
        arr = JSON.parse(jsonStr);
        let html = '';
        arr.forEach(e => {
            html += `<div class="item" data-id="${e.pID}">
            <div class="row">
              <div class="cell col-1 row">
                <div class="cell col-1">
                  <input type="checkbox" class="item-ck" checked="">
                </div>
                <div class="cell col-4">
                  <img src="${e.imgSrc}" alt="">
                </div>
              </div>
              <div class="cell col-4 row">
                <div class="item-name">${e.name}</div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="price">${e.price}</em>
              </div>
              <div class="cell col-1 tc lh70">
                <div class="item-count">
                  <a href="javascript:void(0);" class="reduce fl">-</a>
                  <input autocomplete="off" type="text" class="number fl" value="${e.number}">
                  <a href="javascript:void(0);" class="add fl">+</a>
                </div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="computed">${e.price * e.number}</em>
              </div>
              <div class="cell col-1">
                <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
              </div>
            </div>
          </div>`
        });
        $('.item-list').html(html);
        $('.empty-tip').hide();
        $('.total-of').removeClass('hidden');
        $('.cart-header').removeClass('hidden')
    }
    //计算总数量和总金额    
    function computedCountAndMoney() {
        let totalCount = 0;
        let totalMoney = 0;
        $('.item-list input[type=checkbox]:checked').each((i, e) => {
            let id = parseInt($(e).parents('.item').attr('data-id'));
            arr.forEach(e => {
                if (id === e.pID) {
                    totalCount += e.number;
                    totalMoney += e.number * e.price;
                }
            })
        })
        $('.selected').text(totalCount);
        $('.total-money').text(totalMoney);
    }
    computedCountAndMoney();

    //实现删除
    $('.item-list').on('click', '.item-del', function () {
        let _this = this;
        $('#dialog-confirm').dialog({
            resizable: false,
            height: 140,
            modal: true,
            buttons: {
                "确认": function () {
                    $(this).dialog("close");
                    // 把对应的商品删除
                    // 把对应的结构移除
                    // console.log(_this);
                    $(_this).parents('.item').remove();
                    // 把本地数据移除
                    // 我们现在需要根据id获取本地存储里面的数据
                    let id = parseInt($(_this).parents('.item').attr('data-id'));
                    // console.log(id);
                    // 把对应id的数据读取出来
                    // let obj = arr.find(e => {
                    //   return e.pID === id;
                    // });
                    // // console.log(obj);
                    // // 把对应的id的数据从本地存储里面移除
                    // // arr.splice(从哪里开始删除,总共删除多少个);
                    // let index = arr.indexOf(obj);
                    // console.log(index);
                    // 在h5里面的，数组新增了一个方法，获取满足条件的元素的索引          
                    let index = arr.findIndex((e) => {
                        return e.pID === id
                    })
                    // console.log(index);

                    arr.splice(index, 1);
                    // 把数据覆盖回本地
                    let jsonStr = JSON.stringify(arr);
                    localStorage.setItem('shopCartData', jsonStr);
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        })

        

    })

    //实现全选框
    $('.pick-all').on('click', function () {
        let status = $(this).prop('checked');
        $('.item-ck').prop('checked', status);
        $('.pick-all').prop('checked', status);
        computedCountAndMoney();
    })
    $('.item-ck').on('click', function () {
        $('.pick-all').prop('checked', $('.item-ck').length === $('.item-ck:checked').length);
        computedCountAndMoney();
    })

    //使用委托实现加减
    $('.item-list').on('click', '.add', function () {
        let oldVal = parseInt($(this).siblings('input').val())
        oldVal++;
        if (oldVal >=1) {
            $(this).siblings('.reduce').removeClass('disabled')
        }
        $(this).siblings('input').val(oldVal)
        let id = parseInt($(this).parents('.item').attr('data-id'));
        let obj = arr.find(e => {
            return e.pID === id;
        })
        obj.number = oldVal;
        let jsonStr = JSON.stringify(arr);
        localStorage.setItem('shopCartData', jsonStr);
        computedCountAndMoney();
        $(this).parents('.item').find('.computed').text(obj.number * obj.price)
    })
    $('.item-list').on('click', '.reduce', function () {
        let oldVal = parseInt($(this).siblings('input').val());
        if (oldVal === 1) {
            return;
        }
        oldVal--;
        if (oldVal === 1) {
            $(this).addClass('disabled')
        }
        $(this).siblings('input').val(oldVal)
        let id = parseInt($(this).parents('.item').attr('data-id'));
        let obj = arr.find(e => {
            return e.pID === id;
        })
        obj.number = oldVal;
        let jsonStr = JSON.stringify(arr);
        localStorage.setItem('shopCartData', jsonStr);
        computedCountAndMoney();
        $(this).parents('.item').find('.computed').text(obj.number * obj.price)
    })
})