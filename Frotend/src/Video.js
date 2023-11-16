import React, { useEffect, useState } from "react";
import Header from "./Header";
import avatar from "./images/avatar.jpeg";

import {LiaThumbsDown, LiaThumbsUp, LiaDownloadSolid} from 'react-icons/lia'
import {IoMdThumbsUp} from 'react-icons/io'
import {PiShareFatLight} from 'react-icons/pi'
import { SlOptions } from "react-icons/sl";
import { Link } from 'react-router-dom'

// import sv1 from "./images/sv1.jpeg";
// import sv2 from "./images/sv2.jpeg";
// import sv3 from "./images/sv3.jpeg";
// import sv4 from "./images/sv4.jpeg";
// import sv5 from "./images/sv5.jpeg";

function SuggestedVideos(props) {
  let video= props.video;
  return (
    <>
      <div className="suggested-video">
        <div className="suggestion-image">
          {/* <iframe src="https://www.youtube.com/embed/jKybt-F4Jto?si=GVS9tJbmh3Kf4agf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
          

          <Link to={`/video?id=${video.videoId}`} 
          onClick={() => {
            props.setVideoId(video.videoId)
            props.setVideo(video)
            }}>
              {/* <img src={video.thumbnail}></img> */}
          <img class="suggestion-thumbnail" src={video.thumbnail} width={'230px'} />
        </Link>
        </div>

        <div className="suggestion-content">
          <div class="video-info">
            <h7 class="track-title margin-0 video-info-title font-weight-bold">
              {video.title};
            </h7>
            <p class="margin-0 smaller-fontsize">Ranveer Allahbadia</p>
            <p class="margin-0 smaller-fontsize">{video.views} views</p>
          </div>
        </div>
      </div>

      {/* <div className="suggested-video">
        <div className="suggestion-image">
          <img src={sv2}></img>
        </div>

        <div className="suggestion-content">
          <div class="video-info">
            <h7 class="track-title margin-0 video-info-title font-weight-bold">
              UNKNOWN Facts Of Shiva On Earth
            </h7>
            <p class="margin-0 smaller-fontsize">Ranveer Allahbadia</p>
            <p class="margin-0 smaller-fontsize">230M views</p>
          </div>
        </div>
      </div> */}
{/* 
      <div className="suggested-video">
        <div className="suggestion-image">
          <img src={sv3}></img>
        </div>

        <div className="suggestion-content">
          <div class="video-info">
            <h7 class="track-title margin-0 video-info-title font-weight-bold">
              Deepinder Goyal - Journey From Startup To IPO
            </h7>
            <p class="margin-0 smaller-fontsize">Ranveer Allahbadia</p>
            <p class="margin-0 smaller-fontsize">230M views</p>
          </div>
        </div>
      </div> */}

      {/* <div className="suggested-video">
        <div className="suggestion-image">
          <img src={sv4}></img>
        </div>

        <div className="suggestion-content">
          <div class="video-info">
            <h7 class="track-title margin-0 video-info-title font-weight-bold">
              Panel Discussion with MS DHONI, Tanmay Bhat
            </h7>
            <p class="margin-0 smaller-fontsize">Ranveer Allahbadia</p>
            <p class="margin-0 smaller-fontsize">230M views</p>
          </div>
        </div>
      </div> */}

      {/* <div className="suggested-video">
        <div className="suggestion-image">
          <img src={sv5}></img>
        </div>

        <div className="suggestion-content">
          <div class="video-info">
            <h7 class="track-title margin-0 video-info-title font-weight-bold">
              Honey Singh | Biggest Comeback Ever | AJIO Presents{" "}
            </h7>
            <p class="margin-0 smaller-fontsize">Ranveer Allahbadia</p>
            <p class="margin-0 smaller-fontsize">20M views</p>
          </div>
        </div> 
      </div>*/}
    </>
  );
}

