let page={
    //Make lens element;
    lens:document.createElement("div"),
    //get image
    img:document.getElementById("map_img"),
    //get result div
    result:document.getElementById("zoom"),
    
    init: function(ev){
        //remove the hide class from result div;
        page.result.classList.remove("hide");
        //add the show class to result div;
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
        //call moveLens function pass event (ev).
        page.moveLens(ev);
    },
    addBox: function(){
        //Hide the result div;
        page.result.classList.add("hide");
        //create event listern on mouse move;
        document.addEventListener("mousemove",page.init);
        
    },
    moveLens: function(ev){
        //prevent any actions that might happend on mouse move by default.
        ev.preventDefault();
        let pos,x,y;
        //create local variable with ratio calculation X
        let cx=page.result.offsetWidth/page.lens.offsetWidth;
        //create local variable with ration calculation Y
        let cy=page.result.offsetHeight/page.lens.offsetHeight;
        //store the return value of function getCursorPos in "pos" variable
        pos=page.getCursorPos(ev);
        //calculate midpoint of lens X;
        x=pos.x - (page.lens.offsetWidth/2);
        //calculate midpoint of lenss Y
        y=pos.y - (page.lens.offsetHeight/2);
        //set position of page lens X
        page.lens.style.left = x + "px";
        //set position of page lens Y
        page.lens.style.top = y + "px";
        //calculate the background position of the result div this is the portion of the image that is within the frame of the lens which will project on the result div. 
        page.result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";    
    },
    getCursorPos: function(ev){
        let a, x=0,y=0;
        //store event in a variable
        ev=ev||window.event;
        //get coordinates of the image.
        a=page.img.getBoundingClientRect();
        //calculate the coordinates of the pointer
        x=ev.pageX - a.left;
        y=ev.pageY - a.top;
        //add condition when pointer is out of img frame to hide result div
        if(x>a.right-15||y>a.bottom-50||y<a.top||x<a.left-7){
            page.result.classList.remove("show");
            page.result.classList.add("hide");
            //set default position of lens
            x=13;
            y=13;
        }
        //return an object with the x and y coordinates.
        return {"x":x,"y":y};
    }
}
document.addEventListener('DOMContentLoaded', page.addBox);
