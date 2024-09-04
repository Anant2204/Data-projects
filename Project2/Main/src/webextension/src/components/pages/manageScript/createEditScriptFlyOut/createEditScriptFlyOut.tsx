import React, { useEffect, useState } from "react";
import {
  MessageBarType,
  PanelType,
  TextField,
  Label,
  NormalPeoplePicker,
  IBasePickerSuggestionsProps,
} from "@fluentui/react";
import { SelectTabData, SelectTabEvent, Tab, TabList, TabValue } from "@fluentui/react-components"; 
import { injectIntl } from "react-intl";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import {
  getErrorMessage,
  logException,
  getCurrentTheme,
} from "../../../../utils";
import { ICreateFlayoutPropsAttributes } from "./createEditScriptFlyOut.types";
import { messages } from "./createEditScriptFlyOut.messages";
import {
  OseExpandableMessageBar,
  OseOverlaySpinner,
  Flyout,
  OseCommonMesssageBar,
} from "../../../molecules";
import { getFlyoutStyles } from './createEditScriptFlyOut.styles';
import { IMessageState, IPermission } from '../../../../interfaces';
import { getAPI, postAPI,putAPI } from "../../../../utils/httpUtils";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { toast } from "react-toastify";
import { MctSimpleComboBox } from "../../../molecules/mctSimpleComboBox/mctSimpleComboBox";
import MctRte from "../../../molecules/rte/rte";
import RichTextEditor,{EditorValue} from 'react-rte';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { ManageScriptAuditGrid } from "./manageScriptAuditGrid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchManageScriptAuditHistoryData, fetchManageScriptAuditHistorySuccess, getOrgDetailsData, getTaxonomyDetailsData } from "../../../../store/actions/createConversationScript.action";
import { createTaxonomyChangeContent } from "../../../../constants/componentCodes.constant";
import { saveApproveAPIError } from "../../../../constants/messageCodes.constant";
import { ITaxonomyDetailsQualifierInfo } from "../../../../interfaces/ApiResponseModel/ICreateConversationScript";

