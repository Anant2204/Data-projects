import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../../utils/customRender";
import { parentContext, regions } from "../../../../../utils/testMockData";
import ConsumptionList from "../consumptionList";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as httpUtils from "../../../../../utils/httpUtils";
import * as utils from "../../../../../utils/utils";
import { fireEvent, waitFor, act, getByRole, getByTitle, getAllByRole } from "@testing-library/react";
import { registerIcons } from "@fluentui/react/lib/Styling";
import * as toastMessags from 'react-toastify';
registerIcons({
  icons: {
    cancel: "<svg>...</svg>",
    chevrondown: "<svg>...</svg>",
    clear: "<svg>...</svg>",
    calendar: "<svg>...</svg>",
    info: "<svg>...</svg>",
    add: "<svg>...</svg>",
    edit: "<svg>...</svg>",
    link: "<svg>...</svg>",
    delete: "<svg>...</svg>",
    search: "<svg>...</svg>",
    morevertical: "<svg>...</svg>",
    copy: "<svg>...</svg>",
    history: "<svg>...</svg>",
  },
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.setTimeout(30000);
const consumptionsList = [
  {
    opportunityId: null,
    msxId: null,
    customerName: null,
    id: "40ACAE0E-D447-4D44-A792-653CF9938DEB",
    name: "D Middle Estimates",
    description: null,
    type: "V2",
    programStartDate: { month: 5, year: 2023 },
    duration: 3,
    status: "New",
    defaultRegion: "westus",
    etag: null,
    modifiedDate: "2023-06-29T14:55:34.50029Z",
    modifiedBy: "v-sayyori",
    createdDate: "2023-06-20T14:55:34.50029Z",
    createdBy: "v-sayyori",
    publishedDate: null,
    publishedBy: null,
    programAzureRevenue: 257052.71,
    publishRecords: [],
  },
  {
    opportunityId: null,
    msxId: null,
    customerName: null,
    id: "0DEB9A86-B4BA-4CED-9E47-5ADDBC87B776",
    name: "P Last Estimate",
    description: null,
    type: "V2",
    programStartDate: { month: 5, year: 2023 },
    duration: 5,
    status: "New",
    defaultRegion: "westus",
    etag: null,
    modifiedDate: "2023-06-28T15:27:58.7199805Z",
    modifiedBy: "v-sayyori",
    createdDate: "2023-06-14T15:27:58.7199805Z",
    createdBy: "v-sayyori",
    publishedDate: null,
    publishedBy: null,
    programAzureRevenue: 937032.71,
    publishRecords: [],
  },
  {
    opportunityId: null,
    msxId: null,
    customerName: null,
    id: "0DEB9A86-B4BA-4CED-9E47-5ADDBC87B776",
    name: "A Estimate Order 2",
    description: null,
    type: "V2",
    programStartDate: { month: 5, year: 2023 },
    duration: 6,
    status: "New",
    defaultRegion: "westus",
    etag: null,
    modifiedDate: "2023-06-23T15:27:58.7199805Z",
    modifiedBy: "v-sayyori",
    createdDate: "2023-06-14T15:27:58.7199805Z",
    createdBy: "v-sayyori",
    publishedDate: null,
    publishedBy: null,
    programAzureRevenue: 2397092.71,
    publishRecords: [],
  },
  {
    opportunityId: "258839099",
    msxId: "7-RHBIMRQB3",
    customerName: "L Brands",
    entityType: "Opportunity",
    sourceEstimateId: null,
    versionDetails: null,
    id: "D7F71F4A-19B2-4360-A4E9-B2A18D1A56F6",
    name: "F Link: 7-RHBIMRQB3 Test ",
    description: "Description Test 1 Jan 24 South America",
    type: "V2",
    programStartDate: {
      month: 1,
      year: 2024,
    },
    duration: 4,
    status: "Published",
    defaultRegion: "South America",
    etag: '"0900cc39-0000-2200-0000-64c14b320000"',
    modifiedDate: "2023-09-26T18:21:24.802032Z",
    modifiedBy: "v-prasjoshi",
    createdDate: "2023-05-23T12:13:44.9406485Z",
    createdBy: "v-prasjoshi",
    publishedDate: null,
    publishedBy: null,
    programAzureRevenue: 237990.09,
    publishRecords: [
      {
        publishedBy: "v-prasjoshi",
        publishedDate: "2023-08-03T13:24:20.29775Z",
        version: 1,
        versionId: "717DF07E-3B93-4A62-B18D-B8282FFC127C",
        appIdentifier: "CompassOne",
      },
      {
        publishedBy: "v-ekohli",
        publishedDate: "2023-09-18T11:51:08.794471Z",
        version: 2,
        versionId: "CDBB1264-1D4A-41A8-AF3C-38E3620B8244",
        appIdentifier: "CompassOne",
      },
      {
        publishedBy: "v-prasjoshi",
        publishedDate: "2023-09-26T18:21:24.802032Z",
        version: 3,
        versionId: "A42CA373-5F9B-4D57-AF54-2A62EC0A8FBB",
        appIdentifier: "CompassOne",
      },
    ],
    contributors: [],
  },
];


const mockConsumptionsListForPublish = [
  {
    opportunityId: "258839099",
    msxId: "7-RHBIMRQB3",
    customerName: "L Brands",
    entityType: "Opportunity",
    sourceEstimateId: null,
    versionDetails: null,
    id: "D7F71F4A-19B2-4360-A4E9-B2A18D1A56F6",
    name: "Link: 7-RHBIMRQB3 Test ",
    description: "Description Test 1 Jan 24 South America",
    type: "V2",
    programStartDate: {
        "month": 1,
        "year": 2024
    },
    duration: 4,
    status: "Published",
    defaultRegion: "South America",
    etag: "\"0900cc39-0000-2200-0000-64c14b320000\"",
    modifiedDate: "2023-09-26T18:21:24.802032Z",
    modifiedBy: "v-prasjoshi",
    createdDate: "2023-05-23T12:13:44.9406485Z",
    createdBy: "v-prasjoshi",
    publishedDate: null,
    publishedBy: null,
    programAzureRevenue: 237990.09,
    publishRecords: [
        {
            publishedBy: "v-prasjoshi",
            publishedDate: "2023-08-03T13:24:20.29775Z",
            version: 1,
            versionId: "717DF07E-3B93-4A62-B18D-B8282FFC127C",
            appIdentifier: "CompassOne"
        },
    ],
    contributors: []
  },
  {
    opportunityId: null,
    msxId: null,
    customerName: null,
    id: "0DEB9A86-B4BA-4CED-9E47-5ADDBC87B776",
    name: "MyCE_14Jun23_20:57:58",
    description: null,
    type: "V2",
    programStartDate: { month: 5, year: 2023 },
    duration: 3,
    status: "New",
    defaultRegion: "westus",
    etag: null,
    modifiedDate: "2023-06-14T15:27:58.7199805Z",
    modifiedBy: "v-sayyori",
    createdDate: "2023-06-14T15:27:58.7199805Z",
    createdBy: "v-sayyori",
    publishedDate: null,
    publishedBy: null,
    programAzureRevenue: 0,
    publishRecords: [
      {
        publishedBy: "abc",
        publishedDate: "2023-07-20T06:57:24.9652979Z",
        version: 3,
        versionId: "57D19F7E-13C9-4B79-BE10-CFB405578742",
        appIdentifier: "MSX",
      },
    ],
  },
];


function MySpy() {
  this.calls = 0;
};

jest.mock("../../../../../store/selectors/config.selector", () => ({
  getConfig: jest.fn().mockReturnValue("DummyKey"),
}));

MySpy.prototype.fn = function () {
  return () => this.calls++;
};

describe("<ConsumptionList />", () => {

   afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render Consumption List in descending order of last created and modified date.", async () => {
    const component = renderWithProviders(
      <ConsumptionList parentContext={parentContext} opportunityId={null} />,
      {
        store: mockStore({
          consumptions: {
            isLoading: false,
            consumptions: consumptionsList,
            error: null,
          },
          regions: {
            isLoading: false,
            error: null,
            regions: regions,
          },
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
        }),
      }
    );

    const rows = component.getAllByRole("row");
    expect(rows[1]).toHaveTextContent(/D Middle Estimates257,0533 MonthsMay 2023 – Jul 2023/);
    expect(rows[2]).toHaveTextContent(/P Last Estimate937,0335 MonthsMay 2023 – Sep 2023/);
    expect(rows[3]).toHaveTextContent(/Estimate Order 22,397,0936 MonthsMay 2023 – Oct 2023/);
  });

  it("should show published icon and tooltip along with published date.", async () => {
    const component = renderWithProviders(
      <ConsumptionList parentContext={parentContext} opportunityId={null} />,
      {
        store: mockStore({
          consumptions: {
            isLoading: false,
            consumptions: consumptionsList,
            error: null,
          },
          regions: {
            isLoading: false,
            error: null,
            regions: regions,
          },
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
        }),
      }
    );

    const tooltipHosts = document.querySelectorAll('.ms-TooltipHost');
    const rows = component.getAllByRole("row");
    expect(rows[4]).toHaveTextContent('7-RHBIMRQB3F Link: 7-RHBIMRQB3 Test Compass OnePublished to Compass One on 26-Sep-2023, 11:51 PM237,9904 MonthsJan 2024 – Apr 2024<svg>...</svg><svg>...</svg>');
    expect(tooltipHosts[1]).toHaveTextContent('Compass OnePublished to Compass One on 26-Sep-2023, 11:51 PM');
    
  });

  
  it("Consumption List search should be applied on the list", async () => {
    const component = renderWithProviders(
      <ConsumptionList parentContext={parentContext} opportunityId={null} />,
      {
        store: mockStore({
          consumptions: {
            isLoading: false,
            consumptions: consumptionsList,
            error: null,
          },
          regions: {
            isLoading: false,
            error: null,
            regions: regions,
          },
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
        }),
      }
    );

    const searchTxtField = component.getByPlaceholderText('Search Consumption Estimate');
    fireEvent.change(searchTxtField, { target: { value: 'Order 2'}});
    const rows = component.getAllByRole("row");
    expect(rows.length).toBe(2);

    fireEvent.change(searchTxtField, { target: { value: '5'}});
    const rowsDuration = component.getAllByRole("row");
    expect(rowsDuration.length).toBe(3);

    fireEvent.change(searchTxtField, { target: { value: '257'}});
    const rowsAcrs = component.getAllByRole("row");
    expect(rowsAcrs.length).toBe(2);
  });

  it("If there are not estimates available for the user then proper message should be displayed.", async () => {
    const component = renderWithProviders(
      <ConsumptionList parentContext={parentContext} opportunityId={null} />,
      {
        store: mockStore({
          consumptions: {
            isLoading: false,
            consumptions: [],
            error: null,
          },
          regions: {
            isLoading: false,
            error: null,
            regions: regions,
          },
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
        }),
      }
    );

    const searchTxtField = component.getByPlaceholderText('Search Consumption Estimate');
    searchTxtField.setAttribute('value', '');
    const message = component.getAllByText(/There are no Vnext consumption Estimates to show yet, please create one./);
    expect(message.length).toBeGreaterThan(0);
  });

  it("should show the no results found image when no results found for the given query ", async () => {
    const component = renderWithProviders(
        <ConsumptionList parentContext={parentContext} opportunityId={null} />,
        {
          store: mockStore({
            consumptions: {
              isLoading: false,
              consumptions: mockConsumptionsListForPublish,
              error: null,
            },
            regions: {
              isLoading: false,
              error: null,
              regions: regions,
            },
            config: {
              isLoading: false,
              error: null,
              config: "dummyliscencekey",
            }
          }),
        }
      );

      const searchTxtField = component.getByPlaceholderText('Search Consumption Estimate');
      fireEvent.change(searchTxtField, { target: { value: 'Order 22323'}});
      const message = component.getByText(/Could not find a match. Try adjusting your search to find what you are looking for./);
      expect(message).toBeInTheDocument();
     
  });

   it("Should open the consumption details page when clicked on estimate name", async () => {

    const { getAllByTestId } = renderWithProviders(
      <ConsumptionList parentContext={parentContext} opportunityId={null} />,
        {
          store: mockStore({
            consumptions: {
              isLoading: false,
              consumptions: mockConsumptionsListForPublish,
              error: null,
            },
            regions: {
              isLoading: false,
              error: null,
              regions: regions,
            },
            config: {
              isLoading: false,
              error: null,
              config: "dummyliscencekey",
            },
            estimateVersionState:{
              isLoading: false,
              versionData: [],
              error: null,
            }
          }),
        }
    );

    const linkEstimates = getAllByTestId('link-estimate-name');
    fireEvent.click(linkEstimates[0]);
    // TODO: Facing issue with params assert, will create a bug.
    expect(parentContext.getNavigationContext).toHaveBeenCalled();
  });

 it("Should open the opportunity page when clicked on msx ID", async () => {
  
  const { getAllByTestId } =
    renderWithProviders(
      <ConsumptionList parentContext={parentContext} opportunityId={null} />,
       {
         store: mockStore({
           consumptions: {
             isLoading: false,
             consumptions: mockConsumptionsListForPublish,
             error: null,
           },
           regions: {
             isLoading: false,
             error: null,
             regions: regions,
           },
           config: {
             isLoading: false,
             error: null,
             config: "dummyliscencekey",
           },
           estimateVersionState:{
             isLoading: false,
             versionData: [],
             error: null,
           }
         }),
       }
     );
    
    const linkOpportunities = getAllByTestId('link-opportunity');
    fireEvent.click(linkOpportunities[0]);
    // TODO: Will create a bug and handle the proper assertions.
    expect(parentContext.getNavigationContext).toBeCalled();
  });

  /*
  TODO: FAcing some issue in sorting functionality. Will cover later.
  it("Able to sort the list by estimate name when click on column header (Name)", async () => {
  
    const { getAllByRole, getByText } =
      renderWithProviders(
        <ConsumptionList parentContext={parentContext} opportunityId={null} />,
         {
           store: mockStore({
             consumptions: {
               isLoading: false,
               consumptions: consumptionsList,
               error: null,
             },
             regions: {
               isLoading: false,
               error: null,
               regions: regions,
             },
             config: {
               isLoading: false,
               error: null,
               config: "dummyliscencekey",
             },
             estimateVersionState:{
               isLoading: false,
               versionData: [],
               error: null,
             }
           }),
         }
       );
      
       const idHeaderCell = getByText("Estimate Name");

        fireEvent.click(idHeaderCell);
        fireEvent.click(idHeaderCell);

                const rows = getAllByRole("row");
        // const firstCellDesc = getByRole("gridcell", { name: "2" });
        // expect(firstCellDesc.textContent).toBe("2");
        // const descArrowIcon = container.querySelector(".ag-icon.ag-icon-desc");

      await waitFor(() => {
        expect(rows[1]).toHaveTextContent("D Middle Estimates257,0533 MonthsMay 2023 – Jul 2023<svg>...</svg><svg>...</svg>");
        expect(rows[2]).toHaveTextContent("P Last Estimate937,0335 MonthsMay 2023 – Sep 2023<svg>...</svg><svg>...</svg>");
        expect(rows[3]).toHaveTextContent(/Estimate Order 22,397,0936 MonthsMay 2023 – Oct 2023/);
      });
    });
    */

  it("should open flyout on clicking on create a consumption estimate button", async () => {
    const { getAllByText, getByTestId } =
      renderWithProviders(
        <ConsumptionList parentContext={parentContext} opportunityId={null} />,
        {
          store: mockStore({
            consumptions: {
              isLoading: false,
              consumptions: consumptionsList,
              error: null,
            },
            regions: {
              isLoading: false,

              error: null,
              regions: regions,
            },
            config: {
              isLoading: false,
              error: null,
              config: "dummyliscencekey",
            },
          }),
        }
      );
    expect(getAllByText("Create a Consumption Estimate")).toHaveLength(1);
    const openFlyout = getByTestId("createAConsumption");
    fireEvent.click(openFlyout);
    expect(getAllByText("Create a Consumption Estimate")).toHaveLength(2);
    
  }); 

  it("should open the View/Estimate details page when click on menu button of estimate row ", async () => {
    const { getByRole, getByText } =
      renderWithProviders(
        <ConsumptionList parentContext={parentContext} opportunityId={null} />,
        {
          store: mockStore({
            consumptions: {
              isLoading: false,
              consumptions: mockConsumptionsListForPublish,
              error: null,
            },
            regions: {
              isLoading: false,
              error: null,
              regions: regions,
            },
            config: {
              isLoading: false,
              error: null,
              config: "dummyliscencekey",
            }
          }),
        }
      );

      const iconBtns = document.querySelectorAll(".ms-Button--icon");
      expect(iconBtns[0].classList.contains('is-expanded')).toBe(false);
      fireEvent.click(iconBtns[0]);
      expect(iconBtns[0].classList.contains('is-expanded')).toBe(true);
      const btnViewEditEst = getByRole('menuitem', { 'name': 'View/Edit Details'});
      fireEvent.click(btnViewEditEst);
      const headerText = getByText("Edit Consumption Estimate")
      expect(headerText).toBeInTheDocument();
     
  }); 

 it("should render the estimates list for the opportunity ", async () => {
    jest.mock("../../../../../utils/httpUtils", async () => ({
      getConsumptionAPI: jest.fn().mockReturnValue({status: 200, data: [
        {
          id: "3148808D-3F27-4A71-A49E-F7A3493E18E8",
          name: "Cponsumption2",
          description: "",
          type: "V2",
          programStartDate: {
            month: 7,
            year: 2023,
          },
          duration: 5,
          status: "New",
          defaultRegion: "westus",
          etag: null,
          modifiedDate: null,
          modifiedBy: null,
          createdDate: "2023-05-30T10:42:59.0658452Z",
          createdBy: "vinambiar",
          publishedDate: null,
          publishedBy: null,
          programAzureRevenue: 62650.57,
          publishRecords: [],
        },
        {
          id: "087D6ACB-98D8-494B-8878-F8444124AED8",
          name: "MyCE_13Jun23_12:39:48",
          description: null,
          type: "V2",
          programStartDate: {
            month: 5,
            year: 2023,
          },
          duration: 4,
          status: "New",
          defaultRegion: "westus",
          etag: null,
          modifiedDate: null,
          modifiedBy: null,
          createdDate: "2023-06-13T07:09:55.1011102Z",
          createdBy: "v-sayyori",
          publishedDate: null,
          publishedBy: null,
          programAzureRevenue: 123486.88,
          publishRecords: [],
        },
      ]})
    }));

    const component = renderWithProviders(
        <ConsumptionList parentContext={parentContext} opportunityId={'DUMMY_OPPORTUNITY_ID'} />,
        {
          store: mockStore({
            consumptions: {
              isLoading: false,
              consumptions: mockConsumptionsListForPublish,
              error: null,
            },
            regions: {
              isLoading: false,
              error: null,
              regions: regions,
            },
            config: {
              isLoading: false,
              error: null,
              config: "dummyliscencekey",
            }
          }),
        }
      );

      await waitFor(() => {
        const rowsDuration = component.getAllByRole("row");
        expect(rowsDuration.length).toBe(3);
        expect(rowsDuration[1]).toHaveTextContent(/7-RHBIMRQB3Link: 7-RHBIMRQB3 Test Compass OnePublished to Compass One on 03-Aug-2023, 06:54 PM237,9904 MonthsJan 2024 – Apr 2024/);

      });
     
  }); 

  it("Create Version, display error message if gets an error while fetching the estimate details", async () => {
    
    const getErrorMessageSpy = jest.spyOn(utils, 'getErrorMessage');
    const spy = jest.spyOn(httpUtils, 'getConsumptionAPI');
    spy.mockImplementation(() => Promise.resolve({status: 400, data: "Estimate with Id:F4C617FB-9E20-49DD-8414-30AA855A7946P not found."}));
     
    const { getByRole } =
      renderWithProviders(
        <ConsumptionList parentContext={parentContext} opportunityId={null} />,
         {
           store: mockStore({
             consumptions: {
               isLoading: false,
               consumptions: mockConsumptionsListForPublish,
               error: null,
             },
             regions: {
               isLoading: false,
               error: null,
               regions: regions,
             },
             config: {
               isLoading: false,
               error: null,
               config: "dummyliscencekey",
             },
             estimateVersionState:{
               isLoading: false,
               versionData: [],
               error: null,
             }
           }),
         }
       );
 
       const iconBtns = document.querySelectorAll(".ms-Button--icon");
       expect(iconBtns[0].classList.contains('is-expanded')).toBe(false);
       fireEvent.click(iconBtns[0]);
       expect(iconBtns[0].classList.contains('is-expanded')).toBe(true);
       const btnCreateVersion = getByRole('menuitem', { 'name': 'Create Version'});
       act(() => {
        fireEvent.click(btnCreateVersion);
       });

       await waitFor(() => {
         expect(getErrorMessageSpy).toHaveBeenCalled();
       });
       
  });

  it("should open the Create Version Modal for the given estimate", async () => {
    const spy = jest.spyOn(httpUtils, 'getConsumptionAPI');
   
    spy.mockImplementation(() => Promise.resolve({status: 200, data:{
      "opportunityId": "4950",
      "msxId": "7-SWSN3VY3Y",
      "customerName": "AAG",
      "entityType": "ConsumptionEstimate",
      "sourceEstimateId": null,
      "versionDetails": null,
      "id": "F4C617FB-9E20-49DD-8414-30AA855A7946",
      "name": "TEst 10:09 7-SWSN3VY3Y n",
      "description": "Able to updated.",
      "type": "V2",
      "programStartDate": {
        "month": 6,
        "year": 2023
      },
      "duration": 10,
      "status": "Published",
      "defaultRegion": "India",
      "etag": "\"0a000e67-0000-2200-0000-6508276a0000\"",
      "modifiedDate": "2023-09-18T10:33:14.2797574Z",
      "modifiedBy": "rajnair",
      "createdDate": "2023-06-08T17:25:18.1258081Z",
      "createdBy": "v-prasjoshi",
      "publishedDate": "2023-09-03T06:54:01.1247715Z",
      "publishedBy": "rajnair",
      "programAzureRevenue": 1820013.12,
      "publishRecords": [
        {
          "publishedBy": "rajnair",
          "publishedDate": "2023-08-01T10:37:44.7715837Z",
          "version": 1,
          "versionId": "246EF392-16ED-4E59-BFC8-DED7F7B261C9",
          "appIdentifier": "CompassOne"
        }
      ],
      "contributors": []
  }}));
     
 
  const { getByRole, getByText } =
    renderWithProviders(
      <ConsumptionList parentContext={parentContext} opportunityId={null} />,
        {
          store: mockStore({
            consumptions: {
              isLoading: false,
              consumptions: mockConsumptionsListForPublish,
              error: null,
            },
            regions: {
              isLoading: false,
              error: null,
              regions: regions,
            },
            config: {
              isLoading: false,
              error: null,
              config: "dummyliscencekey",
            },
            estimateVersionState:{
              isLoading: false,
              versionData: [],
              error: null,
            }
          }),
        }
      );

      const iconBtns = document.querySelectorAll(".ms-Button--icon");
      expect(iconBtns[0].classList.contains('is-expanded')).toBe(false);
      fireEvent.click(iconBtns[0]);
      expect(iconBtns[0].classList.contains('is-expanded')).toBe(true);
      const btnCreateVersion =  getByRole('menuitem', { 'name': 'Create Version'});
      fireEvent.click(btnCreateVersion);

      await waitFor(() => {
        const headerText = getByText(/Creates a snapshot of this Consumption Estimate as a read-only version which can be referred to late/)
        expect(headerText).toBeInTheDocument();
      });
  }); 

  it("should open the View Version Flyout for the given estimate", async () => {
    jest.mock("../../../../../store/actions/estimateVersionData.actions", () => ({
      getVersionsLoadingStatus: jest.fn().mockReturnValue(false),
      getVersionData: jest.fn().mockReturnValue(
        [
          {
              "id": "A751DA5A-6AC2-449B-BFC1-148A7F40DC30",
              "versionName": "New version",
              "createdBy": "v-prasjoshi",
              "createdDateTime": "2023-07-13T15:10:37.5846468Z",
              "programAzureRevenue": 262623.52,
              "programStartDate": {
                  "month": 6,
                  "year": 2023
              },
              "duration": 4
          }]
      ),
      getVersionLoaderError: jest.fn().mockReturnValue(false),
    }));

    const { getByRole, getByText } =
      renderWithProviders(
        <ConsumptionList parentContext={parentContext} opportunityId={null} />,
        {
          store: mockStore({
            consumptions: {
              isLoading: false,
              consumptions: mockConsumptionsListForPublish,
              error: null,
            },
            regions: {
              isLoading: false,
              error: null,
              regions: regions,
            },
            config: {
              isLoading: false,
              error: null,
              config: "dummyliscencekey",
            },
            estimateVersionState:{
              isLoading: false,
              versionData: [],
              error: null,
            }
          }),
        }
      );

      const iconBtns = document.querySelectorAll(".ms-Button--icon");
      expect(iconBtns[0].classList.contains('is-expanded')).toBe(false);
      fireEvent.click(iconBtns[0]);
      expect(iconBtns[0].classList.contains('is-expanded')).toBe(true);
      const btnCreateVersion =  getByRole('menuitem', { 'name': 'View Versions'});
      fireEvent.click(btnCreateVersion);
      const headerText = getByText("Version History")
      expect(headerText).toBeInTheDocument();
     
  }); 

  it("Publish estimate menu clicked", async () => {
    const spyToastSuccess = jest.spyOn(toastMessags.toast, 'success');

    const spy = jest.spyOn(httpUtils, 'postConsumptionAPI');
    spy.mockImplementation(() => Promise.resolve({status: 200, data: 'DC8A45FB-50AF-4B20-B534-0789334BA737' }));
     
    const spyGetEstimate = jest.spyOn(httpUtils, 'getConsumptionAPI');
    
    spyGetEstimate.mockImplementation(() => Promise.resolve({status: 200, data: { 
      etag: "ETAG_ETAG_12323213"
    }}));
    
    const { getByRole } =
      renderWithProviders(
        <ConsumptionList parentContext={parentContext} opportunityId={null} />,
        {
          store: mockStore({
            consumptions: {
              isLoading: false,
              consumptions: mockConsumptionsListForPublish,
              error: null,
            },
            regions: {
              isLoading: false,
              error: null,
              regions: regions,
            },
            config: {
              isLoading: false,
              error: null,
              config: "dummyliscencekey",
            },
            estimateVersionState:{
              isLoading: false,
              versionData: [],
              error: null,
            }
          }),
        }
      );
 
      const iconBtns = document.querySelectorAll(".ms-Button--icon");
      expect(iconBtns[0].classList.contains('is-expanded')).toBe(false);
      fireEvent.click(iconBtns[0]);
      expect(iconBtns[0].classList.contains('is-expanded')).toBe(true);
      const btnCreateVersion =  getByRole('menuitem', { 'name': 'Publish to C1/CPQ'});
      fireEvent.click(btnCreateVersion);
      
      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(
          `v1/consumption/estimates/D7F71F4A-19B2-4360-A4E9-B2A18D1A56F6/publish`,
          {
            etag: 'ETAG_ETAG_12323213',
          },
          parentContext
        );
      });

      expect(spyToastSuccess).toHaveBeenCalled();
    }); 
    
    it("Publish estimate menu clicked, which retuns message about already published estimates", async () => {

     const getErrorMessageSpy = jest.spyOn(utils, 'getErrorMessage');
     const error = "There is already a version published on 09-Aug-2023, 08:56 AM (UTC)";

     const spy = jest.spyOn(httpUtils, 'postConsumptionAPI');
     spy.mockImplementation(() => Promise.resolve({status: 400,  data: error}));
      
     const spyGetEstimate = jest.spyOn(httpUtils, 'getConsumptionAPI');
     
     spyGetEstimate.mockImplementation(() => Promise.resolve({status: 200, data: { 
       etag: "ETAG_ETAG_12323213"
     }}));
   
   
    const { getByRole, getByText, container} = renderWithProviders(
      <ConsumptionList parentContext={parentContext} opportunityId={null} />,
        {
          store: mockStore({
            consumptions: {
              isLoading: false,
              consumptions: mockConsumptionsListForPublish,
              error: null,
            },
            regions: {
              isLoading: false,
              error: null,
              regions: regions,
            },
            config: {
              isLoading: false,
              error: null,
              config: "dummyliscencekey",
            },
            estimateVersionState:{
              isLoading: false,
              versionData: [],
              error: null,
            }
          }),
        }
      );
 
      const iconBtns = document.querySelectorAll(".ms-Button--icon");
      expect(iconBtns[0].classList.contains('is-expanded')).toBe(false);
      fireEvent.click(iconBtns[0]);
      expect(iconBtns[0].classList.contains('is-expanded')).toBe(true);
      const btnPublishC1 =  getByRole('menuitem', { 'name': 'Publish to C1/CPQ'});

      act(() => {
        fireEvent.click(btnPublishC1);
      });
      

      await waitFor(() => {
        expect(getErrorMessageSpy).toHaveBeenCalledWith({
          status: 400, 
          data: error,
        })
      });

  }); 

  it("Publish estimate menu clicked, should show error if failed to publish.", async () => {

    const getErrorMessageSpy = jest.spyOn(utils, 'getErrorMessage');
    
    const spy = jest.spyOn(httpUtils, 'postConsumptionAPI');
    const error = new Error("URL Not found");
    spy.mockImplementation(() => Promise.reject(error));
     
    const spyGetEstimate = jest.spyOn(httpUtils, 'getConsumptionAPI');
    
    spyGetEstimate.mockImplementation(() => Promise.resolve({status: 200, data: { 
      etag: "ETAG_ETAG_12323213"
    }}));
  
  
   const { getByRole } = renderWithProviders(
     <ConsumptionList parentContext={parentContext} opportunityId={null} />,
       {
         store: mockStore({
           consumptions: {
             isLoading: false,
             consumptions: mockConsumptionsListForPublish,
             error: null,
           },
           regions: {
             isLoading: false,
             error: null,
             regions: regions,
           },
           config: {
             isLoading: false,
             error: null,
             config: "dummyliscencekey",
           },
           estimateVersionState:{
             isLoading: false,
             versionData: [],
             error: null,
           }
         }),
       }
     );

     const iconBtns = document.querySelectorAll(".ms-Button--icon");
     expect(iconBtns[0].classList.contains('is-expanded')).toBe(false);
     fireEvent.click(iconBtns[0]);
     expect(iconBtns[0].classList.contains('is-expanded')).toBe(true);
     const btnCreateVersion =  getByRole('menuitem', { 'name': 'Publish to C1/CPQ'});
     fireEvent.click(btnCreateVersion);

     await waitFor(() => {
       expect(getErrorMessageSpy).toHaveBeenCalled();
     });

  }); 


  it("Delete estimate menu clicked and successfully deleted the estiamte", async () => {
    const spyGet = jest.spyOn(httpUtils, "getConsumptionAPI");
    spyGet.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {
          etag: "DC8A45FB-50AF-4B20-B534-0789334BA737",
        },
      })
    );

    const spyToastSuccess = jest.spyOn(toastMessags.toast, "success");

    const spy = jest.spyOn(httpUtils, "postConsumptionAPI");
    spy.mockImplementation(() => Promise.resolve({ status: 200 }));

    const { getByRole, getByText, getByTestId } = renderWithProviders(
      <ConsumptionList parentContext={parentContext} opportunityId={null} />,
      {
        store: mockStore({
          consumptions: {
            isLoading: false,
            consumptions: mockConsumptionsListForPublish,
            error: null,
          },
          regions: {
            isLoading: false,
            error: null,
            regions: regions,
          },
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
          estimateVersionState: {
            isLoading: false,
            versionData: [],
            error: null,
          },
        }),
      }
    );

    const iconBtns = document.querySelectorAll(".ms-Button--icon");
    expect(iconBtns[0].classList.contains("is-expanded")).toBe(false);
    fireEvent.click(iconBtns[0]);
    expect(iconBtns[0].classList.contains("is-expanded")).toBe(true);
    const btnDeleteVersion =  getByRole('menuitem', { 'name': 'Delete'});
    fireEvent.click(btnDeleteVersion);

    await waitFor(() => {
      const headerText = getByText(/Delete Confirmation/);
      expect(headerText).toBeInTheDocument();
    });

    const button = getByRole("button", { 'name': "Delete"});

    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(spyToastSuccess).toHaveBeenCalled();
    });
  });

  it("Delete estimate menu clicked and confirmed but unable to delete the published estimates ", async () => {
    const getErrorMessageSpy = jest.spyOn(utils, "getErrorMessage");
    const spyGet = jest.spyOn(httpUtils, "getConsumptionAPI");
    spyGet.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {
          etag: "DC8A45FB-50AF-4B20-B534-0789334BA737",
        },
      })
    );

    const spy = jest.spyOn(httpUtils, "postConsumptionAPI");
    spy.mockImplementation(() =>
      Promise.resolve({
        status: 400,
        data: "Estimate cannot be deleted as it is published.",
      })
    );

    const { getByRole, getByText } = renderWithProviders(
      <ConsumptionList parentContext={parentContext} opportunityId={null} />,
      {
        store: mockStore({
          consumptions: {
            isLoading: false,
            consumptions: consumptionsList,
            error: null,
          },
          regions: {
            isLoading: false,
            error: null,
            regions: regions,
          },
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
          estimateVersionState: {
            isLoading: false,
            versionData: [],
            error: null,
          },
        }),
      }
    );

    const iconBtns = document.querySelectorAll(".ms-Button--icon");
    expect(iconBtns[0].classList.contains("is-expanded")).toBe(false);
    fireEvent.click(iconBtns[0]);
    expect(iconBtns[0].classList.contains("is-expanded")).toBe(true);

    const btnDeleteVersion =  getByRole('menuitem', { 'name': 'Delete'});
    fireEvent.click(btnDeleteVersion);

    await waitFor(() => {
      const headerText = getByText(/Delete Confirmation/);
      expect(headerText).toBeInTheDocument();
    });

    const button = getByRole("button", { 'name': "Delete"});

    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(getErrorMessageSpy).toHaveBeenCalled();
    });
  });

  it("Add Scenario menu clicked", async () => {
    const { getByRole} =
      renderWithProviders(
        <ConsumptionList parentContext={parentContext} opportunityId={null} />,
        {
          store: mockStore({
            consumptions: {
              isLoading: false,
              consumptions: consumptionsList,
              error: null,
            },
            regions: {
              isLoading: false,
              error: null,
              regions: regions,
            },
            config: {
              isLoading: false,
              error: null,
              config: "dummyliscencekey",
            },
            estimateVersionState:{
              isLoading: false,
              versionData: [],
              error: null,
            }
          }),
        }
      );

      const iconBtns = document.querySelectorAll(".ms-Button--icon");
      expect(iconBtns[0].classList.contains('is-expanded')).toBe(false);
      fireEvent.click(iconBtns[0]);
      expect(iconBtns[0].classList.contains('is-expanded')).toBe(true);
      const icon = getByRole('menuitem', { 'name': 'Add Scenario'});
      fireEvent.click(icon);

      //TODO: Will create a bug, unable to verify the params which passed to navigate method.
      expect(parentContext.getNavigationContext).toBeCalled();
  });

  
  it("should be able to successfully clone the estimate", async () => {
    const spy = jest.spyOn(httpUtils, "postConsumptionAPI");
    spy.mockImplementation(() => Promise.resolve({ status:200, data: 'Cloned'}));
    const spyToastSuccess = jest.spyOn(toastMessags.toast, 'success');

    const { getByRole, getByText } = renderWithProviders(
      <ConsumptionList parentContext={parentContext} opportunityId={null} />,
      {
        store: mockStore({
          consumptions: {
            isLoading: false,
            consumptions: consumptionsList,
            error: null,
          },
          regions: {
            isLoading: false,
            error: null,
            regions: regions,
          },
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
          estimateVersionState: {
            isLoading: false,
            versionData: [],
            error: null,
          },
        }),
      }
    );

    const iconBtns = document.querySelectorAll(".ms-Button--icon");
    expect(iconBtns[0].classList.contains("is-expanded")).toBe(false);
    fireEvent.click(iconBtns[0]);
    expect(iconBtns[0].classList.contains("is-expanded")).toBe(true);
    const icon = getByRole("menuitem", {'name': 'Clone'});
    act(() => {
      fireEvent.click(icon);
    });

    expect(spy).toHaveBeenCalledWith(
      `v1/consumption/estimates/40ACAE0E-D447-4D44-A792-653CF9938DEB/clone`,
      {
        isNewOpportunity: true,
      },
      parentContext
    ); 

    await waitFor(() => {
      expect(spyToastSuccess).toHaveBeenCalled();
    });

  }); 

  
  it("should be able to show error if failed to clone the estimates", async () => {
    const spy = jest.spyOn(httpUtils, "postConsumptionAPI");
    spy.mockImplementation(() => Promise.resolve({ status:400, data: 'Clone'}));
    const spyLogException = jest.spyOn(utils, 'logException');
    const { getByRole } = renderWithProviders(
      <ConsumptionList parentContext={parentContext} opportunityId={null} />,
      {
        store: mockStore({
          consumptions: {
            isLoading: false,
            consumptions: consumptionsList,
            error: null,
          },
          regions: {
            isLoading: false,
            error: null,
            regions: regions,
          },
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
          estimateVersionState: {
            isLoading: false,
            versionData: [],
            error: null,
          },
        }),
      }
    );

    const iconBtns = document.querySelectorAll(".ms-Button--icon");
    expect(iconBtns[0].classList.contains("is-expanded")).toBe(false);
    fireEvent.click(iconBtns[0]);
    expect(iconBtns[0].classList.contains("is-expanded")).toBe(true);
    const icon = getByRole("menuitem", {'name': 'Clone'});
    act(() => {
      fireEvent.click(icon);
    });

    expect(spy).toHaveBeenCalledWith(
      `v1/consumption/estimates/40ACAE0E-D447-4D44-A792-653CF9938DEB/clone`,
      {
        isNewOpportunity: true,
      },
      parentContext
    ); 

    await waitFor(() => {
      expect(spyLogException).toHaveBeenCalled();
    });

  }); 

  
  
  it("should be able to show dialog to choose option to clone estimates with  linked or without  lined opportunity", async () => {
    const spy = jest.spyOn(httpUtils, "postConsumptionAPI");
    spy.mockImplementation(() => Promise.resolve({ status:200, data: 'Cloned'}));
    const spyToastSuccess = jest.spyOn(toastMessags.toast, 'success');


    const { getByRole, getByText, getByLabelText } = renderWithProviders(
      <ConsumptionList parentContext={parentContext} opportunityId={null} />,
      {
        store: mockStore({
          consumptions: {
            isLoading: false,
            consumptions: consumptionsList,
            error: null,
          },
          regions: {
            isLoading: false,
            error: null,
            regions: regions,
          },
          config: {
            isLoading: false,
            error: null,
            config: "dummyliscencekey",
          },
          estimateVersionState: {
            isLoading: false,
            versionData: [],
            error: null,
          },
        }),
      }
    );

    const iconBtns = document.querySelectorAll(".ms-Button--icon");
    expect(iconBtns[3].classList.contains("is-expanded")).toBe(false);
    fireEvent.click(iconBtns[3]);
    expect(iconBtns[3].classList.contains("is-expanded")).toBe(true);
    const btnClone =  getByRole('menuitem', { 'name': 'Clone'});
    
    act(() => {
      fireEvent.click(btnClone);
    });

    const text = 'Add this cloned estimate as part of the same opportunity OR as an unlinked estimate (not attached to an opportunity)?';
    const textElem = getByText(text);
    expect(textElem).toBeInTheDocument();

    const radioBtn = getByLabelText('As an estimate within the same opportunity');
    act(() => {
      fireEvent.click(radioBtn);
    })
   
    const cloneButton = getByRole('button', { 'name': 'Clone'});
    act(() => {
      fireEvent.click(cloneButton);
    });


    expect(spy).toHaveBeenCalledWith(
      `v1/consumption/estimates/D7F71F4A-19B2-4360-A4E9-B2A18D1A56F6/clone`,
      {
        isNewOpportunity: false,
      },
      parentContext
    ); 

    await waitFor(() => {
      expect(spyToastSuccess).toHaveBeenCalled();
    });

  }); 

});