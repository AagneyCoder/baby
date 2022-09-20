song = "";
status = "";
objects = [];


function setup() {
    canvas = createCanvas(380 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380 , 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status :  Detecting Objects"; 
}


function modelLoaded() {
    console.log('Model Loaded!');
    status = true;
    
}

function gotResult(error , results) {
 if (error){
    console.log(error);
 }
 console.log(results);
 objects = results;
}

function preload() {
    song = loadSound('song.mp3');  
}

function draw() {
    image(video ,0 , 0 , 380 , 380 );

    if (status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video , gotResult);
        for (i = 0; 1 < objects.length; i++)
        {
        document.getElementById("status").innerHTML = "Status :  Detecting Objects"; 
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
        fill(r,g,b);

        fill('#FF0000');
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "  " + percent + "%" , objects[i].x , objects[i].y);
        noFill();
        stroke(r,g,b);
       
        rect(objects[i].x -10 , objects[i].y - 15 , objects[i].width , objects[i].height );
        if(objects[i].label=="person"){
            document.getElementById("number_of_objects").innerHTML = "Baby Found : ";
            song.stop();
        }
        else{
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found : ";
            song.play();
        }
        }
    }
    
    
}