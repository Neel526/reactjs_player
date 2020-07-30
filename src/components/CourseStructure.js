import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player'
import '../App.css'

//https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=10&playlistId=PLB97yPrFwo5hpOay4v2nnDuUCZQMwyQzF&key=AIzaSyA6soqje2VYXSq8rHGfq1PCsjdJ1oYTp0Q

function Course(props) {
  const courseName = props.match.params.coursename;
  const [courses, setCourses] = useState([])

  useEffect(()=>{

    let playlistid =""
    if(courseName === "reactjs"){
      playlistid= "PLB97yPrFwo5hpOay4v2nnDuUCZQMwyQzF"
    }else{
      playlistid= "PLB97yPrFwo5gh4WP-VtwsVJbebyHbxNk6"
    }
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=10&playlistId=${playlistid}&key=AIzaSyA6soqje2VYXSq8rHGfq1PCsjdJ1oYTp0Q`)
    .then(res=>res.json())
    .then(data=>{
     const  result = data.items.map(item=>{
        return{title:item.snippet.title, vid:item.contentDetails.videoId} 
       
      })
      setCourses(result)
      uid(result[0].vid)
      utit(result[0].title)

    })
  },[])

  const [vid, uid] = useState("");
  const [title, utit] = useState("");
 const [counter, setCounter] = useState(0);
 const watched = (vid) =>{
   if(localStorage.getItem("saveID")){
      if(JSON.parse(localStorage.getItem("saveID")).includes(vid)){
        return true
      }
  }
  return false
 }
 
  const renderVideo = () => {
    return (
      <div className="video-container">
        
        <ReactPlayer
          className='react-player'
          url={`https://www.youtube.com/watch?v=${vid}`}
          width='100%'
          height='100%'
          controls={true}
          onEnded={()=>{
            if(localStorage.getItem("saveID")){
                let data = JSON.parse(localStorage.getItem("saveID"))
                localStorage.setItem("saveID",JSON.stringify([...data,vid]))
            }else{
              localStorage.setItem("saveID",JSON.stringify([vid]))
            }
          }}
        />
      </div>
    );
  };
  return (
    <>
    {courses.length > 0 ?
      <div className="app">
      <div className="app_left">
      {renderVideo()}
      <h3 className="title">{title}</h3>
      </div>
      <div className="app_right">
      <ul className= "collection">
        {
          courses.map((item,index)=>{
            return <li key= {item.vid} className={counter===index ? "collection-item myitem" : "collection-item"} onClick={()=>{
              uid(item.vid)
              utit(item.title)
              setCounter(index)
            }}>
            {item.title}
            {
              watched(item.vid) && <i className="tiny material-icons" >check </i>
            }
            
            </li>

          })
        }
      </ul>  </div>
    </div>
    : 
    <h1>loading</h1>
    }
    

    </>
  );
}

export default Course;
