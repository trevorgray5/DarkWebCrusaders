import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

//Add Button click Test
describe('AddButton component', () => {
  it('Button click triggers click event', () => {
    // Arrange
    const mockOnClick = jest.fn();
    render(<App />);
    let addButton = screen.getByText("Add Task");
    addButton.onclick = mockOnClick;
    // Act
    fireEvent.click(addButton);

    // Assert
    expect(mockOnClick).toHaveBeenCalled();
  });
});

describe('DeleteButton Component', () => {
  it('Delete click triggers click event', async () => {
    // Arrange
    const mockOnClick = jest.fn();
    render(<App/>);
    //wait for the components to be rendered from api
    let deleteButton = screen.getByText("Delete");
    deleteButton.onclick = mockOnClick;

    // Act
    fireEvent.click(deleteButton);

    // Assert
    expect(mockOnClick).toHaveBeenCalled();
  });
});

describe('CompleteButton component', () => {
  it('Complete click triggers click even', async () => {
    // Arrange
    const mockOnClick = jest.fn();
    render(<App/>);
    //wait for the components to be rendered from api
    let CompleteButton = screen.getByText("Complete");
    CompleteButton.onclick = mockOnClick;

    // Act
    fireEvent.click(CompleteButton);

    // Assert
    expect(mockOnClick).toHaveBeenCalled();
  });
});

// Edit Button component Test
describe('EditButton component', () => {
  it('Edit click triggers click event', async () => {
    // Arrange
    const mockOnClick = jest.fn();
    render(<App />);
    await screen.findByText("Edit"); // Wait for the Edit button to be rendered

    // Act
    fireEvent.click(screen.getByText("Edit"));

    // Assert
    expect(mockOnClick).toHaveBeenCalled(); // If the Edit button should trigger some function, make sure to test that function is called.
  });
});

// Save Button component Test
describe('SaveButton component', () => {
  it('Save click triggers click event', async () => {
    // Arrange
    const mockOnClick = jest.fn();
    render(<App />);
    await screen.findByText("Save"); // Wait for the Save button to be rendered

    // Act
    fireEvent.click(screen.getByText("Save"));

    // Assert
    expect(mockOnClick).toHaveBeenCalled(); 
  });
});
