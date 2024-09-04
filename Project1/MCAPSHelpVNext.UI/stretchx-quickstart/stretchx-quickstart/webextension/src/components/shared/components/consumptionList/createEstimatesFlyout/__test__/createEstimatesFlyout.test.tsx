import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../../../utils/customRender";
import { parentContext } from "../../../../../../utils/testMockData";
import { CreateEstimatesFlyout } from "../createEstimatesFlyout";
import { formatDateAndTime } from "../../../../../../utils";
import { fireEvent, act, waitFor } from "@testing-library/react";
import { registerIcons } from "@fluentui/react/lib/Styling";
import * as httpUtils from "../../../../../../utils/httpUtils";

registerIcons({
  icons: {
    cancel: "<svg>...</svg>",
    chevrondown: "<svg>...</svg>",
    clear: "<svg>...</svg>",
    calendar: "<svg>...</svg>",
    info: "<svg>...</svg>",
  },
});

const mockEstimateCompass = {
  EstimateId: "40ACAE0E-D447-4D44-A792-653CF9938DEB",
  Name: "MyCE_21Jul23_20:24:09",
  Description: null,
  Month: 5,
  Year: 2023,
  Region: "westus",
  ModifiedDate: "2023-06-21T14:55:34.50029Z",
  ModifiedBy: "v-sayyori",
  CreatedDate: "2023-06-21T14:55:34.50029Z",
  CreatedBy: "v-sayyori",
  PublishedDate: null,
  PublishedBy: null,
  PublishRecords: [
    {
      publishedBy: "v-sayyori",
      publishedDate: "2023-07-20T06:57:24.9652979Z",
      versionId: "57D19F7E-13C9-4B79-BE10-CFB405578742",
      appIdentifier: "CompassOne",
    },
  ],
};

const mockEstimateMSX = {
  EstimateId: "40ACAE0E-D447-4D44-A792-653CF9938DEB",
  Name: "MyCE_21Jul23_20:24:09",
  Description: null,
  Month: 5,
  Year: 2023,
  Region: "westus",
  ModifiedDate: "2023-06-21T14:55:34.50029Z",
  ModifiedBy: "v-sayyori",
  CreatedDate: "2023-06-21T14:55:34.50029Z",
  CreatedBy: "v-sayyori",
  PublishedDate: null,
  PublishedBy: null,
  PublishRecords: [
    {
      publishedBy: "v-sayyori",
      publishedDate: "2023-07-20T06:57:24.9652979Z",
      versionId: "57D19F7E-13C9-4B79-BE10-CFB405578742",
      appIdentifier: "MSX",
    },
  ],
};

const estimateDetailsMockForEdit = {
  "EstimateId": "1A72ADE8-3F19-4243-9268-939EA39656DC",
  "Name": "MyCE_09Jun23_11:56:04_Clone1_Clone1_Clon",
  "ACR": 107455,
  "ACRFormattedValue": "107,455",
  "Description": "dsd",
  "Duration": "Sep 2023 – Jul 2024",
  "DurationMonth": "11 Months",
  "Status": "New",
  "MsxId": null,
  "Month": 9,
  "Year": 2023,
  "CreatedBy": "v-prasjoshi",
  "CreatedDate": "2023-09-21T16:38:22.2078727Z",
  "ModifiedBy": "v-prasjoshi",
  "ModifiedDate": "2023-09-26T11:20:32.7035952Z",
  "PublishedBy": null,
  "PublishedDate": null,
  "PublishRecords": [],
  "Region": "westus",
  "OpportunityId": null,
  "Etag": null
};

jest.setTimeout(50000);