function VideoInfo(props) {
  const video = props.currVideo;
  console.log(props)


  const [likes, setLikes] = useState(video.likes);

  const copyToClipboard = (text) => {
    console.log('text', text);
    var textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();

    alert(" Link copied to Clipboard : " + text);
  }

  useEffect(() => {
    setLikes(video.likes)
  }, [video.likes])


    const handleLikes = () => {

      let newLikes = JSON.parse(localStorage.getItem(`like_${video.id}`)) ? 
      JSON.parse(localStorage.getItem(`like_${video.id}`))
      : [];
      if(newLikes.includes(localStorage.getItem('email'))){
        newLikes.pop(localStorage.getItem('email'));
      }else{
        newLikes.push(localStorage.getItem('email'));
      }
      
      localStorage.setItem(`like_${video.id}`, JSON.stringify(newLikes))
      
      const requesturl = `http://localhost:2000/video/${video._id}/like`;
  
      fetch(requesturl, {method: 'POST', 
          headers:{
              'Content-Type': 'application/json', 
              'Authorization' : localStorage.getItem('token')
          }})
      .then(response => {
          console.log(response)
          if(response.ok){
              return response.json();
          }else{
              throw new Error(response.message)
          }
      })
      .then(data => {
          if(data.success){
              console.log("Success", data.video)
              setLikes(data.video.likes)
            }else{
              alert(data.message)
          }
          console.log(data)
      })
      .catch(error => {
          console.log(error)
      })
    }
  
    console.log("Likes", likes);


  return (
    <>
      <h5 class="white video-name ">
        {video.title}
      </h5>
      <div className="video-details">
        <div className="channel-info white">
          <img src={avatar} width={"30px"} height={"30px"}></img>
          <div class="margin-0 millions line-height">
              <p class="margin-left bold">Ranveer Allahbadia</p>
              <p class="white smaller-fontsize left grey">6.54M subscribers</p>
          </div>
          <button className="subscribe">Subscribe</button>
        </div>

        <div className="video-action-buttons">

        <button onClick={() => {handleLikes()}} className="white like-button">
            { (JSON.parse(localStorage.getItem(`like_${video.id}`)) ? 
              JSON.parse(localStorage.getItem(`like_${video.id}`))
              : []).includes(localStorage.getItem('email')) ? 
              <IoMdThumbsUp class="icon-bg" size={'1.4rem'} />
            :
              <LiaThumbsUp class="icon-bg" size={'1.4rem'} />
            }
            {/* <LiaThumbsUp size={'1.4rem'} /> */}
            {likes} | <LiaThumbsDown class="icon-bg" size={'1.4rem'} />
        </button>

        <button onClick={() => copyToClipboard(window.location.href)} className="white share-button">
            <PiShareFatLight class="icon-bg" size={'1.4rem'}/>
            Share</button>
          <a href={`https://www.ssyoutube.com/watch?v=${video.videoId}`} 
            target='_blank'>
              <button class="buttons white">
            <LiaDownloadSolid class="icon-bg" size={'1.4rem'}/>
            Download</button>
          </a>

          <button className="white options-button">
            <SlOptions class="icon-bg" size={"1.4rem"} />
          </button>
        </div>
      </div>

      <div className="desc">
          <b className="white">{video.views} views &nbsp; Nov 4, 2023</b>
          {/* <span class="blue"> #10 on Trending</span> */}
          {/* <br></br> */}
          {/* <br></br> */}
          <p>{video.description}</p>
      </div>
    </>
  );
}

function Video() {
  // const [seconds, setSeconds] = useState(10);
  // const targetTime = Math.floor((new Date()).getTime()/1000 + 10);

  const [currVideoId, setCurrentVideoId] = useState("");
  const [currVideo, setCurrVideo] = useState({});
  const [videos, setVideos] = useState([]);

  const url = "http://localhost:2000/videos"

  const getVideos = async()=>{
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      setVideos(json.videos);

      let currId = (new URL(window.location)).searchParams.get('id');

      for(let i = 0; i < json.videos.length; i++){
        console.log(json.videos[i].videoId, " | ", currId)
        if(json.videos[i].videoId == currId){
          console.log("matched")
          setCurrVideo(json.videos[i]);
          break;
        }
      }
    } catch (error) {
      console.log("ERROR :", error);
      
    }
  }
  // when page renders
  useEffect(()=>{
  // Create a new URL object
    let address = new URL(window.location);

  // Get searchParameters property of the URL object
    let queryParameters = address.searchParams;

  // Retrieve specific query parameters
    let currVideoId = queryParameters.get("id");

    setCurrentVideoId(currVideoId);

  getVideos();

  },[]);

  // let videos = [1, 2, 3, 4, 5];
  return (
    <div>
      <Header />
      {/* <h2>Remaining Time : {seconds}</h2> */}
      <div className="video-main-page">
        <div className="video-frame">
          <iframe
            className="iframe-video"
            src={`https://www.youtube.com/embed/${currVideoId}?si=Fzs6uWVXodru1Wr3?rel=0&mute=1&autoplay=1`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <VideoInfo currVideo={currVideo} />
        </div>
        <div className="suggestions">
          <h6 className="white">Suggested Videos : </h6>
          {videos.map((video) => {
            return <SuggestedVideos video={video} 
            setVideoId={setCurrentVideoId} 
            setVideo={setCurrVideo}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Video;
