var a = ['','First ','Second ','Third ','Fourth ', 'Fifth ','Sixth ','Seventh ','Eighth ','Nineth ','Tenth ','Eleventh ','Twelfth ','Thirteenth ','Fourteenth ','Fifteenth '];

function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])]) : '';
    str += (n[2] != 0) ? (a[Number(n[2])]) : '';
    str += (n[3] != 0) ? (a[Number(n[3])]) : '';
    str += (n[4] != 0) ? (a[Number(n[4])]) : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])]) : '';
    return str;
}

export default inWords;