describe("<createEstimatesFlyout /> render", () => {
  it("should render in edit mode if editmode is true", async () => {
    const { getByText, getByRole, getByLabelText} = renderWithProviders(
      <CreateEstimatesFlyout
        openFlyOut={true}
        handleOnDismiss={jest.fn()}
        parentContext={parentContext}
        handleUpdateConsumption={jest.fn()}
        regions={[{ key: "1", text: "westus" }]}
        estimateDetails={mockEstimateCompass}
        opportunityId={""}
        editMode={true}
        actionButtonName={"Update"}
      />
    );

    const modal = getByRole('dialog');
    expect(modal).toBeInTheDocument();

    const h2Element = getByRole('heading', { name: 'Edit Consumption Estimate' });
    expect(h2Element).toBeInTheDocument();

    const consInputFeild = getByLabelText('Name');
    expect(consInputFeild).toBeInTheDocument();

    const consDescFeild = getByLabelText('Description');
    expect(consDescFeild).toBeInTheDocument();

    const monthFeild = getByLabelText('Program Start Month');
    expect(monthFeild).toBeInTheDocument();

    const recurringFeild = getByLabelText('Access');
    expect(recurringFeild).toBeInTheDocument();

    const editButton = getByRole('button', { name: 'Update' });
    expect(editButton).toBeInTheDocument();
    expect(editButton).toBeDisabled();


    const cancelButton = getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    const closeButton = getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
  });

  it("should render in create mode if editmode is false", async () => {
    const { getByText, getByLabelText, getByRole } = renderWithProviders(
      <CreateEstimatesFlyout
        openFlyOut={true}
        handleOnDismiss={jest.fn()}
        parentContext={parentContext}
        handleUpdateConsumption={jest.fn()}
        regions={[{ key: "1", text: "westus" }]}
        estimateDetails={mockEstimateCompass}
        opportunityId={""}
        editMode={false}
        actionButtonName={"Create"}
      />
    );

    const modal = getByRole('dialog');
    expect(modal).toBeInTheDocument();

    const h2Element = getByRole('heading', { name: 'Create a Consumption Estimate' });
    expect(h2Element).toBeInTheDocument();

    const consInputFeild = getByLabelText('Name');
    expect(consInputFeild).toBeInTheDocument();

    const consDescFeild = getByLabelText('Description');
    expect(consDescFeild).toBeInTheDocument();

    const monthFeild = getByLabelText('Program Start Month');
    expect(monthFeild).toBeInTheDocument();

    const addButton = getByRole('button', { name: 'Create' });
    expect(addButton).toBeInTheDocument();


    const cancelButton = getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    const closeButton = getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
  });
}); 

describe("<createEstimatesFlyout /> should display publish details if there are publish record", () => {
  it("should render publish details to compass one", async () => {
    const { getByText, findByTestId } = renderWithProviders(
      <CreateEstimatesFlyout
        openFlyOut={true}
        handleOnDismiss={jest.fn()}
        parentContext={parentContext}
        handleUpdateConsumption={jest.fn()}
        regions={[{ key: "1", text: "westus" }]}
        estimateDetails={mockEstimateCompass}
        opportunityId={""}
        editMode={true}
        actionButtonName={"Update"}
      />
    );
    expect(
      await getByText("Last Published to Compass One:")
    ).toBeInTheDocument();
    let compassOneDiv = await findByTestId("publish_c1_flyer");
    expect(compassOneDiv).toBeInTheDocument();
    expect(compassOneDiv).toHaveTextContent(
      mockEstimateCompass.PublishRecords[0].publishedBy
    );
    expect(compassOneDiv).toHaveTextContent(
      formatDateAndTime(mockEstimateCompass.PublishRecords[0].publishedDate)
    );
  });
  it("should render publish details to MSX", async () => {
    const { getByText, findByTestId } = renderWithProviders(
      <CreateEstimatesFlyout
        openFlyOut={true}
        handleOnDismiss={jest.fn()}
        parentContext={parentContext}
        handleUpdateConsumption={jest.fn()}
        regions={[{ key: "1", text: "westus" }]}
        estimateDetails={mockEstimateMSX}
        opportunityId={""}
        editMode={true}
        actionButtonName={"Update"}
      />
    );
    expect(await getByText("Last Published to MSX:")).toBeInTheDocument();
    let compassOneDiv = await findByTestId("publish_msx_flyer");
    expect(compassOneDiv).toBeInTheDocument();
    expect(compassOneDiv).toHaveTextContent(
      mockEstimateCompass.PublishRecords[0].publishedBy
    );
    expect(compassOneDiv).toHaveTextContent(
      formatDateAndTime(mockEstimateCompass.PublishRecords[0].publishedDate)
    );
  });

  
});

