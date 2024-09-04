import React from "react";
import "@testing-library/jest-dom";
import  { OseGroupCards }  from "../oseGroupCards";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext } from "../../../../utils/testMockData";

const arr = [1,2,3,4];
  
const onActionClick = jest.fn();

describe("<OseGroupCards />", () => {
  it("should render oseGroupCards Components", () => {
    const { getByTestId } = renderWithProviders(
      <OseGroupCards
        parentContext={parentContext}
        groupName={'Group 1'}
        listData={arr}
        render={(list) => {
          return (
            <p>{list}</p>
          )
        }

        }
      />
    );

    const groupElements = getByTestId('group-name');
    expect(groupElements).toHaveTextContent('Group 1');
    
  });
});
