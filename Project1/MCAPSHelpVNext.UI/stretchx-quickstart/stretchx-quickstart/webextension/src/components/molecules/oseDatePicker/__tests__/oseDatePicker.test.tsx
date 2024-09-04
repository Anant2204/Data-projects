import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { OseDatePicker } from "../oseDatePicker";
import { fireEvent, queryByText } from "@testing-library/react";

describe("Date Picker", () => {
    it("should render", async () => {
      const { getByLabelText } = renderWithProviders(
        <OseDatePicker
            label={"Start Month"}
            name="startMonths"
            date={new Date(2023, 5)}
            setDate={jest.fn()}
            startMonth={new Date(2023, 5)}
        />
      );
      expect(getByLabelText(/start month/i)).toBeInTheDocument();
    });

    it("should render successfully if date is passed undefined", async () => {
        const { getByLabelText } = renderWithProviders(
          <OseDatePicker
              label={"Start Month"}
              name="startMonths"
              date={undefined}
              setDate={jest.fn()}
              startMonth={new Date(2023, 5)}
          />
        );
        expect(getByLabelText(/start month/i)).toBeInTheDocument();
      });

      it("should open datepicker box when combobox clicked", async () => {
        const { queryByText, getByLabelText } = renderWithProviders(
          <OseDatePicker
              label={"Start Month"}
              name="startMonths"
              date={new Date(2023, 7)}
              setDate={jest.fn()}
              startMonth={new Date(2023, 5)}
          />
        );
        const combobox = getByLabelText(/start month/i)
        expect(getByLabelText(/start month/i)).toBeInTheDocument()
        expect(queryByText(/Go to today/i)).toBeNull()
        fireEvent.click(combobox)
        expect(queryByText(/Go to today/i)).toBeInTheDocument()
      });

      it("should select the month and year when typed", async () => {
        const onSelectDate = jest.fn();
        const { getByLabelText, getByRole, getAllByRole } = renderWithProviders(
          <OseDatePicker
              label={"Start Month"}
              name="startMonths"
              date={new Date(2023, 7)}
              setDate={onSelectDate}
              startMonth={new Date(2023, 5)}
          />
        );
        const combobox : any = getByLabelText(/start month/i)
        expect(getByLabelText(/start month/i)).toBeInTheDocument()
        fireEvent.click(combobox);

        const dialogBox = await getByRole('dialog');
        expect(dialogBox).toBeInTheDocument();

        const gridCells = await getAllByRole('gridcell');
        fireEvent.click(gridCells[10]);
         
        expect(onSelectDate).toHaveBeenCalled();
      });

      it("should select the month and year when typed", async () => {
        const onSelectDate = jest.fn();
        const { getByLabelText, getByRole, getAllByRole } = renderWithProviders(
          <OseDatePicker
              label={"Start Month"}
              name="startMonths"
              date={new Date(2023, 7)}
              setDate={onSelectDate}
              startMonth={new Date(2023, 5)}
          />
        );
        const inputBox : any = getByLabelText(/start month/i)
        fireEvent.change(inputBox, { target: { value : '12 2023'}});
        fireEvent.blur(inputBox);
        expect(inputBox).toHaveValue('Dec 2023');
      });
  });
