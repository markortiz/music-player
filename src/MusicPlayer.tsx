import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-duration-format';
import './MusicPlayer.css';

interface Duration extends moment.Duration {
  format: (template?: string, precision?: number, settings?: DurationSettings) => string;
}

interface DurationSettings {
  forceLength: boolean;
  precision: number;
  template: string;
  trim: boolean | 'left' | 'right';
}

// Audio Library
const library = [
  { id: '5d353689-b81d-474c-8471-5220e27af78e', src: 'Petit Biscuit - Sunset Lover.mp3', title: 'Sunset Lover', artist: 'Petit Biscuit', album: 'Presence', albumArt: 'Petit Biscuit - Sunset Lover.jpg'},
  { id: '5c7ded41-b875-4381-8e24-0dabb00b4f5d', src: 'Chelsea Cutler - You\'re Not Missing Me.mp3', title: 'You\'re Not Missing Me', artist: 'Chelsea Cutler', album: 'You\'re Not Missing Me', albumArt: 'Chelsea Cutler - You\'re Not Missing Me.jpg'},
  { id: '5e39301e-aa8a-4169-b945-5bc4a7cb9432', src: 'MÖWE - Boy Oh Boy (feat. Jerry Williams).mp3', title: 'Boy Oh Boy', artist: 'MÖWE (feat. Jerry Williams)', album: 'Back In The Summer', albumArt: 'MÖWE - Boy Oh Boy (feat. Jerry Williams).jpg'},
];

// Instantiate Audio
const audio = new Audio();
audio.volume = 0.2;

const loadAudio = (src: String, playing: boolean = false) => {
  audio.src = `./music/${src}`;
  pausePlayAudio(playing);
}

const pausePlayAudio = (playing: boolean) => {
  if(playing){
    audio.play();
  } else {
    audio.pause();
  }
}

// MusicPlayer class
function MusicPlayer() {

  const [currenttime, setCurrenttime] = useState(0);

  const playingAudio = (event: Event) => {
    setCurrenttime(audio.currentTime);
  }

  const [nowplaying, setNowplaying] = useState(library[0]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audio.addEventListener('timeupdate', playingAudio);
    return () => {
      audio.removeEventListener('timeupdate', playingAudio);
    };
  })

  useEffect(() => {
    loadAudio(nowplaying.src, playing);
  }, [nowplaying]);
  
  useEffect(() => {
    pausePlayAudio(playing);
  }, [playing]);
  
  // Set Previous Audio by setNowplaying(library[0])
  const prevAudio = () => {
  }

  // Set Next Audio by setNowplaying(library[0])
  const nextAudio = () => {
  }

  const [volume, setVolume] = useState(20);

  // Set Volume by audio.volume [min: 0, max: 1]
  const changeVolume = (e: any) => {
  }

  const duration = moment.duration(currenttime, 'seconds') as Duration;
  const audioduration = moment.duration(audio.duration, 'seconds') as Duration;

  return (
    <div id="music-player" className="d-flex justify-content-center align-items-center">
      <div className="card bg-transparent">
        <img src={`./music/${nowplaying.albumArt}`} className="card-img-top" alt={nowplaying.title} />
        <img src={`./music/${nowplaying.albumArt}`} className="card-img-background position-absolute" alt={nowplaying.title} />
        <div className="card-body text-center">
          <input type="range" min={0} max={audio.duration} value={currenttime} className="slider position-relative mb-2" readOnly></input>
          <div className="row mb-2">
            <div className="col text-left text-white">{duration.format('mm:ss')}</div>
            <div className="col text-right text-white">{audioduration.format('mm:ss')}</div>
          </div>
          <h5 className="card-title text-white font-weight-bold mb-1">{nowplaying.title}</h5>
          <p className="card-text text-white">{nowplaying.artist}</p>
          <div className="row mb-4">
            <div className="col">
              <a href="#" onPointerUp={() => prevAudio()} className="btn btn-prev text-white btn-sm ml-2 mr-2 rounded-pill"><i className="fas fa-backward"></i></a>
              <a href="#" onPointerUp={() => setPlaying(!playing)} className="btn btn-play-pause text-white btn-outline-secondary p-0 ml-2 mr-2 rounded-pill">
                {playing ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}
              </a>
              <a href="#" onPointerUp={() => nextAudio()} className="btn btn-next text-white btn-sm ml-2 mr-2 rounded-pill"><i className="fas fa-forward"></i></a>
            </div>
          </div>
          <input type="range" min={0} max={100} value={volume} className="slider position-relative mb-2" onChange={changeVolume}></input>
          <div className="row">
            <div className="col text-left text-white"><i className="fas fa-volume-off"></i></div>
            <div className="col text-right text-white"><i className="fas fa-volume-up"></i></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
