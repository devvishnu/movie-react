import React, { useState } from "react";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyloadimages/Img";
import PlayIcon from "../PlayIcon";
import VideoPopUp from "../../../components/videoPopUp/VideoPopUp";
import "./style.scss";
const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(false);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.results?.map((video) =>(
                            <div key={video.id} 
                            className="videoItem"
                            onClick={()=>{
                                setShow(true) 
                                setVideoId(video.key)
                            }}
                            ><div className="videoThumbnail"> 
                                 <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}/>
                                 <PlayIcon/>
                              </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopUp
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;