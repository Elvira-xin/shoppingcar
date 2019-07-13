$(() => {
    let arr = kits.loadArray('shopCartData');
    let total = 0;
    arr.forEach(e => {
        total += e.number;
    });
    $('.count').text(total);
})