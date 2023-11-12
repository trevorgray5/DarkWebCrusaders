import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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