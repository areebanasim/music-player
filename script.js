let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myprogressBar = document.getElementById('myprogressBar');
const songItems = Array.from(playlist.children);
let mastersongName = document.getElementById('mastersongName');
let songlistPlay = document.getElementsByClassName('songlistPlay');
let songDurationElement = document.getElementById('songDuration');

let songs = [
    { songName: "Salam-e-ishq", filepath: "salam e ishq.mp3" },
    { songName: "Adha Ishq", filepath: "Adha Ishq.mp3" },
    { songName: "Aogy Jab Tum", filepath: "Aogy Jab Tum.mp3" },
    { songName: "Tere Hawale", filepath: "Tere Hawale.mp3" },
    { songName: "Tum Kya Mile", filepath: "Tum Kya Mile.mp3" },
    { songName: "What Jhumka", filepath: "What Jhumka.mp3" },
]


//handle play/pause buttons
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})



//listen to events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate')
})


audioElement.addEventListener('timeupdate', () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myprogressBar.value = progress;
});

myprogressBar.addEventListener('input', () => {
    const seekTime = (myprogressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});



const makeallplay = () => {
    Array.from(document.getElementsByClassName('songitemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songitemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeallplay();
        index = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        const selectedSong = songs[index];
        audioElement.src = selectedSong.filepath;
        mastersongName.innerText = selectedSong.songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
});

function toggleSonglistPlayButtons() {
    songItems.forEach((element, i) => {
        const songlistPlay = element.querySelector('.songitemPlay');
        if (i === index) {
            songlistPlay.classList.remove('fa-circle-play');
            songlistPlay.classList.add('fa-circle-pause');
        } else {
            songlistPlay.classList.remove('fa-circle-pause');
            songlistPlay.classList.add('fa-circle-play');
        }
    });
}

document.getElementById('next').addEventListener('click', () => {
    if (index < songs.length - 1) {
        index++;
    } else {
        index = 0; // Loop to the first song
    }
    const selectedSong = songs[index];
    audioElement.src = selectedSong.filepath;
    mastersongName.innerText = selectedSong.songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    toggleSonglistPlayButtons();
});

document.getElementById('previous').addEventListener('click', () => {
    if (index > 0) {
        index--;
    } else {
        index = songs.length - 1; // Loop to the first song
    }
    const selectedSong = songs[index];
    audioElement.src = selectedSong.filepath;
    mastersongName.innerText = selectedSong.songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    toggleSonglistPlayButtons();
});

audioElement.addEventListener('timeupdate', () => {
    // Calculate the minutes and seconds from the audio's currentTime
    const currentTime = audioElement.currentTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);

    // Format the time as "mm:ss"
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Update the songDurationElement with the formatted time
    songDurationElement.textContent = formattedTime;
});
