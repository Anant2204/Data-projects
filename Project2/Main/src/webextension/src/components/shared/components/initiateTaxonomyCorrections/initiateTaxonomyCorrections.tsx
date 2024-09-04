import React, { useEffect, useRef, useState } from "react";
import {
  MessageBarType,
  PanelType,
  StackItem,
  TextField,
  Separator,
  Label
} from "@fluentui/react";
import { injectIntl } from "react-intl";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import {
  getErrorMessage,
  logException,
  getCurrentTheme,
} from "../../../../utils";
import { ICreateFlayoutPropsAttributes } from "./initiateTaxonomyCorrections.types";
import { messages } from "./initiateTaxonomyCorrections.messages";
import {
  OseExpandableMessageBar,
  OseOverlaySpinner,
  Flyout,
  OseCommonMesssageBar,
} from "../../../molecules";
import { getFlyoutStyles } from './initiateTaxonomyCorrections.styles';
import { IMessageState } from '../../../../interfaces';
import { postAPI } from "../../../../utils/httpUtils";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { toast } from "react-toastify";
import { receiveConversationPage, sendConversationPage } from '../../../../constants/componentCodes.constant';
import { MctSimpleComboBox } from "../../../molecules/mctSimpleComboBox/mctSimpleComboBox";
import { fetchTaxonomyDetails } from "../../../../store/actions/comman.action";
import { useFormik } from "formik";
import * as Yup from 'yup';
const TaxonomyCorrectionsComponent: React.FC<ICreateFlayoutPropsAttributes> = ({
  openFlyOut,
  handleOnDismiss,
  parentContext,
  intl,
  taxonomyCorrectionsInfo,
  initiateTaxonomyCorrectionsSaveCancelEvent,
  pageName,
  disabled,
}) => {
  const [addPanelError, setaddPanelError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  let classes: any;

  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getFlyoutStyles(theme);
  classes = getClassNames(styles);
  const [saveLoadingFlag, setSaveLoadingFlag] = useState(false);
  
  const [comments, setComments] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState<string>(null);

  const [roleSummaryData, setRoleSummaryData] = React.useState([]);
  const [q1Option, setQ1Option] = React.useState([]);
  const [q2Option, setQ2Option] = React.useState([]);

  const [selectedRoleSummaryData, setSelectedRoleSummaryData] = React.useState('');
  const [selectedQ1BasedRoleSummaryData, setSelectedQ1BasedRoleSummaryData] = React.useState('');
  const [selectedQ2BasedRoleSummaryData, setSelectedQ2BasedRoleSummaryData] = React.useState('');

  const [comboWidth, setComboWidth] = useState('590px');
  const [q1q2ComboWidth, setQ1Q2ComboWidth] = useState('288px');
 
  const isLoading = useAppSelector(
    (state) => state?.createConversationSriptReducer?.isLoading
  );

  const taxonomyCorrectionsDetails = useAppSelector(
    (state) => state?.commonReducer?.taxonomyCorrectionsDetails
  );
  const formikEnv = useFormik({
    validationSchema: Yup.object().shape({
     
      roleSummary: Yup.string()
      .required(intl.formatMessage(messages.roleSummaryValidationErrorText))
      .test('isEmpty', 'empty error', function (value) {
        return !!value?.trim();
      }),

      q1Combo: Yup.string()
        .required(intl.formatMessage(messages.q1ValidationErrorText))
        .test('isEmpty', 'empty error', function (value) {
          return !!value?.trim();
        }),

      q2Combo: Yup.string()
        .required(intl.formatMessage(messages.q2ValidationErrorText))
        .test('isEmpty', 'empty error', function (value) {
          return !!value?.trim();
        }),

      }),    
    initialValues: {
      roleSummary: '',
      q1Combo: '',
      q2Combo: ''
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      saveAndClose( values, { setSubmitting, setErrors });   
    },
  });

  const getPage = () => {
    let uriPage: string = "";
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
    return uriPage;
  }
  const saveAndClose: any = async (values, { setSubmitting, setErrors }) => {
    let uriPage: string = getPage();
    try {
      const url = `/v1/taxonomyCorrection/updateTaxonomy`;
      const postData = {
        "icAlias": taxonomyCorrectionsInfo?.alias,
        "roleSummary": values.roleSummary,
        "q1": values.q1Combo,
        "q2": values.q2Combo,
        "comments": comments,
        "requestFrom":uriPage
      }

      setSaveLoadingFlag(true);
      const response = await postAPI(url, postData, parentContext);
      if (response && response.status == 200 && response.data) {
        setSaveLoadingFlag(false);
        handleOnDismiss();
        setSubmitting(false);
        closeDialogHanlder()
        if (response.data) {
          toast.success(intl.formatMessage(messages.taxonomyCorrectionUpdateSuccess));
          toggleHide();
        }
      }
      else {
        setShowErrorMessage(getErrorMessage(response));
        setSaveLoadingFlag(false);
      }
    } catch (err) {
      logException(parentContext, `/v1/taxonomyCorrection/updateTaxonomy`, err);
      setShowErrorMessage(getErrorMessage(err));
      setSaveLoadingFlag(false);
    }
  };

  const toggleHide = () => {
    setComments('');
    initiateTaxonomyCorrectionsSaveCancelEvent(true);
  }

  const commonErrorMessage: IMessageState[] = [
    {
      message: showErrorMessage,
      level: {
        type: "flyout",
        componentCode: "someComponent",
        messageCode: "someMessageCode",
      },
    },
  ];

  const onCommentChange = (_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
    setComments(newText);
  };

  const closeDialogHanlder = () => {
    setShowErrorMessage(null);
    setComments('');
    handleOnDismiss();
    setQ1Option([]);
    setQ2Option([]);
    formikEnv.setFieldValue('roleSummary', '')
    formikEnv.setFieldValue('q1Combo', '')
    formikEnv.setFieldValue('q2Combo', '')
    formikEnv.resetForm();
    initiateTaxonomyCorrectionsSaveCancelEvent(false);
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

  const getRoleSummary = (data) => {
    const uniqueRoleSummary = new Set();
    
    data.forEach(item => {
      uniqueRoleSummary.add(item.roleSummary);
    });
    const uniqueRoleSummaryArray = [...uniqueRoleSummary];
    return getKeyValue(uniqueRoleSummaryArray);
  }

  const cascadeRoleSummaryOption = (selectedRoleSummary:string) => { 
    const filteredData = taxonomyCorrectionsDetails?.filter(item => item.roleSummary === selectedRoleSummary);
    let q1Options = []
    filteredData[0]?.qualifierInfoDetails?.forEach(item => {
     q1Options.push(item.q1)
    });
    setQ1Option(getKeyValue(q1Options));
    setQ2Option(getKeyValue([]))

    formikEnv.setFieldValue('q1Combo', '')
    formikEnv.setFieldValue('q2Combo', '')

  }

  const cascadeQ1toQ2Option = (selectedOption: string[]) => {
    formikEnv.setFieldValue('q1Combo', selectedOption[0])
    const filteredData = taxonomyCorrectionsDetails?.filter(item => item.roleSummary === formikEnv.values.roleSummary);
    const q1Info = filteredData[0]?.qualifierInfoDetails?.filter(q1Option => q1Option.q1 === selectedOption[0]);
    setQ2Option(getKeyValue(q1Info[0]?.q2)) 
    formikEnv.setFieldValue('q2Combo', '')
  }

  useEffect(() => {
    if(taxonomyCorrectionsDetails?.length > 0)
      setRoleSummaryData(getRoleSummary(taxonomyCorrectionsDetails))
  },[taxonomyCorrectionsDetails]);

  useEffect(() => {
    if (parentContext && Object.keys(taxonomyCorrectionsInfo).length !== 0) {
      dispatch(fetchTaxonomyDetails(parentContext,
        taxonomyCorrectionsInfo?.fyOrg,
        taxonomyCorrectionsInfo?.fyCareerStage));
    }
  }, [parentContext, taxonomyCorrectionsInfo]);

  const selectedRoleSummary = (listOfSelected: string[]) => {
    if (listOfSelected?.length > 0) {
      formikEnv.setFieldValue('roleSummary', listOfSelected[0])
      cascadeRoleSummaryOption(listOfSelected[0]);
    }
  }

  const [roleSummaryWidth, setRolesummaryWidth] = useState('590px');

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
          
          setComboWidth(newComboBoxWidth);
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

  return (
    <Flyout
      isOpen={openFlyOut}
      onDismiss={closeDialogHanlder}
      onCancel={closeDialogHanlder}
      title={intl.formatMessage(messages.taxonomyCorrectionsTitle)}
      isSaveDisabled={!formikEnv.dirty || !formikEnv.isValid || formikEnv.isSubmitting}
      handleSubmit={formikEnv.handleSubmit}
      saveButtonText={intl.formatMessage(messages.saveBtnLabel)}
      parentContext={parentContext}
      panelSize={PanelType.medium}
    >
      {loading && (
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
      <div id="flyoutContent">
        <div className={classes.tableStyling}>
          <table>
            <caption>{intl.formatMessage(messages.employeeDetails)}</caption>
            <colgroup>
              <col style={{ width: '200px' }} /> 
              <col style={{ width: '300px' }} /> 
            </colgroup>
            <tbody>
              <tr>
                <th>{intl.formatMessage(messages.employee)}</th>
                <td>{taxonomyCorrectionsInfo?.fullName}</td>
              </tr>
              <tr>
                <th>{intl.formatMessage(messages.employeeAlias)}</th>
                <td>{taxonomyCorrectionsInfo?.alias}</td>
              </tr>
              <tr>
                <th>{intl.formatMessage(messages.conversationSatus)}</th>
                <td>{taxonomyCorrectionsInfo?.conversationStatus}</td>
              </tr>
            </tbody>
          </table>

        </div>
        <div className={`${classes.tableStyling} ${classes.details}`}>
          <table>
            <caption>{intl.formatMessage(messages.managerDetails)}</caption>
            <colgroup>
              <col style={{ width: '200px' }} /> 
              <col style={{ width: '300px' }} /> 
            </colgroup>
            <tbody>
              <tr>
                <th>{intl.formatMessage(messages.currentManager)}</th>
                <td>{taxonomyCorrectionsInfo?.cyManagerFullName}</td>
              </tr>
              <tr>
                <th>{intl.formatMessage(messages.futureManager)}</th>
                <td>{taxonomyCorrectionsInfo?.fyManagerFullName}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={`${classes.tableStyling} ${classes.details}`}>
          <table>
            <caption>{intl.formatMessage(messages.taxonomyDetails)}</caption>
            <colgroup>
              <col style={{ width: '200px' }} />
              <col style={{ width: '300px' }} /> 
            </colgroup>
            <tbody>
              <tr>
                <th>{intl.formatMessage(messages.org)}</th>
                <td>{taxonomyCorrectionsInfo?.fyOrg}</td>
              </tr>
              <tr>
                <th>{intl.formatMessage(messages.cyRoleSummary)}</th>
                <td>{taxonomyCorrectionsInfo?.cyRoleSummary}</td>
              </tr>
              <tr>
                <th>{intl.formatMessage(messages.cyQ1Text)}</th>
                <td>{taxonomyCorrectionsInfo?.cyQ1}</td>
              </tr>
              <tr>
                <th>{intl.formatMessage(messages.cyQ2Text)}</th>
                <td>{taxonomyCorrectionsInfo?.cyQ2}</td>
              </tr>
            </tbody>
          </table>
        </div>


        <div id='roleSummary' className={classes.roleSummary}>
          <Label htmlFor="roleSummaryCombo" required>{intl.formatMessage(messages.roleSummary)}</Label>
          <MctSimpleComboBox
            disabled={disabled}
            isRequiredField={true}
            options={roleSummaryData}
            theme={theme.name}
            placeholder={intl.formatMessage(messages.comboPlaceHolder)}
            onSelectOptions={selectedRoleSummary}
            comboId="roleSummaryCombo"
            comboWidth={comboWidth}
            defaultSelectedOption={[formikEnv.values.roleSummary]}
            selectedKey={formikEnv.values.roleSummary}
            name="roleSummary"
            onBlur={() => formikEnv.setFieldTouched('roleSummary')}
            errorMessage1={
              formikEnv.touched.roleSummary && formikEnv.errors.roleSummary
                ? formikEnv.errors.roleSummary
                : undefined
            }
          />
        </div>
        <div className={classes.q1q2}>
          <div >
            <Label htmlFor="q1Combo" required>{intl.formatMessage(messages.q1)}</Label>
            <MctSimpleComboBox
              disabled={disabled}
              isRequiredField={true}
              options={q1Option}
              theme={theme.name}
              placeholder={intl.formatMessage(messages.comboPlaceHolder)}
              onSelectOptions={cascadeQ1toQ2Option}
              comboId="q1Combo"
              comboWidth={q1q2ComboWidth}
              defaultSelectedOption={[formikEnv.values.q1Combo]}
              selectedKey={formikEnv.values.q2Combo}
              name="q1Combo"
              onBlur={() => formikEnv.setFieldTouched('q1Combo')}
              errorMessage1={
                formikEnv.touched.q1Combo && formikEnv.errors.q1Combo
                  ? formikEnv.errors.q1Combo
                  : undefined
              }
            />
          </div>
          <div>
            <Label htmlFor="q2Combo" required>{intl.formatMessage(messages.q2)}</Label> 
            <MctSimpleComboBox
              disabled={disabled}
              options={q2Option}
              isRequiredField={true}
              theme={theme.name}
              placeholder={intl.formatMessage(messages.comboPlaceHolder)}
              onSelectOptions={(listOfSelected: string[]) => formikEnv.setFieldValue('q2Combo', listOfSelected[0])}
              comboId="q2Combo"
              comboWidth={q1q2ComboWidth}
              defaultSelectedOption={[formikEnv.values.q2Combo]}
              selectedKey={formikEnv.values.q2Combo}
              name="q2Combo"
              onBlur={() => formikEnv.setFieldTouched('q2Combo')}
              errorMessage1={
                formikEnv.touched.q2Combo && formikEnv.errors.q2Combo
                  ? formikEnv.errors.q2Combo
                  : undefined
              }
            />
          </div>
        </div>
        <div className={classes.comment}>
          <TextField
            maxLength={500}
            label={intl.formatMessage(messages.commentsLabel)}
            id='comment'
            value={comments}
            multiline
            resizable={false}
            placeholder={intl.formatMessage(messages.commentsPlaceholder)}
            onChange={onCommentChange}
            rows={8}
          />
           <span className={classes.maxCharText}>
              {intl.formatMessage(messages.maxCharacter)}
            </span>
        </div>
      </div>
    </Flyout>
  );
}

export const InitiateTaxonomyCorrections = injectIntl(TaxonomyCorrectionsComponent);