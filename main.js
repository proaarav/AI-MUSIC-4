scoreleftWrist = 0;
Peter_pan_song="";
Harry_potter_theme_song="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);

    poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("Posenet is Initialised");
}

function gotPoses(results){
    if(results.length > 0){
     console.log(results);
     
     scoreleftWrist = results[0].pose.keypoints[9].score;
     console.log(scoreleftWrist);
     leftWristX = results[0].pose.leftWrist.x;
     leftWristY = results[0].pose.leftWrist.y;
     console.log(" LeftWristX = " + leftWristX + " LeftWristY = " + leftWristY);
     rightWristX = results[0].pose.rightWrist.x;
     rightWristY = results[0].pose.rightWrist.y;
     console.log(" RightWristX = " + rightWristX + " RightWristY = " + rightWristY);

    }
}


function preload(){
    Peter_pan_song = loadSound("music2.mp3");
    Harry_potter_theme_song = loadSound("music.mp3");
}

function draw(){
 image(video,0,0,600,530);
 
 fill("#00ff00");
 stroke("#ff0000");

 song_name = Peter_pan_song.isPlaying();
 console.log(song_name);

 if(scoreleftWrist > 0.2){
     circle(leftWristX,leftWristY,20);
     Harry_potter_theme_song.stop();
     if(song_name == false){
         Peter_pan_song.play();
         document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Song";
     }
 }
}
