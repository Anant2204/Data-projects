import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../../utils/customRender";
import { parentContext } from "../../../../../utils/testMockData";
import EventLoggingProvider from "../logging";
import { fireEvent, waitFor } from "@testing-library/react";

const mockTelemetryContext = {
  logEvent: jest.fn(),
};


const mockParentContext = {
  getTelemetryContext: () => mockTelemetryContext,
};

describe('EventLoggingProvider Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log a click event on a button', async () => {
    const { getByText } = renderWithProviders(
      <EventLoggingProvider parentContext={mockParentContext}>
        <button id="testButton" className="ms-Button">Click Me</button>
      </EventLoggingProvider>
    );

    const button = getByText('Click Me');
    fireEvent.click(button);

    await waitFor(async () => {

      expect(mockTelemetryContext.logEvent).toHaveBeenCalledWith(
        'User Click on ',
        {
          contextName: 'Consumption Portal',
          buttonName: '',
          buttonId: 'testButton',
          pageName: window.location.pathname,
        }
      );
    });

  });

  it('should log a keydown event on a button', async () => {
    const { getByText } = renderWithProviders(
      <EventLoggingProvider parentContext={mockParentContext}>
        <button id="testButton" className="ms-Button">Press Enter</button>
      </EventLoggingProvider>
    );

    const button = getByText('Press Enter');
    fireEvent.keyDown(button, { key: 'Enter', keyCode: 13 });

    await waitFor(async () => {

      expect(mockTelemetryContext.logEvent).toHaveBeenCalledWith(
        'User Keydown on ',
        {
          contextName: 'Consumption Portal',
          buttonName: '',
          buttonId: 'testButton',
          pageName: window.location.pathname,
        }
      );
    });

  });

  it('should log a keydown event on a button with a custom icon', () => {
    const { getByText } = renderWithProviders(
      <EventLoggingProvider parentContext={mockParentContext}>
        <button id="testId" className="ms-Button-icon">
          <span className="ms-Button-icon" data-icon-name="IconName" />
          Button with Icon
        </button>
      </EventLoggingProvider>
    );

    const button = getByText('Button with Icon');
    fireEvent.keyDown(button, { key: 'Space', keyCode: 32 });

    expect(mockTelemetryContext.logEvent).toHaveBeenCalledWith(
      'User Keydown on ',
      {
        contextName: 'Consumption Portal',
        buttonName: '',
        buttonId: 'testId',
        pageName: window.location.pathname,
      }
    );
  });

  it('should not log an event for a non-clickable element', () => {
    const { container } = renderWithProviders(
      <EventLoggingProvider parentContext={mockParentContext}>
        <div>Not a button</div>
      </EventLoggingProvider>
    );

    const nonButtonElement = container.querySelector('div');
    fireEvent.click(nonButtonElement);

    expect(mockTelemetryContext.logEvent).not.toHaveBeenCalled();
  });
});