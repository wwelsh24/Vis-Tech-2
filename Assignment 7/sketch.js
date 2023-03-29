

var canvas1 = document.getElementById("canvas2");
var ctx1 = canvas1.getContext("2d");

var canvas2 = document.getElementById("canvas1");
var ctx2 = canvas2.getContext("2d");

canvas1.width = 100;
canvas1.height = 100;
canvas2.width = 600;
canvas2.height = 600;




var SVGs = [
    'CSVG/Untitled (10).svg',
    'CSVG/Untitled (9).svg',
    'CSVG/Untitled (8).svg',
    'CSVG/Untitled (7).svg',
    'CSVG/Untitled (6).svg',
    'CSVG/Untitled (4).svg',
    'CSVG/Untitled (3).svg',
    'CSVG/Untitled (2).svg',
    'CSVG/Untitled (1).svg',
    'CSVG/Untitled (5).svg',
    'CSVG/Untitled.svg',
   ]
function canvasApp() {

    /**
     * Encapsulate within the following function anything that you want
     * to draw in your browser within the specified region allocated for canvas.
     */
    var image = new Image();
    image.crossOrigin = "anonymous";
    image.src = "chico1 (1).png";
    image.width = 600;
    image.heigth = 600;

    image.onload = function() {
        ctx1.drawImage(image, 0, 0, 100, 100);
    }
    
 var imageData = ctx1.getImageData(0, 0, 100, 100);
 const data = imageData.data;
 /*
 console.log(data);
    let svg_image = []
    for (var i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
       // if (avg>120&avg<=220){
        //    svg_image.push(SVGs[0].Path)
        //}
        if (avg<100){
            svg_image.push(SVGs[1].Path)
        }
        else {
            svg_image.push(SVGs[0].Path)
        }
    }
    console.log(svg_image)
*/
    let grey_vals = []
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        grey_vals.push(avg)
    }

    const grey_index = grey_vals.map(x => Math.floor(x/(255/SVGs.length)));
   
    let index = grey_index.findIndex(Number.isNaN)


    console.log(grey_index)
    function drawScreen () {
        ctx2.clearRect(0,0,600,600)
        let list_pos = 0;
        for (var y = 0; y<100; y+=1){
            for (var x = 0; x<100; x+=1){
                list_pos = x+y*100;
                drawImages(SVGs[grey_index[list_pos]],x*6,y*6);
            }
        }
    }


    


    function drawImages(source,x,y) {
        var img = new Image();
        img.src = source;
        img.onload = function() {
             ctx2.drawImage(img, x , y , 6, 6);
        };
        
      }
    

      
      
    drawScreen();

}

window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded () {
    canvasApp();
}

eventWindowLoaded();
