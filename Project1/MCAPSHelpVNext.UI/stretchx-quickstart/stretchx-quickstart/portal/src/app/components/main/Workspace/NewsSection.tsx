import React, { useState, useEffect } from "react";
import { IconButton, Image, Stack, Text } from "@fluentui/react";
import "./Dashboard.css";
// import teamImage from "./team8.png";
import teamImage2 from "./team9.png";
import teamImage3 from "./team3.jpg";
import teamImage from "./AIDemo1.jpg";

const NewsSection = ({ backgroundImage }) => {
  let images = [
    // {
    //   src: teamImage,
    //   alt: "AI Infusion Demo",
    //   url: "https://microsoft.sharepoint.com/sites/MCAPSHelp/SitePages/Global-Services-Operations-Center-(GSOC).aspx",
    //   title: "AI Infusion Demo",
    //   description: "Check out the infusion of AI into the MCAPSHelp",
    //   link: "https://microsoft.sharepoint.com/:v:/t/ESPlatform/EefRLGu9nXJJprJtQ0AKbFgBVdCcWzOw1WV5dMbyXpQjog"
    // },
    {
      src: teamImage,
      alt: "AI Infusion Demo",
      url: "https://aka.ms/MCAPSHelpAIDemo",
      title: "AI Infusion Demo",
      description: "Check out the infusion of AI into the MCAPSHelp",
      link: "https://aka.ms/MCAPSHelpAIDemo"
    },
    {
      src: teamImage2,
      alt: "WWIC Co-pilot Demo",
      url: "https://microsoft.sharepoint.com/sites/MCAPSHelp/SitePages/FY24-Commercial-Landing-Employee-FAQs.aspx",
      title: "WWIC Co-pilot Demo",
      description: "Check out the WWIC AI enabled Self-Help experience",
      link: "https://microsoft.sharepoint.com/:v:/t/ESPlatform/EavfXtUOBMZFvDtxfTZoEKkB7u6ME3bh91QKT22LXUjJMQ"
    }
    // ,
    // {
    //   src: teamImage3,
    //   alt: "Incentive Compensation Guide",
    //   url: "https://microsoft.sharepoint.com/teams/IncentiveCompensationGuide",
    //   title: "transformation in India",
    //   description: "Satya highlights AI transformation in India",
    //   link: "https://www.youtube.com/watch?v=9Ks3DBdh9IM&t=75s"
    // }
  ];

  // A state variable to keep track of the current image index
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => prevIndex === images.length - 1 ? 0 : prevIndex + 1)
    }, 3000)
    return () => clearInterval(intervalId);
  }, [])
  // A function to handle the previous button click
  const handlePrev = () => {
    // Decrease the index by 1, or wrap around to the last image if the index is 0
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  // A function to handle the next button click
  const handleNext = () => {
    // Increase the index by 1, or wrap around to the first image if the index is the last one
    setIndex(index === images.length - 1 ? 0 : index + 1);
  };
  const openIframe = (iframeSrc) => {
    try {
      const iframe = document.createElement("iframe");

      iframe.src = iframeSrc;
      window.open(
        iframe.src,
        "thirdPartyPopup",
        "width=" +
        window.outerWidth * 0.9 +
        ", height=" +
        window.outerHeight * 0.7 +
        ", top=200, left=42, frameborder=0, allowfullscreen, toolbar=no ,location=0, status=no, titlebar=no, menubar=no"
      );

    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = () => {
    window.open(images[index].url);
  };
  return (
    <>
      <div className="newsContainer">
        <div className="newsHeader">
          <h5>Stories</h5>
        </div>
        <div className="newsContent">
          <div className="iconLeft">
            <IconButton className="iconFontSize"
              iconProps={{ iconName: "ChevronLeft" }}
              onClick={handlePrev}
              style={{ color: "black", fontWeight: "bold" ,marginLeft:3 , fontSize:"10px !important" }}
            />
          </div>
          <div className="imageAndDesc">
            <div className="flex-left">
              <div
                className="container3"
                style={{
                  backgroundImage: ` url(${images[index].src})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }}>
              </div>
            </div>
            <div className="flex-right">
              <div >
                <div className="title">  <a href={images[index].link} target='_blank'>{images[index].title}</a>
                </div>
              </div>
              <div className="itemDescription" >
                {images[index].description}
              </div>
            </div>
          </div>
          <div className="iconRight">
            <IconButton className="iconFontSize"
              iconProps={{ iconName: "ChevronRight" }}
              onClick={handleNext}
              style={{ color: "black", fontWeight: "bold" , fontSize:"10px !important" }}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="colIndicatorsNews" style={{ marginTop: 204 }}>
          <div className="colIcon">
          <Stack horizontal horizontalAlign="center" verticalAlign="end">
          <span>
            <IconButton 
              iconProps={{ iconName: index === 0 ? "CircleFill" : "CircleFill" }}
              onClick={handlePrev}
              // style={{ color: index === 0 ? "#6264A7" : "#D1D1D1", fontWeight: "bold", height: 10, fontSize: 9 }}
              style={{ color: index === 0 ? "#6264A7" : "#D1D1D1", fontWeight: "bold", height: 10, fontSize: 9 }}
                
           />
            </span>
            <span className="iconthird">
            <IconButton
              iconProps={{ iconName: index === images.length - 1 ? "CircleFill" : "CircleFill" }}
              onClick={handlePrev}
              // style={{ color: index === images.length - 1 ? "#6264A7" : "#D1D1D1", fontWeight: "bold", height: 10, fontSize: 9 }}
              style={{ color: index === images.length - 1 ? "#6264A7" : "#D1D1D1", fontWeight: "bold", height: 10, fontSize: 9 }}
              
          />
             </span>
            </Stack>
          </div>
          <Stack.Item grow={1}>
            <span />
          </Stack.Item>

        </div>

      </div>
    </>
  );
};

export default NewsSection;


