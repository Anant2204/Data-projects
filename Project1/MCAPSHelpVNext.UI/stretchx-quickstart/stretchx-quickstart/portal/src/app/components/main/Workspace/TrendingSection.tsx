import React, { useState, useEffect } from "react";
import {IconButton, Image, Stack, Text } from "@fluentui/react";
import "./Dashboard.css";
import teamImage from "./team.jpeg";
import teamImage2 from "./team2.jpg";
import teamImage3 from "./team3.jpg";

const TrendingSection = ({ backgroundImage }) => {
  let images = [
    {
      src: teamImage,
      alt: "Incentive Compensation Guide",
      url: "https://microsoft.sharepoint.com/teams/IncentiveCompensationGuide",
    },
    {
      src: teamImage2,
      alt: "What’s New in MCAPSHelp",
      url: "https://aka.ms/MCAPSHelpPromo",
    }
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


      <Stack
        className="container2"
        styles={{
          root: {
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 4), rgba(0, 0, 0, 0.2)), url(${images[index].src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right"


          }
        }}>
        <div
          style={{
            height: 22,
            width:"fit-content",
            padding: "2px 15px 2px 15px",
            borderRadius: 100,
            backgroundColor: "#323130",
            marginTop: 25,
            marginLeft: 45,
          }}>
          <Text
            style={{
              width: 48,
              height: 18,
              fontFamily: "Segoe UI",
              fontWeight: 600,
              lineHeight: "18px",
              fontSize: 12,
              display: 'block',
              alignContent: "center",
              textAlign: "center",
              color:"#fff"
            }}>
            Popular
          </Text>
        </div>

        <Stack
          horizontal
          style={{
            marginTop: 15,
            display: "flex",
          }}
          horizontalAlign="start">
          <IconButton
            iconProps={{ iconName: "ChevronLeft" }}
            onClick={handlePrev}
            style={{ color: "black", fontWeight: "bold" }}
          />

          <Text onClick={handleClick}
            style={{
              width: 260,
              height: 60,
              marginLeft: 30,
              fontFamily: "Segoe UI",
              fontWeight: 600,
              fontSize: "22px",
              cursor: 'pointer'
            }}>
            {images[index].alt}
          </Text>
          <Stack.Item grow={1}>
            <span />
          </Stack.Item>
          <IconButton
            iconProps={{ iconName: "ChevronRight" }}
            onClick={handleNext}
            style={{ color: "black", fontWeight: "bold", marginLeft: "500" }}
          />
        </Stack>
        <div className="colIndicators" style={{ marginTop: 72 }}>
          <Stack horizontal horizontalAlign="center" verticalAlign="end">
            <IconButton
              iconProps={{ iconName: index === 0 ? "CircleFill" : "CircleFill" }}
              onClick={handlePrev}
              style={{ color: index === 0 ? "#6264A7" : "#D1D1D1", fontWeight: "bold", height: 10, fontSize: 9 }}
            />
            {/* <IconButton
              iconProps={{ iconName: index > 0 && index < images.length - 1 ? "CircleFill" : "CircleFill" }}
              onClick={handlePrev}
              style={{ color: index > 0 && index < images.length - 1 ? "#6264A7" : "#D1D1D1", fontWeight: "bold", height: 10, fontSize: 9 }}
            /> */}
            <IconButton
              iconProps={{ iconName: index === images.length - 1 ? "CircleFill" : "CircleFill" }}
              onClick={handlePrev}
              style={{ color: index === images.length - 1 ? "#6264A7" : "#D1D1D1", fontWeight: "bold", height: 10, fontSize: 9 }}
            />
          </Stack>
        </div>

      </Stack>


    </>
  );
};

export default TrendingSection;