import React from "react";
import {render,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  prettyDOM,queryByText} from "@testing-library/react";
import Application from "components/Application"



describe("Appointment",()=>{
  
  
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application/>);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Chad Takahashi")).toBeInTheDocument();
  });
  
   
  
  


})
