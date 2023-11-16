// import React from 'react'

import warikoo from "./images/warikoo.jpeg";
import bb from "./images/bb.jpeg";
import carry from "./images/carry.jpeg";
import raghav from "./images/raghav.jpeg";
import tseries from "./images/tseries.jpeg";

import avatar from "./images/avatar.jpeg";

import { AiFillHome } from "react-icons/ai";
import { BsFire } from "react-icons/bs";
import { LiaDownloadSolid } from "react-icons/lia";
import { MdOutlineSubscriptions, MdOutlineWatchLater } from "react-icons/md";
import { BiSolidVideos, BiHistory, BiUserPin } from "react-icons/bi";

import Header from "./Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function VideoGrid(props) {
  const video = props.video;
  return (
    <div class="thumbnail">
      <div class="video">
        <Link to={`/video?id=${video.videoId}`}>
          <img class="yt-pic" src={video.thumbnail} />
        </Link>
      </div>
      <div class="video-title">
        <div class="yt-channel-icon">
          <img src={avatar}></img>
        </div>
        <div class="video-info">
          <h4 class="track-title margin-0 ">{video.title}</h4>
          <p class="margin-0 smaller-fontsize">T-series</p>
          <p class="margin-0 smaller-fontsize">{video.views} views</p>
        </div>
      </div>
    </div>
  );
}

function Home() {
  // let videos = [1,2,3]
  const [videos, setVideos] = useState([]);

  const url = "http://localhost:2000/videos";

  const getVideos = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      setVideos(json.videos);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);
  return (
    <>
      <Header />

      <div class="main-section">
        <div class="main-left">
          <button class="yt-side-button">
            {" "}
            <AiFillHome class="icon" />{" "}
            <span class="side-button-label white">Home</span>
          </button>

          <button class="yt-side-button">
            <BiSolidVideos class="icon" />{" "}
            <span class="side-button-label white">Shorts</span>
          </button>

          <button class="yt-side-button">
            <BsFire class="icon" />{" "}
            <span class="side-button-label white">Trending</span>
          </button>

          <button class="yt-side-button">
            <MdOutlineSubscriptions class="icon" />{" "}
            <span class="side-button-label white">Subscriptions</span>
          </button>

          <hr class="white"></hr>

          <p class="white side-button-label bold">You &gt; </p>
          <button class="yt-side-button">
            <BiUserPin class="icon" />{" "}
            <span class="side-button-label white">Your Channel</span>
          </button>
          <button class="yt-side-button">
            <BiHistory class="icon" />{" "}
            <span class="side-button-label white">History</span>
          </button>
          <button class="yt-side-button">
            <MdOutlineWatchLater class="icon" />{" "}
            <span class="side-button-label white">Watch Later</span>
          </button>
          <button class="yt-side-button">
            <LiaDownloadSolid class="icon" />{" "}
            <span class="side-button-label white">Downloads</span>
          </button>

          <hr class="white"></hr>

          <h6 class="side-button-label white bold">Favourites &gt; </h6>

          <button class="yt-side-button">
            <img src={carry} height={"30px"} width={"30px"}></img>
            <span class="side-channel-label white">Carry Minati</span>
          </button>

          <button class="yt-side-button">
            <img src={bb} height={"30px"} width={"30px"}></img>
            <span class="side-channel-label white">BB ki Vines</span>
          </button>

          <button class="yt-side-button">
            <img src={tseries} height={"30px"} width={"30px"}></img>
            <span class="side-channel-label white">T-Series</span>
          </button>

          <button class="yt-side-button">
            <img src={warikoo} height={"30px"} width={"30px"}></img>
            <span class="side-channel-label white">warikoo</span>
          </button>

          <button class="yt-side-button">
            <img src={raghav} height={"30px"} width={"30px"}></img>
            <span class="side-channel-label white">Raghav Chaitanya</span>
          </button>
        </div>

        <div class="main-right">
          <div className="navbar-container">
            <div className="navbar">
              <div className="nav-items white">All</div>
              <div className="nav-items white">Music</div>
              <div className="nav-items white">Computer Programming</div>
              <div className="nav-items white">Cricket</div>
              <div className="nav-items white">Stocks</div>
              <div className="nav-items white">Marketing</div>
              <div className="nav-items white">Hiking</div>
              <div className="nav-items white">Live</div>
              <div className="nav-items white">Tourism</div>
              <div className="nav-items white">Indian Populars</div>
              <div className="nav-items white">Motorcycles</div>
            </div>
          </div>

          {videos.map((video) => {
            return <VideoGrid video={video} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
