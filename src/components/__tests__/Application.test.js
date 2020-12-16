import React from "react";

import axios from "axios";
import {render,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  prettyDOM,
  queryByText,
  queryByAltText,
  cleanup} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);


describe("Appointment",()=>{
  
  
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application/>);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Chad Takahashi")).toBeInTheDocument();
  });

  // it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  //   const { container,debug } = render(<Application/>);

  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  
  //   const appointments = getAllByTestId(container, "appointment");
   
  //   const appointment = getAllByTestId(container, "appointment")[0];
  
  // fireEvent.click(getByAltText(appointment, "Add"));
  //  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  //  target: { value: "Lydia Miller-Jones" }
    
  //  });
  // fireEvent.click(getByAltText(appointment, "Susan Reynolds"));

  //  fireEvent.click(getByText(appointment, "Save"));
  //  console.log(prettyDOM(appointment));
  //  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  //  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  //  debug();
  //  const day = getAllByTestId(container, "day").find(day =>
  //   queryByText(day, "Monday")
  // );

  // expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  // });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));


    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();


    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    console.log(prettyDOM(appointment));

    await waitForElement(() => queryByAltText(appointment, "Add"))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday"));

      expect(getByText(day, "1 spots remaining")).toBeInTheDocument();
    });
  
    
});