const CreateEditScriptFlyoutComponent: React.FC<ICreateFlayoutPropsAttributes> = ({
  openFlyOut,
  handleOnDismiss,
  parentContext,
  intl,
  taxonomyChangeContentInfo,
  taxonomyChangeContextCompletedEvent,
  isApproveAccess,
}) => {
  
  const suggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: intl.formatMessage(messages.suggestionsHeaderText),
    mostRecentlyUsedHeaderText: intl.formatMessage(messages.mostRecentlyUsedHeaderText),
    noResultsFoundText: intl.formatMessage(messages.noResultsFoundText),
    loadingText: intl.formatMessage(messages.loadingText),
    showRemoveButtons: true,
    suggestionsAvailableAlertText: intl.formatMessage(messages.suggestionsAvailableAlertText),
    suggestionsContainerAriaLabel: intl.formatMessage(messages.suggestionsContainerAriaLabel),
  };
  
  const [addPanelError, setaddPanelError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  let classes: any;

  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getFlyoutStyles(theme);
  classes = getClassNames(styles);
  const [saveLoadingFlag, setSaveLoadingFlag] = useState(false);
  
  const [conversationScriptTitle, setConversationScriptTitle] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState<string>(null);

  
  // Setters for CY 
  const [cyOrgData, setCyOrgData] = React.useState([]);
  const [cyRoleSummaryData, setCyRoleSummaryData] = React.useState([]);
  const [cyQ1Data, setCyQ1Data] = React.useState([]);
  const [cyQ2Data, setCyQ2Data] = React.useState([]);

  // Setters for FY 
  const [fyOrgData, setFyOrgData] = React.useState([]);
  const [fyRoleSummaryData, setFyRoleSummaryData] = React.useState([]);
  const [fyQ1Data, setFyQ1Data] = React.useState([]);
  const [fyQ2Data, setFyQ2Data] = React.useState([]);

  const [cyIncentivePlanData, setCyIncentivePlanData] = React.useState([]);
  const [fyIncentivePlanData, setFyIncentivePlanData] = React.useState([]);

  const [specificContextOptionalValue, setSpecificContextOptionalValue] = useState<EditorValue>(RichTextEditor.createEmptyValue());

  const [q1q2ComboWidth, setQ1Q2ComboWidth] = useState('288px');
  const picker = React.useRef(null);

  const [selectedValue, setSelectedValue] = React.useState<TabValue>('EditContentTab');
  const [isEdit, setIsEdit] = useState(false);
  const [roleSummaryWidth, setRolesummaryWidth] = useState('590px');
   
  const [isCyOrgSelected , setIsCyOrgSelected] = useState(false);
  const [isCyRoleSummarySelected , setIsCyRoleSummarySelected] = useState(false);
  const [isCyQ1Selected , setIsCyQ1Selected] = useState(false);

  const [isFyOrgSelected , setIsFyOrgSelected] = useState(false);
  const [isFyRoleSummarySelected , setIsFyRoleSummarySelected] = useState(false);
  const [isFyQ1Selected , setIsFyQ1Selected] = useState(false);
  
  const [status,setStatus] = useState('');

  const isLoading = useAppSelector(
    (state) => state?.createConversationSriptReducer?.isLoading
  );
  const isTaxonomyChangeContentDataLoading = useAppSelector(
    (state) => state?.createConversationSriptReducer?.isTaxonomyChangeContentDataLoading
  );

  const cyOrgDetailsData = useAppSelector(
    (state) => state?.createConversationSriptReducer?.cyOrgDetailsData
  );

  const fyOrgDetailsData = useAppSelector(
    (state) => state?.createConversationSriptReducer?.fyOrgDetailsData
  );

  const cyRoleSummaryQ1Q2Data = useAppSelector(
    (state) => state?.createConversationSriptReducer?.cyRoleSummaryQ1Q2Data
  );

  const fyRoleSummaryQ1Q2Data = useAppSelector(
    (state) => state?.createConversationSriptReducer?.fyRoleSummaryQ1Q2Data
  );
  const auditHistory: any = useAppSelector(
    (state) => state?.createConversationSriptReducer?.manageScriptAuditHistoryData
  );
  const iconProps = { iconName: 'Edit' };
 
  const saveAndClose: any = async (values,{ setSubmitting }) => {
    try {
      const url = `/v1/taxonomyScriptContent/Upsert`;
      const postData = {
        id: taxonomyChangeContentInfo?.id ? taxonomyChangeContentInfo.id : 0,
        cyOrg: values.cyOrg,
        cyRoleSummary: values.cyRoleSummary,
        cyQ1: values.cyQ1,
        cyQ2: values.cyQ2,
        fyOrg: values.fyOrg,
        fyRoleSummary: values.fyRoleSummary,
        fyQ1: values.fyQ1,
        fyQ2: values.fyQ2,
        cyIncentivePlan: values.cyIncentivePlan,
        fyIncentivePlan: values.fyIncentivePlan,
        title: values.scriptTitle,
        exclusion: values.peoplePicker?.map((item) => item.key),
        scriptContent: values.taxonomyChangeContent?.toString("html").trim(),
      };

      setSaveLoadingFlag(true);
      const response = await postAPI(url, postData, parentContext);
      if (response && response.status == 200 && response.data) {
        setSaveLoadingFlag(false);
        handleOnDismiss();
        if (response.data) {
          toast.success(
            intl.formatMessage(messages.taxonomyContentUpdateSuccess)
          );
          closeDialogHanlder();
          taxonomyChangeContextCompletedEvent(true);
        }
      } else {
        setShowErrorMessage(getErrorMessage(response));
        setSaveLoadingFlag(false);
      }
    } catch (err) {
      logException(parentContext, `/v1/taxonomyScriptContent/Upsert`, err);
      setShowErrorMessage(getErrorMessage(err));
      setSaveLoadingFlag(false);
    } finally {
      setSubmitting(false);
    }
  };

  const approve: any = async () => {
    try {
      const url = `/v1/taxonomyScriptContent/${taxonomyChangeContentInfo?.id}/approve`;
      const putData = {}

      setSaveLoadingFlag(true);
      const response = await putAPI(url, putData, parentContext);
      if (response && response.status == 200 && response.data) {
        setSaveLoadingFlag(false);
        handleOnDismiss();
        if (response.data) {
          toast.success(intl.formatMessage(messages.taxonomyCorrectionUpdateSuccess));
          closeDialogHanlder();
          taxonomyChangeContextCompletedEvent(true);
        }
      }
      else {
        setShowErrorMessage(getErrorMessage(response));
        setSaveLoadingFlag(false);
      }
    } catch (err) {
      logException(parentContext, `/v1/taxonomyScriptContent/${taxonomyChangeContentInfo?.id}/approve`, err);
      setShowErrorMessage(getErrorMessage(err));
      setSaveLoadingFlag(false);
    }
  };


  const commonErrorMessage: IMessageState[] = [
    {
      message: showErrorMessage,
      level: {
        type: "flyout",
        componentCode: createTaxonomyChangeContent,
        messageCode: saveApproveAPIError,
      },
    },
  ];

  const closeDialogHanlder = () => {
    setShowErrorMessage(null);
    setConversationScriptTitle('');
    handleOnDismiss();
    setCyOrgData([]);
    setFyOrgData([]);
    setCyRoleSummaryData([]);
    setIsUserEditedTitle(false);
    dispatch(fetchManageScriptAuditHistorySuccess([])); 
    taxonomyChangeContextCompletedEvent(false);

  }

  const getKeyValue = (rowData: any): { key: string; text: string }[] => {
    const arr: { key: string; text: string }[] = [];
    for (const key of rowData) {
      const obj = {
        key: key,
        text: key,
      };
      arr.push(obj);
    }

    return arr;
  };

  useEffect(()=>{
    if(Object.keys(taxonomyChangeContentInfo).length>0 && selectedValue === 'AuditHistoryTab'){
      dispatch(fetchManageScriptAuditHistoryData(parentContext, taxonomyChangeContentInfo?.id));
    }
  },[parentContext,selectedValue])

  const onTaxonomyChangeContent = (value: EditorValue)=>{
    let aval = document.querySelector('[aria-label="Edit text"]')
    aval?.setAttribute('aria-label','Taxonomy Change Content Required') 
    setSpecificContextOptionalValue(value)

    let isValueChanged = null;
    // This defaultValueForTaxonomyChangeContent is used to check the default value of the RTE which is '<p><br></p>'
    const defaultValueForTaxonomyChangeContent = '<p><br></p>';
    if(isEdit){
      isValueChanged = value.toString('html') !== formik.initialValues.taxonomyChangeContent
    }else {
      isValueChanged = value.toString('html') !== defaultValueForTaxonomyChangeContent;
    }
    if (isValueChanged) {
      formik.setFieldValue('taxonomyChangeContent', value.toString('html'));
    }else{
      formik.setFieldValue('taxonomyChangeContent', formik.initialValues.taxonomyChangeContent);
    }
  }
  
   // Tab related code 
   const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const getUniqueData = (data) => {
    const uniqueData = new Set();

    data?.forEach(item => {
      uniqueData.add(item);
    });
    const uniqueDataArray = [...uniqueData];
    return getKeyValue(uniqueDataArray);
  }

  // Code for dropdown 
  // This useEffect is used to trigger to get the orgDetails cy / fy on initial load.
  useEffect(() => {
    if (parentContext) {
      dispatch(getOrgDetailsData(parentContext, 'cy'));
      dispatch(getOrgDetailsData(parentContext, 'fy'));
    }
  }, [parentContext]);

  // This useEffect is used to trigger to get the taxonomy Details ( role summary -q1 - q1) on the create scenario .
  useEffect(() => {
    if (parentContext && Object.keys(taxonomyChangeContentInfo).length === 0) {
      dispatch(getTaxonomyDetailsData(parentContext, 'All', 'cy'));
      dispatch(getTaxonomyDetailsData(parentContext, 'All', 'fy'));
    }
  }, [parentContext]);

  useEffect(() => {
    if (cyOrgDetailsData?.length > 0) {
      setCyOrgData(getUniqueData(cyOrgDetailsData));
    }
  }, [cyOrgDetailsData]);

  useEffect(() => {
    if (fyOrgDetailsData?.length > 0) {
      setFyOrgData(getUniqueData(fyOrgDetailsData));
    }
  }, [fyOrgDetailsData]);

  // Get role summaries based on the CY / FY org 
  const getRoleSummaries = (type:string) => {
    if(type === 'cy')
       return cyRoleSummaryQ1Q2Data?.map(detail => detail.roleSummary);
    else 
      return fyRoleSummaryQ1Q2Data?.map(detail => detail.roleSummary);
  }
  // Get all Q1 based on the Selected Role summary for CY / FY 
  const getQ1sByRoleSummary = (roleSummary:string,type:string) => {
    // Extract Q1s associated with each role summary
    let responseData: ITaxonomyDetailsQualifierInfo[] = null;
    if (type === 'cy') {
      responseData = cyRoleSummaryQ1Q2Data
    } else {
      responseData = fyRoleSummaryQ1Q2Data
    }
    const filteredData = responseData.filter(detail => detail.roleSummary === roleSummary);

    let q1sByRoleSummary = {};
    filteredData.forEach(detail => {
      q1sByRoleSummary[detail.roleSummary] = detail.qualifierAndIncentivePlan.map(q => q.q1);
    });

      // Example: Retrieve Q1s associated with a specific role summary
     // const roleSummary = "Account Management IC";
      const q1sForRoleSummary = q1sByRoleSummary[roleSummary];
      if(type === 'cy'){
        setCyQ1Data(getUniqueData(q1sForRoleSummary));
      }
      else {
        setFyQ1Data(getUniqueData(q1sForRoleSummary));
      }

    // Clear up local variables
    responseData = null;
    filteredData.length = 0;
    q1sByRoleSummary = {};
  }

   // Get all Q2 based on the Selected Q1 and Role summary for CY / FY 
  const getQ2sByQ1AndRoleSummary = (selectedQ1: string, type: string) => {
    const q1 = selectedQ1;
    let responseData: ITaxonomyDetailsQualifierInfo[] = null;
    if (type === 'cy') {
      responseData = cyRoleSummaryQ1Q2Data
    } else {
      responseData = fyRoleSummaryQ1Q2Data
    }
    // Extract Q2s associated with each Q1
    let q2sByQ1AndRoleSummary = {};
    responseData?.forEach(detail => {
      const roleSummary = detail.roleSummary;
      detail.qualifierAndIncentivePlan?.forEach(q => {
        const q1 = q.q1;
        const q2s = q.q2AndIncentivePlan.map(item => item.q2)

        if (!q2sByQ1AndRoleSummary[roleSummary]) {
          q2sByQ1AndRoleSummary[roleSummary] = {};
        }
        q2sByQ1AndRoleSummary[roleSummary][q1] = q2s;
      });
    });

    let q2sForQ1AndRoleSummary = '';
    if (type === 'cy') {
      q2sForQ1AndRoleSummary = q2sByQ1AndRoleSummary[formik.values.cyRoleSummary]?.[q1];
      setCyQ2Data(getUniqueData(q2sForQ1AndRoleSummary));
    }
    else {
      q2sForQ1AndRoleSummary = q2sByQ1AndRoleSummary[formik.values.fyRoleSummary]?.[q1];
      setFyQ2Data(getUniqueData(q2sForQ1AndRoleSummary));
    }
    // Clear up local variables
    responseData = null;
    q2sByQ1AndRoleSummary = {};
  }

    // Get all Q2 based on the Selected Q1 and Role summary for CY / FY 
    const getIncentivePlanByQ2 = (selectedQ2: string, type: string) => {
      let selectedRoleSummary = '';
      let responseData: ITaxonomyDetailsQualifierInfo[] = null;
      if (type === 'cy') {
        responseData = cyRoleSummaryQ1Q2Data
        selectedRoleSummary = formik.values.cyRoleSummary;
      } else {
        responseData = fyRoleSummaryQ1Q2Data 
        selectedRoleSummary = formik.values.fyRoleSummary;
      }
      // Extract incentivePlan associated with each Q2
      let incentivePlan = [];
      responseData?.forEach(detail => {
        if(detail.roleSummary === selectedRoleSummary)
        detail?.qualifierAndIncentivePlan?.forEach(roleInfo => {
          incentivePlan = roleInfo?.q2AndIncentivePlan?.filter(item => item.q2 === selectedQ2)[0]?.incentivePlan
          return;
        });
      });
  
      if (type === 'cy') {
        setCyIncentivePlanData(getUniqueData(incentivePlan));
      }
      else {
        setFyIncentivePlanData(getUniqueData(incentivePlan));
      }
    }

  useEffect(() => {
    if (cyRoleSummaryQ1Q2Data?.length > 0) {
      // Extract all role summaries
      const roleSummaries = getRoleSummaries('cy');
      setCyRoleSummaryData(getUniqueData(roleSummaries));
    }
  }, [cyRoleSummaryQ1Q2Data]);

  useEffect(() => {
    if (fyRoleSummaryQ1Q2Data?.length > 0) {
      // Extract all role summaries
      const roleSummaries = getRoleSummaries('fy');
      setFyRoleSummaryData(getUniqueData(roleSummaries));
    }
  }, [fyRoleSummaryQ1Q2Data]);

  useEffect(() => {
    if(cyRoleSummaryData?.length > 0){
      if(formik.values.cyOrg !== 'All' && isCyOrgSelected){
        formik.setFieldValue('cyRoleSummary', 'All');
        getQ1sByRoleSummary('All','cy');
      }
      else{
        getQ1sByRoleSummary(formik.values.cyRoleSummary,'cy');
      }
    }
  },[cyRoleSummaryData])

  useEffect(() => {
    if(cyQ1Data?.length > 0){
      if((formik.values.cyOrg !== 'All' && isCyOrgSelected) || (isCyRoleSummarySelected && formik.values.cyRoleSummary !== 'All')){
        formik.setFieldValue('cyQ1', 'All');
        getQ2sByQ1AndRoleSummary('All','cy');
      }
      else {
        getQ2sByQ1AndRoleSummary(formik.values.cyQ1,'cy');
      }
    }
    getIncentivePlanByQ2(formik.values.cyQ2 ,'cy');
  },[cyQ1Data])

  useEffect(() => {
    if(cyQ2Data?.length > 0){
      if ((formik.values.cyOrg !== 'All' && isCyOrgSelected) || (isCyRoleSummarySelected && formik.values.cyRoleSummary !== 'All')
        || (isCyQ1Selected && formik.values.cyQ1 !== 'All')) {
        formik.setFieldValue('cyQ2', 'All');
      }
      setIsCyOrgSelected(false);
      setIsCyRoleSummarySelected(false);
      setIsCyQ1Selected(false);
    }
  },[cyQ2Data])

  // Code for FY
  useEffect(() => {
    if(fyRoleSummaryData?.length > 0){
      if(formik.values.fyOrg !== 'All' && isFyOrgSelected){
        formik.setFieldValue('fyRoleSummary', 'All');
        getQ1sByRoleSummary('All','fy');
      }
      else{
        getQ1sByRoleSummary(formik.values.fyRoleSummary,'fy');
      }
    }
  },[fyRoleSummaryData])

  useEffect(() => {
    if(fyQ1Data?.length > 0){
      if((formik.values.fyOrg !== 'All' && isFyOrgSelected) || (isFyRoleSummarySelected && formik.values.fyRoleSummary !== 'All')){
       formik.setFieldValue('fyQ1', 'All');
        getQ2sByQ1AndRoleSummary('All','fy');
      }
      else {
        getQ2sByQ1AndRoleSummary(formik.values.fyQ1,'fy');
      }
    }
  },[fyQ1Data])

  useEffect(() => {
    if(fyQ2Data?.length > 0){
      if((formik.values.fyOrg !== 'All' && isFyOrgSelected) || (isFyRoleSummarySelected && formik.values.fyRoleSummary !== 'All')
      || (isFyQ1Selected && formik.values.fyQ1 !== 'All')){
       formik.setFieldValue('fyQ2', 'All');
      }
      setIsFyOrgSelected(false);
      setIsFyRoleSummarySelected(false);
      setIsFyQ1Selected(false);
    }
    getIncentivePlanByQ2(formik.values.fyQ2 ,'fy');
  },[fyQ2Data])

  // On change of the CY Org 
  const selectedCYOrg = (listOfSelected: string[]) => {
    if (listOfSelected?.length > 0) {
      setCyRoleSummaryData([]);
      setCyQ1Data([]);
      setCyQ2Data([]);
      setCyIncentivePlanData([]);
      setFyIncentivePlanData([]);
      setIsCyOrgSelected(true);
      setIsCyRoleSummarySelected(false);
      setIsCyQ1Selected(false);
      formik.setFieldValue('cyOrg', listOfSelected[0]);
      dispatch(getTaxonomyDetailsData(parentContext, listOfSelected[0], 'cy'));
    }
  }
// On change of the CY Role Summary  
  const selectedCYRoleSummary = (listOfSelected: string[]) => {
    if (listOfSelected?.length > 0) {
      getQ1sByRoleSummary(listOfSelected[0],'cy');
      setIsCyRoleSummarySelected(true);
      formik.setFieldValue('cyRoleSummary', listOfSelected[0]);
    }
  }
// On change of the CY Q1  
  const selectedCYQ1 = (listOfSelected: string[]) => {
    if (listOfSelected?.length > 0) {
      getQ2sByQ1AndRoleSummary(listOfSelected[0],'cy');
      setIsCyQ1Selected(true);
      formik.setFieldValue('cyQ1', listOfSelected[0]);
    }
  }

   // On change of the FY Org 
   const selectedFYOrg = (listOfSelected: string[]) => {
    if (listOfSelected?.length > 0) {
      setFyRoleSummaryData([]);
      setFyQ1Data([]);
      setFyQ2Data([]);
      setCyIncentivePlanData([]);
      setFyIncentivePlanData([]);
      setIsFyOrgSelected(true);
      setIsFyRoleSummarySelected(false);
      setIsFyQ1Selected(false);
      formik.setFieldValue('fyOrg', listOfSelected[0]);
      dispatch(getTaxonomyDetailsData(parentContext, listOfSelected[0], 'fy'));
    }
  }
// On change of the FY Role Summary  
  const selectedFYRoleSummary = (listOfSelected: string[]) => {
    if (listOfSelected?.length > 0) {
      getQ1sByRoleSummary(listOfSelected[0],'fy');
      setIsFyRoleSummarySelected(true);
      formik.setFieldValue('fyRoleSummary', listOfSelected[0]);
    }
  }
// On change of the FY Q1  
  const selectedFYQ1 = (listOfSelected: string[]) => {
    if (listOfSelected?.length > 0) {
      getQ2sByQ1AndRoleSummary(listOfSelected[0],'fy');
      setIsFyQ1Selected(true);
      formik.setFieldValue('fyQ1', listOfSelected[0]);
    }
  }

  // On change of the FY Q2  
  const selectedFYQ2 = (listOfSelected: string[], type: string) => {
    if (listOfSelected?.length > 0) {
      getIncentivePlanByQ2(listOfSelected[0],type);
     // setIsFyQ1Selected(true);
    }
  }

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      scriptTitle: Yup.string()
        .required(intl.formatMessage(messages.conversationScriptTitleRequired))
        .max(500, intl.formatMessage(messages.maxCharacter))
        .test('isEmpty', intl.formatMessage(messages.conversationScriptTitleEmpty), function (value) {
          return !!value?.trim();
        }),
      taxonomyChangeContent: Yup.string().required(intl.formatMessage(messages.taxonomyChangeContentRequired))
      .test('isEmpty', intl.formatMessage(messages.taxonomyChangeContentEmpty), function (value) {
        if(value === '<p><br></p>')
          return false;
        else
          return !!value?.trim();
      })
    }),
	    
    initialValues: {
      scriptTitle: '',
      taxonomyChangeContent:'',
      cyOrg: 'All',
      cyRoleSummary: 'All',
      cyQ1: 'All',
      cyQ2: 'All',
      cyIncentivePlan: 'All', 
      fyIncentivePlan: 'All', 
      fyOrg: 'All',
      fyRoleSummary: 'All',
      fyQ1: 'All',
      fyQ2: 'All',
      peoplePicker: [
        {key:"",
        secondaryText:"",
        text:""}
      ],
    },
    onSubmit: (values, { setSubmitting }) => {
      saveAndClose(values,{ setSubmitting });
    },
  });


  useEffect(() => {
    // Here as per userstory we want to stop generating title in case of edit
    if(isUserEditedTitle === false && Object.keys(taxonomyChangeContentInfo)?.length === 0)
      generateTitle();
  },[formik.values]);
  // Code to generate the title 
  const  generateTitle = () => {
    let title = "";
    const cyOrg = formik.values.cyOrg === '' ? 'All' : formik.values.cyOrg;
    const fyOrg = formik.values.fyOrg === '' ? 'All' : formik.values.fyOrg;
    const cyRoleSummary = formik.values.cyRoleSummary === '' ? 'All' : formik.values.cyRoleSummary;
    const fyRoleSummary = formik.values.fyRoleSummary === '' ? 'All' : formik.values.fyRoleSummary;
    const cyQ1 = formik.values.cyQ1 === '' ? 'All' : formik.values.cyQ1;
    const fyQ1 = formik.values.fyQ1 === '' ? 'All' : formik.values.fyQ1;
    const cyQ2 = formik.values.cyQ2 === '' ? 'All' : formik.values.cyQ2;
    const fyQ2 = formik.values.fyQ2 === '' ? 'All' : formik.values.fyQ2;
    const cyIncentivePlan = formik.values.cyIncentivePlan === '' ? 'All' : formik.values.cyIncentivePlan;
    const fyIncentivePlan = formik.values.fyIncentivePlan === '' ? 'All' : formik.values.fyIncentivePlan;
    if (cyOrg === "All" && fyOrg === "All") {
      title = "";
    } else if (cyOrg === "All" && fyOrg !== "All") {
      title = fyOrg;
    } else if (cyOrg !== "All" && fyOrg === "All") {
      title = cyOrg;
    } else {
      if (cyOrg !== fyOrg) {
        title = `${cyOrg} To ${fyOrg}`;
      } else {
        title = cyOrg;
      }
    }

    if (cyRoleSummary === "All" && fyRoleSummary === "All") {
      // Title remains unchanged
      title = title;
    } else if (cyRoleSummary === "All" && fyRoleSummary !== "All") {
      title += ` | ${fyRoleSummary}`;
    } else if (cyRoleSummary !== "All" && fyRoleSummary === "All") {
      title += ` | ${cyRoleSummary}`;
    } else {
      if (cyRoleSummary !== fyRoleSummary) {
        title += ` | ${cyRoleSummary} To ${fyRoleSummary}`;
      } else {
        title += ` | ${cyRoleSummary}`;
      }
    }

    if (cyOrg === fyOrg && cyRoleSummary === fyRoleSummary) {
      if (cyQ1 === "All" && fyQ1 === "All") {
        // Title remains unchanged
        title = title;
      } else if (cyQ1 === "All" && fyQ1 !== "All") {
        title += ` | ${fyQ1}`;
      } else if (cyQ1 !== "All" && fyQ1 === "All") {
        title += ` | ${cyQ1}`;
      } else {
        if (cyQ1 !== fyQ1) {
          title += ` | ${cyQ1} To ${fyQ1}`;
        } else {
          title += ` | ${cyQ1}`;
        }
      }

      if (cyQ2 === "All" && fyQ2 === "All") {
        // Title remains unchanged
        title = title;
      } else if (cyQ2 === "All" && fyQ2 !== "All") {
        title += ` | ${fyQ2}`;
      } else if (cyQ2 !== "All" && fyQ2 === "All") {
        title += ` | ${cyQ2}`;
      } else {
        if (cyQ2 !== fyQ2) {
          title += ` | ${cyQ2} To ${fyQ2}`;
        } else {
          title += ` | ${cyQ2}`;
        }
      }

      if (cyIncentivePlan === "All" && fyIncentivePlan === "All") {
        // Title remains unchanged
        title = title;
      } else if (cyIncentivePlan === "All" && fyIncentivePlan !== "All") {
        title += ` | ${fyIncentivePlan}`;
      } else if (cyIncentivePlan !== "All" && fyIncentivePlan === "All") {
        title += ` | ${cyIncentivePlan}`;
      } else {
        if (cyIncentivePlan !== fyIncentivePlan) {
          title += ` | ${cyIncentivePlan} To ${fyIncentivePlan}`;
        } else {
          title += ` | ${cyIncentivePlan}`;
        }
      }
    }

    if (title.startsWith(' |')) {
      title = title.substring(2).trim(); // Remove leading space and pipe
    }
    setConversationScriptTitle(title.trim());
    formik.setFieldValue('scriptTitle', title, true); // Update Formik's state
    return title.trim(); // Trim to remove any leading/trailing spaces
  }

  useEffect(() => {
    if(Object.keys(taxonomyChangeContentInfo).length !== 0){

      setStatus(taxonomyChangeContentInfo.status);

      setConversationScriptTitle(taxonomyChangeContentInfo.scriptTitle);

      const scriptContent = RichTextEditor.createValueFromString(taxonomyChangeContentInfo.scriptContent, 'html');
      setSpecificContextOptionalValue( scriptContent);

      const exclusions:any = taxonomyChangeContentInfo?.exclusions;
      const personas = exclusions?.map(person => ({ text: person.fullName, key: person.alias }));

      formik.setValues({
        peoplePicker: personas,
        scriptTitle: taxonomyChangeContentInfo.scriptTitle,
        taxonomyChangeContent: scriptContent.toString('html'),
        cyOrg: taxonomyChangeContentInfo.cyOrg,
        cyRoleSummary: taxonomyChangeContentInfo.cyRoleSummary,
        cyQ1: taxonomyChangeContentInfo.cyQ1,
        cyQ2: taxonomyChangeContentInfo.cyQ2,
        fyOrg: taxonomyChangeContentInfo.fyOrg,
        fyRoleSummary: taxonomyChangeContentInfo.fyRoleSummary,
        fyQ1: taxonomyChangeContentInfo.fyQ1,
        fyQ2: taxonomyChangeContentInfo.fyQ2,
        cyIncentivePlan: taxonomyChangeContentInfo.cyIncentivePlan,
        fyIncentivePlan: taxonomyChangeContentInfo.fyIncentivePlan, 
      });
      
      setIsEdit(true);
      dispatch(getTaxonomyDetailsData(parentContext, taxonomyChangeContentInfo.cyOrg, 'cy'));
      dispatch(getTaxonomyDetailsData(parentContext, taxonomyChangeContentInfo.fyOrg, 'fy'));
    }
  },[taxonomyChangeContentInfo])

 
  // People Picker 
  
  function getTextFromItem(persona: IPersonaProps): string {
    return persona.text as string;
  }

  const handlePickerChange = (items: IPersonaProps[]) => {
    formik.setFieldValue('peoplePicker', items);
  };

  const fetchExclusion: any = async (parentContext, searchString: string) => {
    try {
      const url = `/v1/taxonomyScriptContent/exclusion?searchString=${searchString}`;
      const response = await getAPI(url, parentContext);
      if (response && response.status == 200 && response.data) {
        setShowErrorMessage(null);
        return response.data;
      }
      else {
        setShowErrorMessage(getErrorMessage(response));
      }
    } catch (err) {
      logException(parentContext, `/v1/taxonomyScriptContent/exclusion?searchString=${searchString}`, err);
      setShowErrorMessage(getErrorMessage(err));
    }
  }

  
  const loadSuggestions = async (text: string): Promise<IPersonaProps[]> => {
    if (text === '' || text.length < 3)
      return [];
    try {
      const data = await fetchExclusion(parentContext, text);
      const personas: IPersonaProps[] = data
        //.filter(person => person.ic !== updatedManagerInfo.alias) // Filter out persons with matching alias
        .map(person => ({
          text: person.fullName,
          secondaryText: person.ic,
          key: person.ic,
        }));
      return personas; 
    } catch (error) {
      logException(parentContext, `/v1/taxonomyScriptContent/exclusion?searchString=${text}`, error);
    }
  };
  
  const handleScriptTitleChange = (event) => {
    if(conversationScriptTitle !== event.target.value)
      setIsUserEditedTitle(true);
    else
      setIsUserEditedTitle(false);

    setConversationScriptTitle(event.target.value);

    const isValueChanged = event.target.value !== formik.initialValues.scriptTitle;
    if (isValueChanged) {
      formik.setFieldValue('scriptTitle', event.target.value); 
    }else{
      formik.setFieldValue('scriptTitle', formik.initialValues.scriptTitle);
    }
   
  };
  const [isUserEditedTitle, setIsUserEditedTitle] = useState(false);
  const handleBlur = (event) => {
    formik.handleBlur(event);
  }

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = document.getElementById('roleSummary')?.offsetWidth;
     setRolesummaryWidth(`${containerWidth}px`);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Call handleResize initially to set the initial width
    handleResize();

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

   useEffect(() => {
    let resizeTimer;
  
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const flyoutElement = document.getElementById("flyoutContent");
        if (flyoutElement) {
          const flyoutWidth = flyoutElement.offsetWidth;
          const newComboBoxWidth = `${flyoutWidth}px`; 
          const q1q2 = flyoutWidth / 2;
          let newQ1Q2ComboBoxWidth = `${q1q2 - 10}px`; 
          if (flyoutWidth >= 490) {
            newQ1Q2ComboBoxWidth = `${flyoutWidth / 2 - 10}px`; 
          } else {
            newQ1Q2ComboBoxWidth = newComboBoxWidth;
          }
          
          setQ1Q2ComboWidth(newQ1Q2ComboBoxWidth);
        }
      }, 0); // Adjust the delay as needed
    };
  
    // Listen for window resize event
    window.addEventListener("resize", handleResize);
  
    // Call handleResize once initially to set the initial width
    handleResize();
  
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [openFlyOut]); // Re-run effect when openFlyOut changes
  
  // This useEffect is used to reset the form values when the taxonomyChangeContentInfo is empty / All in case of Create 
  useEffect(() => {
    if(Object.keys(taxonomyChangeContentInfo)?.length === 0){
      formik.initialValues.scriptTitle = '';
      formik.initialValues.taxonomyChangeContent = '';
      formik.initialValues.cyOrg = 'All';
      formik.initialValues.cyRoleSummary = 'All';
      formik.initialValues.cyQ1 = 'All';
      formik.initialValues.cyQ2 = 'All';
      formik.initialValues.fyOrg = 'All';
      formik.initialValues.fyRoleSummary = 'All';
      formik.initialValues.fyQ1 = 'All';
      formik.initialValues.fyQ2 = 'All';
      formik.initialValues.cyIncentivePlan = 'All';
      formik.initialValues.fyIncentivePlan = 'All';
    }
  },[taxonomyChangeContentInfo])
  return (
    <Flyout
      isOpen={openFlyOut}
      onDismiss={closeDialogHanlder}
      onCancel={closeDialogHanlder}
      title={intl.formatMessage(messages.viewEditScenarioTitle)}
      isSaveDisabled={
        !formik.dirty ||
        !formik.isValid ||
        formik.isSubmitting ||
        selectedValue === "AuditHistoryTab"
      }
      handleSubmit={formik.handleSubmit}
      saveButtonText={intl.formatMessage(messages.saveBtnLabel)}
      parentContext={parentContext}
      panelSize={PanelType.medium}
      isResetVisible={isApproveAccess && isEdit === true}
      onReset={() => {
        approve();
      }}
      resetButtonText={intl.formatMessage(messages.approveBtnLabel)}
      isResetDisabled={
        formik.isSubmitting ||
        selectedValue === "AuditHistoryTab" ||
        status === "Approved"
      }
    >
      {isTaxonomyChangeContentDataLoading && (
        <OseOverlaySpinner
          parentContext={parentContext}
          loaddingMessage={intl.formatMessage(messages.loading)}
        />
      )}
      {addPanelError && (
        <OseExpandableMessageBar
          messageBarType={MessageBarType.error}
          onDismiss={() => setaddPanelError(null)}
        >
          {addPanelError}
        </OseExpandableMessageBar>
      )}
      {showErrorMessage ? (
        <div>
          <OseCommonMesssageBar
            commonMessage={commonErrorMessage}
            parentContext={parentContext}
          />
        </div>
      ) : null}
      {(isLoading || saveLoadingFlag) && (
        <OseOverlaySpinner parentContext={parentContext} />
      )}
      {isEdit && (
        <div>
          <TabList
            className={classes.tabRoot}
            selectedValue={selectedValue}
            onTabSelect={onTabSelect}
          >
            <Tab
              style={{
                borderBottom:
                  selectedValue === "EditContentTab"
                    ? `2px solid ${theme.palette.themePrimary}`
                    : "",
              }}
              className={
                selectedValue === "EditContentTab"
                  ? classes.tabSelected
                  : classes.tabDefault
              }
              value="EditContentTab"
            >
              {intl.formatMessage(messages.editContentTab)}
            </Tab>
            <Tab
              style={{
                borderBottom:
                  selectedValue === "AuditHistoryTab"
                    ? "2px solid" + theme.palette.themePrimary
                    : "",
              }}
              className={
                selectedValue === "AuditHistoryTab"
                  ? classes.tabSelected
                  : classes.tabDefault
              }
              value="AuditHistoryTab"
            >
              {intl.formatMessage(messages.auditHistoryTab)}
            </Tab>
          </TabList>
        </div>
      )}
      {selectedValue === "EditContentTab" && (
        <div id="flyoutContent">
          <div className={classes.container}>
            <div>
              <Label htmlFor="cyOrg">
                {intl.formatMessage(messages.cyOrg)}
              </Label>
              <MctSimpleComboBox
                options={cyOrgData}
                theme={theme.name}
                placeholder={intl.formatMessage(messages.comboPlaceHolder)}
                onSelectOptions={(listOfSelected: string[]) =>
                  selectedCYOrg(listOfSelected)
                }
                comboId="cyOrg"
                comboWidth={q1q2ComboWidth}
                defaultSelectedOption={
                  formik.values.cyOrg === "" ? ["All"] : [formik.values.cyOrg]
                }
                name={"cyOrg"}
                selectedKey={formik.values.cyOrg}
                onBlur={() => formik.setFieldTouched("cyOrg")}
              />
            </div>
            <div>
              <Label htmlFor="fyOrg">
                {intl.formatMessage(messages.fyOrg)}
              </Label>
              <MctSimpleComboBox
                options={fyOrgData}
                theme={theme.name}
                placeholder={intl.formatMessage(messages.comboPlaceHolder)}
                onSelectOptions={(listOfSelected: string[]) =>
                  selectedFYOrg(listOfSelected)
                }
                comboId="fyOrg"
                comboWidth={q1q2ComboWidth}
                defaultSelectedOption={
                  formik.values.fyOrg === "" ? ["All"] : [formik.values.fyOrg]
                }
                name={"fyOrg"}
                selectedKey={formik.values.fyOrg}
                onBlur={() => formik.setFieldTouched("fyOrg")}
              />
            </div>
            </div>
            <div className={classes.container}>
            <div>
              <Label htmlFor="cyRoleSummary">
                {intl.formatMessage(messages.cyRoleSummary)}
              </Label>
              <MctSimpleComboBox
                options={cyRoleSummaryData}
                theme={theme.name}
                placeholder={intl.formatMessage(messages.comboPlaceHolder)}
                onSelectOptions={(listOfSelected: string[]) =>
                  selectedCYRoleSummary(listOfSelected)
                }
                comboId="cyRoleSummary"
                comboWidth={q1q2ComboWidth}
                defaultSelectedOption={
                  formik.values.cyRoleSummary === ""
                    ? ["All"]
                    : [formik.values.cyRoleSummary]
                }
                name={"cyRoleSummary"}
                selectedKey={formik.values.cyRoleSummary}
                onBlur={() => formik.setFieldTouched("cyRoleSummary")}
              />
            </div>
            <div>
              <Label htmlFor="fyRoleSummary">
                {intl.formatMessage(messages.fyRoleSummary)}
              </Label>
              <MctSimpleComboBox
                options={fyRoleSummaryData}
                theme={theme.name}
                placeholder={intl.formatMessage(messages.comboPlaceHolder)}
                onSelectOptions={(listOfSelected: string[]) =>
                  selectedFYRoleSummary(listOfSelected)
                }
                comboId="fyRoleSummary"
                comboWidth={q1q2ComboWidth}
                defaultSelectedOption={
                  formik.values.fyRoleSummary === ""
                    ? ["All"]
                    : [formik.values.fyRoleSummary]
                }
                name={"fyRoleSummary"}
                selectedKey={formik.values.fyRoleSummary}
                onBlur={() => formik.setFieldTouched("fyRoleSummary")}
              />
            </div>
          </div>
          <div className={classes.container}>
            <div>
              <Label htmlFor="cyQ1Combo">
                {intl.formatMessage(messages.cyQ1)}
              </Label>
              <MctSimpleComboBox
                options={cyQ1Data}
                theme={theme.name}
                placeholder={intl.formatMessage(messages.comboPlaceHolder)}
                onSelectOptions={(listOfSelected: string[]) =>
                  selectedCYQ1(listOfSelected)
                }
                comboId="cyQ1Combo"
                comboWidth={q1q2ComboWidth}
                defaultSelectedOption={
                  formik.values.cyQ1 === "" ? ["All"] : [formik.values.cyQ1]
                }
                name={"cyQ1"}
                selectedKey={formik.values.cyQ1}
                onBlur={() => formik.setFieldTouched("cyQ1")}
              />
            </div>
            <div>
              <Label htmlFor="fyQ1">{intl.formatMessage(messages.fyQ1)}</Label>
              <MctSimpleComboBox
                options={fyQ1Data}
                theme={theme.name}
                placeholder={intl.formatMessage(messages.comboPlaceHolder)}
                onSelectOptions={(listOfSelected: string[]) =>
                  selectedFYQ1(listOfSelected)
                }
                comboId="fyQ1"
                comboWidth={q1q2ComboWidth}
                defaultSelectedOption={
                  formik.values.fyQ1 === "" ? ["All"] : [formik.values.fyQ1]
                }
                name={"fyQ1"}
                selectedKey={formik.values.fyQ1}
                onBlur={() => formik.setFieldTouched("fyQ1")}
              />
            </div>
          </div>
          <div className={classes.container}>
            <div>
              <Label htmlFor="cyQ2">{intl.formatMessage(messages.cyQ2)}</Label>
              <MctSimpleComboBox
                options={cyQ2Data}
                theme={theme.name}
                placeholder={intl.formatMessage(messages.comboPlaceHolder)}
                onSelectOptions={(listOfSelected: string[]) => {
                  formik.setFieldValue("cyQ2", listOfSelected[0]);
                  selectedFYQ2(listOfSelected, 'cy')
                }}
                comboId="cyQ2"
                comboWidth={q1q2ComboWidth}
                defaultSelectedOption={
                  formik.values.cyQ2 === "" ? ["All"] : [formik.values.cyQ2]
                }
                name={"cyQ2"}
                selectedKey={formik.values.cyQ2}
                onBlur={() => formik.setFieldTouched("cyQ2")}
              />
            </div>
            <div>
              <Label htmlFor="fyQ2">{intl.formatMessage(messages.fyQ2)}</Label>
              <MctSimpleComboBox
                options={fyQ2Data}
                theme={theme.name}
                placeholder={intl.formatMessage(messages.comboPlaceHolder)}
                onSelectOptions={(listOfSelected: string[]) => {
                  selectedFYQ2(listOfSelected, 'fy')
                  formik.setFieldValue("fyQ2", listOfSelected[0]);
                }}
                comboId="fyQ2"
                comboWidth={q1q2ComboWidth}
                defaultSelectedOption={
                  formik.values.fyQ2 === "" ? ["All"] : [formik.values.fyQ2]
                }
                name={"fyQ2"}
                selectedKey={formik.values.fyQ2}
                onBlur={() => formik.setFieldTouched("fyQ2")}
              />
            </div>
          </div>
          <div className={classes.container}>
            <div>
              <Label htmlFor="cyIncentivePlan">{intl.formatMessage(messages.cyIncentivePlan)}</Label>
              <MctSimpleComboBox
                options={cyIncentivePlanData}
                theme={theme.name}
                placeholder={intl.formatMessage(messages.comboPlaceHolder)}
                onSelectOptions={(listOfSelected: string[]) => {
                  formik.setFieldValue("cyIncentivePlan", listOfSelected[0]);
                }}
                comboId="cyIncentivePlan"
                comboWidth={q1q2ComboWidth}
                defaultSelectedOption={
                  formik.values.cyIncentivePlan === "" ? ["All"] : [formik.values.cyIncentivePlan]
                }
                name={"cyIncentivePlan"}
                selectedKey={formik.values.fyQ2}
                onBlur={() => formik.setFieldTouched("cyIncentivePlan")}
              />
            </div>
            <div>
              <Label htmlFor="fyIncentivePlan">{intl.formatMessage(messages.fyIncentivePlan)}</Label>
              <MctSimpleComboBox
                options={fyIncentivePlanData}
                theme={theme.name}
                placeholder={intl.formatMessage(messages.comboPlaceHolder)}
                onSelectOptions={(listOfSelected: string[]) => {
                  formik.setFieldValue("fyIncentivePlan", listOfSelected[0]);
                }}
                comboId="fyIncentivePlan"
                comboWidth={q1q2ComboWidth}
                defaultSelectedOption={
                  formik.values.fyIncentivePlan === "" ? ["All"] : [formik.values.fyIncentivePlan]
                }
                name={"fyIncentivePlan"}
                selectedKey={formik.values.fyIncentivePlan}
                onBlur={() => formik.setFieldTouched("fyIncentivePlan")}
              />
            </div>
          </div>
          <div className={classes.scriptContainer}>
            <TextField
              maxLength={100}
              label={intl.formatMessage(messages.conversationScriptTitle)}
              required
              name="scriptTitle"
              value={conversationScriptTitle}
              onChange={handleScriptTitleChange}
              onBlur={() => formik.setFieldTouched("scriptTitle")}
              errorMessage={
                formik.touched.scriptTitle && formik.errors.scriptTitle
                  ? formik.errors.scriptTitle.toString()
                  : ""
              }
              resizable={false}
              placeholder={intl.formatMessage(
                messages.conversationScriptPlaceholder
              )}
              rows={1}
              iconProps={iconProps}
            />
          </div>
          <div className={classes.tileTextBoxStyleing}>
            <Label htmlFor="taxonomyChangeContent" required>
              {intl.formatMessage(messages.taxonomyChangeContent)}
            </Label>
            <MctRte
              parentContext={parentContext}
              onChangeHanlder={onTaxonomyChangeContent}
              value={specificContextOptionalValue}
              name={"taxonomyChangeContent"}
              onBlurHandler={() =>
                formik.setFieldTouched("taxonomyChangeContent")
              }
              errorMessage={
                formik.touched.taxonomyChangeContent &&
                formik.errors.taxonomyChangeContent
                  ? formik.errors.taxonomyChangeContent.toString()
                  : ""
              }
            />
          </div>
          <div className={classes.futureManagerPicker}>
            <Label>{intl.formatMessage(messages.scriptNotApplicableFor)}</Label>
            <NormalPeoplePicker
              aria-label="Script Not Applicable For"
              onResolveSuggestions={(filterText) => loadSuggestions(filterText)}
              getTextFromItem={getTextFromItem}
              pickerSuggestionsProps={suggestionProps}
              selectionAriaLabel={intl.formatMessage(
                messages.selectionAriaLabel
              )}
              removeButtonAriaLabel={intl.formatMessage(
                messages.removeButtonAriaLabel
              )}
              componentRef={picker}
              resolveDelay={300}
              onChange={handlePickerChange}
              defaultSelectedItems={
                formik.values.peoplePicker[0]?.key !== ""
                  ? formik.values.peoplePicker
                  : []
              }
            />
          </div>
        </div>
      )}
      {selectedValue === "AuditHistoryTab" && (
        <div>
          <ManageScriptAuditGrid auditHistory={auditHistory} />
        </div>
      )}
    </Flyout>
  );
}

export const CreateEditScriptFlyOut = injectIntl(CreateEditScriptFlyoutComponent);