describe("<createEstimatesFlyout /> In create estimate mode after entering the name it will enable the create button", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Create estimate flyout button is enabled when entering value against estimate name", async () => {
    const spy = jest.spyOn(httpUtils, "postConsumptionAPI");
    const handleApplyConsumption = jest.fn();

    spy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: "FD200426-5E12-423D-8676-B45E16D3FCDB",
      })
    );

    const { getByLabelText, getByRole } = renderWithProviders(
      <CreateEstimatesFlyout
        openFlyOut={true}
        handleOnDismiss={jest.fn()}
        parentContext={parentContext}
        handleApplyConsumption={handleApplyConsumption}
        regions={[{ key: "1", text: "westus" }]}
        estimateDetails={mockEstimateCompass}
        opportunityId={""}
        editMode={false}
        actionButtonName={"Create"}
      />
    );

    const estimateNameInput = getByLabelText("Name");
    fireEvent.change(estimateNameInput, { target: { value: "Estimate Name" } });
    const createBtn = getByRole("button", { name: "Create" });
    expect(createBtn).toBeEnabled();
  });

  it("Create estimate flyout button should be disabled if value is cleared.", async () => {
    const handleApplyConsumption = jest.fn();

    const { getByLabelText, getByRole } = renderWithProviders(
      <CreateEstimatesFlyout
        openFlyOut={true}
        handleOnDismiss={jest.fn()}
        parentContext={parentContext}
        handleApplyConsumption={handleApplyConsumption}
        regions={[{ key: "1", text: "westus" }]}
        opportunityId={""}
        editMode={false}
        actionButtonName={"Create"}
      />
    );

    const estimateNameInput = getByLabelText("Name");
    fireEvent.change(estimateNameInput, { target: { value: "Estimate Name" } });
    const createBtn = getByRole("button", { name: "Create" });
    
    await waitFor(() => {
      expect(createBtn).toBeEnabled();
    });

    act(() => {
      fireEvent.change(estimateNameInput, { target: { value: "" } });
    });
    
    act(() => {
      fireEvent.blur(estimateNameInput);
    });

    await waitFor(() => {
      expect(createBtn).toBeDisabled();
    });
  });

  it("Create estimate, estimate has been created.", async () => {
    const spy = jest.spyOn(httpUtils, "postConsumptionAPI");
    const handleApplyConsumption = jest.fn();

    spy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: "FD200426-5E12-423D-8676-B45E16D3FCDB",
      })
    );

    const { getByLabelText, getByRole } = renderWithProviders(
      <CreateEstimatesFlyout
        openFlyOut={true}
        handleOnDismiss={jest.fn()}
        parentContext={parentContext}
        handleApplyConsumption={handleApplyConsumption}
        regions={[{ key: "1", text: "westus" }]}
        estimateDetails={mockEstimateCompass}
        opportunityId={""}
        editMode={false}
        actionButtonName={"Create"}
      />
    );

    const estimateNameInput = getByLabelText("Name");
    fireEvent.change(estimateNameInput, { target: { value: "Estimate Name" } });
    const createBtn = getByRole("button", { name: "Create" });
    act(() => {
      fireEvent.click(createBtn);
    });

    await waitFor(() => {
      expect(handleApplyConsumption).toHaveBeenCalled();
    });
  });

  

  it("Create Estimate, should show an error message if failed to create estimate.", async () => {
    const spy = jest.spyOn(httpUtils, "postConsumptionAPI");
    const handleApplyConsumption = jest.fn();

    spy.mockImplementation(() => Promise.reject("URL Not found.."));

    const { getByLabelText, getByRole, getByText } = renderWithProviders(
      <CreateEstimatesFlyout
        openFlyOut={true}
        handleOnDismiss={jest.fn()}
        parentContext={parentContext}
        handleApplyConsumption={handleApplyConsumption}
        regions={[{ key: "1", text: "westus" }]}
        estimateDetails={mockEstimateCompass}
        opportunityId={""}
        editMode={false}
        actionButtonName={"Create"}
      />
    );

    const estimateNameInput = getByLabelText("Name");
    fireEvent.change(estimateNameInput, { target: { value: "Estimate Name" } });
    const createBtn = getByRole("button", { name: "Create" });
    act(() => {
      fireEvent.click(createBtn);
    });

    await waitFor(() => {
      expect(
        getByText("Something went wrong. Please try again later")
      ).toBeInTheDocument();
    });
  }); 
  
  
  it("While updating the estimate, update button will be enabled on value change", async () => {
    const spy = jest.spyOn(httpUtils, "putConsumptionAPI");
    const handleUpdateConsumption = jest.fn();

    const spyGet = jest.spyOn(httpUtils, "getConsumptionAPI");
    spyGet.mockImplementation(() => Promise.resolve({
      status: 200,
      data: {
       id: "resp.id",
       etag: "resp.etag"
      },
    }))

    spy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: "FD200426-5E12-423D-8676-B45E16D3FCDB",
      })
    );

    const {container,  getByLabelText, getByRole } = renderWithProviders(
      <CreateEstimatesFlyout
        openFlyOut={true}
        handleOnDismiss={jest.fn()}
        parentContext={parentContext}
        handleApplyConsumption={handleUpdateConsumption}
        handleUpdateConsumption={handleUpdateConsumption}
        regions={[{ key: "1", text: "westus" }]}
        estimateDetails={estimateDetailsMockForEdit}
        opportunityId={""}
        editMode={true}
        actionButtonName={"Update"}
      />
    );

    const estimateNameInput = getByLabelText("Name");
    const createBtn = getByRole("button", { name: "Update" });

    act(() => {
      fireEvent.change(estimateNameInput, { target: { value: "Small Text" } });
    });

    await waitFor(() => {
      expect(createBtn).toBeEnabled();
    });

    act(() => {
      fireEvent.click(createBtn);
    });

    await waitFor(() => {
      expect(handleUpdateConsumption).toHaveBeenCalled();
    });
  }); 
});
