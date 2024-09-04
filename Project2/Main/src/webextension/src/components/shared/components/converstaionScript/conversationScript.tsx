import { TestImages } from '@fluentui/example-data';
import React, { useEffect, useState, useRef } from "react";
import { injectIntl } from "react-intl";
import { toast } from "react-toastify";
import {
  classNamesFunction,
  Shimmer,
  ShimmerElementType,
} from "@fluentui/react";

import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FluentProvider, webDarkTheme, webLightTheme,
  Accordion,
  AccordionHeader,
  AccordionPanel,
  AccordionItem
} from "@fluentui/react-components";
import { getStyles } from "./conversationScript.styles";
import { useSelector } from "react-redux";
import { getCurrentTheme, logException } from "../../../../utils";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { messages } from "./conversationScript.messages";
import { IEmployeeData, ITaxonomyMap } from "../../../../interfaces/ApiResponseModel/IConversationScript";
import { clearConversationScriptData, fetchConversationScriptData } from "../../../../store/actions/comman.action";
import { IMessageState } from "../../../../interfaces";
import { OseCommonMesssageBar, OseOverlaySpinner } from "../../../molecules";
import { postAPI } from "../../../../utils/httpUtils";
import { ConversationGrid } from "./conversationGrid";
import { receiveConversationPage, sendConversationPage } from '../../../../constants/componentCodes.constant';
import { Dismiss24Regular } from "@fluentui/react-icons";
import { SectionNames } from "../../../../constants/enum";

let classes: any;
const getClassNames = classNamesFunction<any, any>();

