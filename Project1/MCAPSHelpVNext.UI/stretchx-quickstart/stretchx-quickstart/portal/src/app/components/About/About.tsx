import {
  GroupedList,
  Icon,
  IconButton,
  Image,
  Link,
  List,
  PrimaryButton,
  ScrollablePane,
  Stack,
  Text,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { Spinner } from "@fluentui/react";
import { injectIntl } from "react-intl";
import "./about.css";
import logo from "./about.svg";
import { getConsumptionAPI } from "../../utils/httpUtils";
import {
  IAppAuthContext,
  IAppContext,
  ServiceContext,
} from "@msx/platform-services";
import profile from "./profile.jpg";
import { json } from "body-parser";

const AboutComponent = () => {
  const [itemContent, setitemContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [htmlContents, sethtmlContent] = useState();
  const [parentKey, setParentKey] = useState([]);
  const context = React.useContext(ServiceContext);

  useEffect(() => {
    getAboutData();
    openSharePointPage();
  }, []);

  interface CustomWindow extends Window {
    popupTop?: number;
    popupLeft?: number;
  }

  (window as CustomWindow).popupTop = 270;
  (window as CustomWindow).popupLeft = 280;

  function openSharePointPage() {
    let pageUrl =
      "https://microsoft.sharepoint.com/:u:/r/sites/MCAPSHelp/SitePages/About-MCAPSHelp.aspx?csf=1&web=1&e=F6Jr4A";

    let popupWindow = window.open(
      pageUrl,
      "SharePointPage",
      "width=650, height=420, top=" +
        (window as CustomWindow).popupTop +
        ", left=" +
        (window as CustomWindow).popupLeft +
        ", right=100"
    );
  }

  const getAboutData = async () => {
    try {
      if (context && context.telemetryClient) {
        const responseServiceWorkspace = await getConsumptionAPI(
          `/api/about/GetHtmlContent`,
          context.authClient
        );
        if (responseServiceWorkspace.data) {
          let result = checkResponse(responseServiceWorkspace);
          if (result === "success") {
            setitemContent(JSON.parse(responseServiceWorkspace.data[0]));
            setIsLoading(false);
            responseServiceWorkspace.data[1].map((e) =>
              sethtmlContent(e.htmlContent)
            );
          } else {
          }
        }
      }
    } catch (error) {
      console.error("An error occurred while fetching data.");
    } finally {
      //
    }
  };

  const checkResponse = (response) => {
    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return "success";
      case 401:
      default:
        return "error";
    }
  };

  const handleclick = (item) => {
    if(item.Name === "About MCAPS Help")
    {
      openSharePointPage();
    }
    if (item.Url !== null) {
      window.open(item.Url, "_blank");
    }
  };

  const showGroup = (classname, isOpen) => {
    const list = document.querySelector(".groupedList" + classname);
    const groupShow = document.querySelector(".showGroupClass" + classname);
    const groupClose = document.querySelector(".closeGroupClass" + classname);
    list["style"].display = isOpen ? "block" : "none";
    groupShow["style"].display = isOpen ? "none" : "inline";
    groupClose["style"].display = isOpen ? "inline" : "none";
  };

  const onRenderCell = (item, index) => {
    if (item.Children !== null && item.Children.length > 0) {
      return (
        <>
          <Stack
            horizontal
            aria-label={item.name}
            role="link"
            tabIndex={0}
          >
            <Icon
              iconName="AddIn"
              style={{ color: "black", backgroundColor: "#EDEBE9" }}
            />
            &nbsp;&nbsp;
            <Text className="listTitle"> {item.Name}</Text>
            <Icon
              iconName="ChevronDown"
              className={"showGroupClass" + item.Key}
              style={{
                color: "black",
                backgroundColor: "#EDEBE9",
                cursor: "pointer",
                display: "inline",
              }}
              tabIndex={0}
              onClick={() => showGroup(item.Key, true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ")
                  showGroup(item.Key, true);
              }}
            />
            <Icon
              iconName="ChevronUp"
              className={"closeGroupClass" + item.Key}
              style={{
                color: "black",
                backgroundColor: "#EDEBE9",
                cursor: "pointer",
                display: "none",
              }}
              tabIndex={0}
              onClick={() => showGroup(item.Key, false)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ")
                  showGroup(item.Key, false);
              }}
            />
          </Stack>
          <List
            className={"groupedList" + item.Key}
            style={{ display: "none" }}
            items={item.Children}
            onRenderCell={showGroupedCell}
            key={item.Id}
          />
        </>
      );
    } else {
      return (
        <Stack
          horizontal
          tokens={{ childrenGap: "20px" }}
          aria-label={item.name}
          role="link"
        >
          <Link
            onClick={() => handleclick(item)}
            style={{ textDecoration: "none", display: "inline-flex" }}
          >
            <Icon
              iconName="AddIn"
              style={{ color: "black", backgroundColor: "#EDEBE9" }}
            />
            <Text
              style={{ cursor: "pointer" }}
              className="linkListTitle"
              onClick={() => handleclick(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ")
                  handleclick(item);
              }}
            >
              {item.Name}
            </Text>
          </Link>
        </Stack>
      );
    }
  };

  const showGroupedCell = (item, index) => {
    return (
      <Stack horizontal style={{ marginLeft: "15px", marginTop: "2px" }}>
        <Link
          onClick={() => handleclick(item)}
          style={{ textDecoration: "none", display: "inline-flex" }}
        >
          {" "}
          <Text style={{ fontSize: "larger", fontWeight: "bolder" }}>.</Text>
          &nbsp;
          <Text
            style={{ cursor: "pointer" }}
            className="listTitle groupedList"
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ")
                handleclick(item);
            }}
          >
            {" "}
            {item.Name}
          </Text>
        </Link>
      </Stack>
    );
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="aboutus">
          <Stack
            horizontal
            tokens={{ childrenGap: "20" }}
            className="parentContainer"
          >
            <Stack className="linkOuter">
              <Stack verticalFill className="linkTab">
                {!isLoading && itemContent && itemContent.length > 0 ? (
                  <List items={itemContent} onRenderCell={onRenderCell} />
                ) : (
                  <>Loading...</>
                )}
              </Stack>
            </Stack>
            <Stack className="mainContent">
              {/* <div dangerouslySetInnerHTML={{ __html: htmlContents }} /> */}
            </Stack>
          </Stack>
        </div>
        <div
          style={{
            flex: "25%",
            display: "flex",
            justifyContent: "center",
            alignItems: "top",
            marginTop: "20%",
          }}
        >
          <div className="loader">
            <Spinner label="Loading..." />
          </div>
        </div>
      </div>
    </>
  );
};

export const About = injectIntl(AboutComponent);
