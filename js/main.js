let page={
    //Make lens element;
    lens:document.createElement("div"),
    //get image
    img:document.getElementById("map_img"),
    //get result div
    result:document.getElementById("zoom"),
    
    init: function(ev){ 
        page.result.classList.remove("hide");
        page.result.classList.add("show");
        //set class attribute to lens div. 
        page.lens.setAttribute("class","img-zoom-lens");
        //append the lens div before the image div inside the "img-zoom-container"
        page.img.parentElement.insertBefore(page.lens, page.img);
        //calculate the ratio of frame of the image to show on the "img-zoom-result" (1:7.5)
        posx=page.result.offsetWidth/page.lens.offsetWidth;
        posy=page.result.offsetHeight/page.lens.offsetHeight;
        //add the background image to the result div by getting the ".img-zoom-container" 'src' attribute;
        page.result.style.backgroundImage=`url('${page.img.src}')`;
        //zoom in by using the ratio variables
        page.result.style.backgroundSize=(page.img.width*posx)+'px '+(page.img.height*posy)+'px';
        
//        page.lens.addEventListener('mousemove', page.moveLens);
//        page.img.addEventListener('mousemove', page.moveLens);
        page.moveLens(ev);
    },
    addBox: function(){
        page.result.classList.add("hide");
//        page.lens.addEventListener('mousemove', page.init);
//        page.img.addEventListener('mousemove', page.init);
        document.addEventListener("mousemove",page.init);
        
    },
    moveLens: function(ev){
        ev.preventDefault();
        let pos,x,y;
        let cx=page.result.offsetWidth/page.lens.offsetWidth;
        let cy=page.result.offsetHeight/page.lens.offsetHeight;
        pos=page.getCursorPos(ev);
        x=pos.x - (page.lens.offsetWidth/2);
        y=pos.y - (page.lens.offsetHeight/2);
        let coordsX=page.img.width - page.lens.offsetWidth;
        let coordsY=page.img.height - page.lens.offsetHeight;
        if (x > page.img.width - page.lens.offsetWidth) {x = page.img.width - page.lens.offsetWidth;
        }
    if (x < 0) {x = 0;}
    if (y > page.img.height - page.lens.offsetHeight) {y = page.img.height - page.lens.offsetHeight;
        }
    if (y < 0) {y = 0;}

    page.lens.style.left = x + "px";
    page.lens.style.top = y + "px";

    page.result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";    
    },
    getCursorPos: function(ev){
        let a, x=0,y=0;
        ev=ev||window.event;
        a=page.img.getBoundingClientRect();
        x=ev.pageX - a.left;
        y=ev.pageY - a.top;
        x=x-window.pageXOffset;
        y=y-window.pageYOffset;
        if(x>a.right||y>a.bottom){
            page.result.classList.remove("show");
            page.result.classList.add("hide");
            x=0;
            y=0;
        }
        return {"x":x,"y":y};
    }
}
document.addEventListener('DOMContentLoaded', page.addBox);
//bottom: 248
//height: 240
//left: 8
//right: 308
//top: 8
//width: 300
//x: 8
//y: 8
//ev.pageX=308
//ev.pageY=247