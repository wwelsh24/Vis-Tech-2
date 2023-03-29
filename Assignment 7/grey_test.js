var canvas1 = document.getElementById("canvas");
var ctx1 = canvas1.getContext("2d");

let averages = [];
var SVGs = ['CSVG/Untitled (1).svg',
'CSVG/Untitled (2).svg',
'CSVG/Untitled (3).svg',
'CSVG/Untitled (4).svg',
'CSVG/Untitled (5).svg',
'CSVG/Untitled (6).svg',
'CSVG/Untitled (7).svg',
'CSVG/Untitled (8).svg',
'CSVG/Untitled (9).svg',
'CSVG/Untitled (10).svg',
'CSVG/Untitled.svg']


for (s in SVGs){
let test_im = new Image();
    test_im.src = SVGs[s]
    console.log(String(SVGs[s]).length)
    test_im.onload = function() {
        ctx1.drawImage(test_im,0,0,100,100);
        var imageData = ctx1.getImageData(0, 0, 100, 100);
    const data = imageData.data;
    
    let grey_vals = []
    for (let i = 0; i < data.length; i += 4) {
        grey_vals.push((data[i]+data[i+1]+data[i+2])/3)
    }
    var total = 0;
    for(var i = 0; i < grey_vals.length; i++) {
        total += grey_vals[i];
    }
    var average = total / grey_vals.length;
    averages.push(average)
    ctx1.clearRect(0,0,100,100)
    }
}
//console.log("VSG",valued_svgs)
console.log(averages)  
console.log(SVGs) 



var arrayOfObject = SVGs.map(function (value, index){
    return [value, averages[index]]
 });
 console.log(arrayOfObject)