const ConversationScriptComponent = (props) => {
  const { parentContext, intl, hideDialog,
    toggleHideDialog,
    pageName,
    empAlias,
    saveParamInfo,
    singleConversationSaveCancelEvent,
    isPageReadOnly,
    isPendingCoversation
  } = props;

  //sections content setters  
  const [keyMessages, setKeyMessages] = useState({ content: null, displayValue: null}); 
  const [usefulResources, setUsefulResources] = useState({ content: null, displayValue: null});
  const [openingSection, setOpeningSection] = useState({ content: null, displayValue: null});
  const [openingHeaderContext, setOpeningHeaderContext] = useState({ content: null});
  const [segmentContext, setSegmentContext] = useState({ content: null, displayValue: null});
  const [taxonomyContext, setTaxonomyContext] = useState({ content: null, displayValue: null});
  const [taxonomyContextExtended, setTaxonomyContextExtended] = useState({ content: null});

  const [closingContext, setClosingContext] = useState({ content: null, displayValue: null});
  const [specificChangeForEmployee, setSpecificChangeForEmployee] = useState({ content: null, displayValue: null});
  const [specificChangeContextExtended, setSpecificChangeContextExtended] = useState({ content: null});

  
  const [enableCheckbox, setEnableCheckbox] = useState(true);
  const [empName, setEmpName] = useState('');
  const [scriptTitle, setScriptTitle] = useState<string>('');

  const [showSaveErrorFlag, setShowSaveErrorFlag] = useState(false);
  const [saveLoadingFlag, setSaveLoadingFlag] = useState(false);
  const [gridData, setGridData] = useState<ITaxonomyMap[]>([]);


  const containerRef = useRef(null);
  const theme = useSelector(getCurrentTheme);
  classes = getClassNames(getStyles, theme);

  const conversationScriptData: IEmployeeData = useAppSelector(
    (state) => state?.commonReducer?.conversationScriptData
  );

  const isLoading = useAppSelector( 
    (state) => state?.commonReducer?.isLoading
  );

  function toggleHide(): void {
    setShowSaveErrorFlag(false)
    setEnableCheckbox(true)
    toggleHideDialog(false);
    dispatch(clearConversationScriptData());
    setSummerizeContent('');
    singleConversationSaveCancelEvent(false);
  }

  useEffect(() => {
    if (conversationScriptData) {
       // setting section name and html content
      const keyMessageToLand = conversationScriptData?.sectionDetails?.filter(section => section.sectionName === SectionNames.KeyMessageToLand)
      setKeyMessages({content: keyMessageToLand[0]?.content, displayValue: keyMessageToLand[0]?.displayValue})

      const usefulResources = conversationScriptData?.sectionDetails?.filter(section => section.sectionName === SectionNames.UsefulResource)
      setUsefulResources({content: usefulResources[0]?.content, displayValue: usefulResources[0]?.displayValue});

      const openingContext = conversationScriptData?.sectionDetails?.filter(section => section.sectionName === SectionNames.OpeningContext)
      setOpeningSection({content: openingContext[0]?.content, displayValue: openingContext[0]?.displayValue});

      const openingHeaderContext = conversationScriptData?.sectionDetails?.filter(section => section.sectionName === SectionNames.OpeningHeaderContext)
      setOpeningHeaderContext({content: openingHeaderContext[0]?.content});

      const segmentContext = conversationScriptData?.sectionDetails?.filter(section => section.sectionName === SectionNames.SegmentContext)
      setSegmentContext({content: segmentContext[0]?.content, displayValue: segmentContext[0]?.displayValue});

      const taxonomyContext = conversationScriptData?.sectionDetails?.filter(section => section.sectionName === SectionNames.TaxonomyContext)
      setTaxonomyContext({content: taxonomyContext[0]?.content, displayValue: taxonomyContext[0]?.displayValue});

      const taxonomyContextExtended = conversationScriptData?.sectionDetails?.filter(section => section.sectionName === SectionNames.TaxonomyContextExtended)
      setTaxonomyContextExtended({content: taxonomyContextExtended[0]?.content});
      
      const closingContext = conversationScriptData?.sectionDetails?.filter(section => section.sectionName === SectionNames.ClosingContext)
      setClosingContext({content: closingContext[0]?.content, displayValue: closingContext[0]?.displayValue});

      const specificChangeContext = conversationScriptData?.sectionDetails?.filter(section => section.sectionName === SectionNames.SpecificChangeContext)
      setSpecificChangeForEmployee({...specificChangeForEmployee,  displayValue: specificChangeContext[0]?.displayValue})

      const specificChangeContextExtended = conversationScriptData?.sectionDetails?.filter(section => section.sectionName === SectionNames.SpecificChangeContextExtended)
      setSpecificChangeContextExtended({content: specificChangeContextExtended[0]?.content});

      const TitleSection = conversationScriptData?.sectionDetails?.filter(section => section.sectionName === SectionNames.Title)
    
      setEmpName(conversationScriptData.empName);
      setGridData(conversationScriptData.tableData);
      setScriptTitle(TitleSection[0]?.content)

      const specificChangeContextDate = conversationScriptData?.sectionDetails?.filter(section => section.sectionName === SectionNames.SpecificChangeContextDate)
      
      let specificForEmpContent = ''; 
      if (conversationScriptData.tableData?.length > 0) {
        conversationScriptData.tableData?.forEach(row => {
          if (row.hasChanged) {
            if (row.fieldName === 'Incentive Plan') {
              specificForEmpContent += `Your Incentive Plan is changing from  ${row.cy} to ${row.fy}. ${specificChangeContext[0]?.content} <br />`
            } else {
              specificForEmpContent += `Your ${ row.fieldName } is changing from ${ row.cy } to ${ row.fy }.<br />`;
            }
          }
        });
      }
      if(specificForEmpContent.length > 0){
        specificForEmpContent = `As of ${specificChangeContextDate[0]?.content}, <br />` + specificForEmpContent
      }
      setSpecificChangeForEmployee({...specificChangeForEmployee,  content: specificForEmpContent})
      setSummerizeContent('');
    }
  }, [conversationScriptData])

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (parentContext !== null && empAlias !== '') {
      dispatch(fetchConversationScriptData(parentContext, pageName, empAlias));
    }
  }, [parentContext, empAlias]);

  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [containerRef.current]);

  function checkBoxOnChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: string) {
    if (!isChecked) {
      setEnableCheckbox(true)
    } else {
      setEnableCheckbox(false)
    }
  }

  const commonErrorMessage: IMessageState[] = [
    {
      message: intl.formatMessage(
        messages.saveAndCloseErrorMessage
      ),
      level: {
        type: "flyout",
        componentCode: "someComponent",
        messageCode: "someMessageCode",
      },
    },
  ];
 
  const keyMessagesRef = React.useCallback((node) => {
    if (node !== null)
      node.innerHTML = keyMessages?.content ? keyMessages?.content : null;
  }, [keyMessages?.content]);

  const usefulResourcesRef = React.useCallback((node) => {
    if (node !== null)
      node.innerHTML = usefulResources?.content ? usefulResources?.content : null;
  }, [usefulResources?.content]);

  const specifichangeForEmployeeRef = React.useCallback((node) => {
    if (node !== null)
      node.innerHTML = specificChangeForEmployee?.content ? specificChangeForEmployee?.content : null;
  }, [specificChangeForEmployee?.content]);

  const closingContextRef = React.useCallback((node) => {
    if (node !== null)
      node.innerHTML = closingContext?.content ? closingContext?.content : null;
  }, [closingContext?.content])

  const segmentContextRef = React.useCallback((node) => {
    if (node !== null)
      node.innerHTML = segmentContext?.content ? segmentContext?.content : null;
  }, [segmentContext?.content]);
  const openingSectionRef = React.useCallback((node) => {
    if (node !== null)
      node.innerHTML = openingSection?.content ? openingSection?.content : null;
  }, [openingSection?.content]);
  const openingHeaderContextRef = React.useCallback((node) => {
    if (node !== null)
      node.innerHTML = openingHeaderContext?.content ? openingHeaderContext?.content : null;
  }, [openingHeaderContext?.content]);

  const taxonomyContextRef = React.useCallback((node) => {
    if (node !== null)
      node.innerHTML = taxonomyContext?.content ? taxonomyContext?.content : null;
  }, [taxonomyContext?.content]);

  const saveAndClose: any = async () => {
    let uriPage: string = "";
    try {
      switch (pageName) {
        case receiveConversationPage:
          uriPage = "receive";
          break;
        case sendConversationPage:
          uriPage = "sendstay";
          break;
        default:
          break;
      }
      const url = `/v1/conversation/${uriPage}/complete`;
      setSaveLoadingFlag(true);
      const response = await postAPI(url, [saveParamInfo], parentContext);
      if (response && response.status == 200 && response.data) {
        setSaveLoadingFlag(false);
        if (response.data) {
          toast.success(
            intl.formatMessage(
              messages.saveAndCloseConversationSuccessMessage
            )
          );
          toggleHide();
          singleConversationSaveCancelEvent(true);
        } else if (response.data === false) {
          setShowSaveErrorFlag(true);
        }
      } else {
        //TODO Show MEssage bar
        setShowSaveErrorFlag(true);
        setSaveLoadingFlag(false);
      }
    } catch (err) {
      logException(
        parentContext,
        `/v1/conversation/${uriPage}/complete`,
        err
      );
      setShowSaveErrorFlag(true);
      setSaveLoadingFlag(false);
    }
  };
  //Summarize button click event
  const dialogRef = useRef(null);
  const handleSummarizeClick = async () => {
    try {
      if (summerizeContent === "") {
        const content = dialogRef.current.innerText;
        const url = `/v1/common/summarize`;
        setSaveLoadingFlag(true);
        const response = await postAPI(url, content, parentContext);
        if (response && response.status == 200 && response.data) {
          //show an para with the summarized content
          setSummerizeContent(response.data);
        } else {
          setSummerizeContent("Opps something went wrong!");
        }
      }     
    } catch (err) {
      logException(parentContext, `/v1/common/summarize`, err);
    } finally {
      setSaveLoadingFlag(false);
    }
  }
    const shimmerHeight = 30
    const [summerizeContent, setSummerizeContent] = useState<string>('');
    const points = summerizeContent.split('-').map(point => point.trim()).filter(Boolean);

    return (
      <FluentProvider
        theme={
          parentContext?.getTheme()?.name === "dark"
            ? webDarkTheme
            : webLightTheme
        }
      >
        <Dialog open={hideDialog}>
          <DialogSurface
            style={{ minWidth: "95%" }}
            className={classes.modalSerfaceContainer}
          >
            <DialogBody>
              <DialogTitle
                action={ 
                  <DialogTrigger
                    action="close"
                  >
                    <Button
                      appearance="subtle"
                      icon={<Dismiss24Regular />}
                      onClick={toggleHide} 
                      aria-label={scriptTitle + ' ' + intl.formatMessage(messages.closingContext)}
                      

                    />
                  </DialogTrigger>
                }
              >
                <div className={classes.modalHeaderContainer}>
                  <div className={classes.headerLeftTextStyling}>
                    <Shimmer
                      // aria-label={
                      //   isLoading
                      //     ? intl.formatMessage(messages.conversationLoading)
                      //     : intl.formatMessage(messages.conversationLoaded)
                      // }
                      isDataLoaded={!isLoading}
                      width={250}
                      shimmerElements={[
                        {
                          type: ShimmerElementType.line,
                          height: shimmerHeight,
                        },
                      ]}
                    />
                    {!isLoading && <h1 aria-details={scriptTitle}>{scriptTitle}</h1>}
                  </div>
                  <div>
                    <Shimmer
                      isDataLoaded={!isLoading}
                      width={250}
                      shimmerElements={[
                        {
                          type: ShimmerElementType.circle,
                          height: shimmerHeight,
                        },
                        { type: ShimmerElementType.gap, width: "1%" },
                        {
                          type: ShimmerElementType.line,
                          height: shimmerHeight,
                        },
                      ]}
                    />
                    {!isLoading && (
                      <>
                        <div className={classes.employeeProfileName}>
                          {" "}
                          {empName}
                        </div>
                        <div className={classes.employeeProfileEmail}>
                          {" "}
                          {`${empAlias?.toLowerCase()}${"@microsoft.com"}`}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </DialogTitle>
              <DialogContent
                className={classes.modelBodyBorder}
                ref={dialogRef}
              >
                {showSaveErrorFlag ? (
                  <div>
                    <OseCommonMesssageBar
                      commonMessage={commonErrorMessage}
                      parentContext={parentContext}
                    />
                  </div>
                ) : null}
                {isLoading &&
                  [...Array(13)].map((row, index) => (
                    <div>
                      {" "}
                      <Shimmer
                        isDataLoaded={!isLoading}
                        shimmerElements={[
                          {
                            type: ShimmerElementType.line,
                            height: shimmerHeight,
                          },
                          { type: ShimmerElementType.gap, width: "10%" },
                          {
                            type: ShimmerElementType.line,
                            height: shimmerHeight,
                          },
                          { type: ShimmerElementType.gap, width: "10%" },
                        ]}
                      />{" "}
                      <br />
                    </div>
                  ))}

                {saveLoadingFlag ? (
                  <OseOverlaySpinner parentContext={parentContext} />
                ) : null}

                {/* modal body contain */}
                {!isLoading && (
                  <div
                    className={classes.modelBodyContainer}
                    ref={containerRef}
                  >
                    {/* left side contain */}
                    <div className={classes.gridKeyMessageContainer}>
                      <ConversationGrid gridData={gridData} />
                      {/* left side html content */}
                      {keyMessages.content ? (
                        <div
                          className={`${classes.sectionStyling} ${classes.keyMessageTopSpacing}`}
                        >
                          <h3>
                            {keyMessages.displayValue
                              ? keyMessages.displayValue
                              : intl.formatMessage(messages.keyMessageHeader)}
                          </h3>
                          <div ref={keyMessagesRef}></div>
                        </div>
                      ) : null}

                      {usefulResources.content ? (
                        <div className={classes.sectionStyling}>
                          <h3>
                            {usefulResources.displayValue
                              ? usefulResources.displayValue
                              : intl.formatMessage(messages.usefulResources)}
                          </h3>
                          <div ref={usefulResourcesRef}></div>
                        </div>
                      ) : null}
                    </div>

                    {/* right side contain */}

                    <div className={classes.htmlMessageContainer}>
                      {/* <Accordion
                        className={classes.accodianMargin}
                        onToggle={handleSummarizeClick}
                        collapsible
                      >
                        <AccordionItem value="1">
                          <AccordionHeader>
                            <div>
                              Summary by Copilot
                            </div>
                          </AccordionHeader>
                          <AccordionPanel>
                          <ul>
                            {points.map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>                            
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion> */}
                      {openingHeaderContext?.content ? (
                        <div className={classes.sectionStyling}>
                          <div ref={openingHeaderContextRef}></div>
                        </div>
                      ) : null}

                      {openingSection.content ? (
                        <div className={classes.sectionStyling}>
                          <h3>
                            {openingSection.displayValue
                              ? openingSection.displayValue
                              : intl.formatMessage(messages.opening)} 
                          </h3>
                          <div ref={openingSectionRef}></div>
                        </div>
                      ) : null}

                      {segmentContext.content ? (
                        <div className={classes.sectionStyling}>
                          <h3>
                            {segmentContext.displayValue
                              ? segmentContext.displayValue
                              : intl.formatMessage(
                                  messages.segmentChangeContext
                                )}
                          </h3>
                          <div ref={segmentContextRef}></div>
                        </div>
                      ) : null}

                      {specificChangeForEmployee.content ? (
                        <div className={classes.sectionStyling}>
                          <h3>
                            {specificChangeForEmployee.displayValue
                              ? specificChangeForEmployee.displayValue
                              : intl.formatMessage(
                                  messages.specificChangesForEmployees
                                )}{" "}
                            <span className={classes.extendedContextFont}>
                              {specificChangeContextExtended?.content ? (
                                <i>
                                  ({specificChangeContextExtended?.content})
                                </i>
                              ) : null}
                            </span>
                          </h3>
                          <div ref={specifichangeForEmployeeRef}></div>
                        </div>
                      ) : null}

                      {taxonomyContext.content ? (
                        <div className={classes.sectionStyling}>
                          <h3>
                            {taxonomyContext.displayValue
                              ? taxonomyContext.displayValue
                              : intl.formatMessage(
                                  messages.taxonomyChangeContext
                                )}{" "}
                            <span className={classes.extendedContextFont}>
                              {taxonomyContextExtended?.content ? (
                                <i>({taxonomyContextExtended?.content})</i>
                              ) : null}
                            </span>
                          </h3>
                          <div ref={taxonomyContextRef}></div>
                        </div>
                      ) : null}

                      {closingContext.content ? (
                        <div className={classes.sectionStyling}>
                          <h3>
                            {closingContext.displayValue
                              ? closingContext.displayValue
                              : intl.formatMessage(messages.closingContext)}
                          </h3>
                          <div ref={closingContextRef}></div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </DialogContent>
              <DialogActions fluid={true} className={classes.footer}>
                <Shimmer
                  isDataLoaded={!isLoading}
                  width={860}
                  shimmerElements={[
                    { type: ShimmerElementType.line, height: shimmerHeight },
                  ]}
                />
                {!isLoading && (
                  <>
                    <Checkbox
                      label={intl.formatMessage(
                        messages.saveAndCloseCheckboxMessage,
                        { empName }
                      )}
                      onChange={(ev, data) => setEnableCheckbox(!data.checked)}
                      defaultChecked={!isPendingCoversation}
                      disabled={!(!isPageReadOnly && isPendingCoversation)}
                    />
                    <Button
                      onClick={saveAndClose}
                      disabled={enableCheckbox}
                      appearance="primary"
                    >
                      {intl.formatMessage(messages.saveAndCloseLabel)}
                    </Button>
                    <DialogTrigger disableButtonEnhancement>
                      <Button appearance="secondary" onClick={toggleHide}>
                        Close
                      </Button>
                    </DialogTrigger>
                  </>
                )}
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </FluentProvider>
    );
}

export const SingleConversation = injectIntl(ConversationScriptComponent);