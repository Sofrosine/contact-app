import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '../index';

describe('Button component', () => {
  test('renders button correctly', () => {
    render(<Button>Hello</Button>);
    const button = screen.getByText('Hello');
    expect(button).toBeInTheDocument();
  });

  test('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies loading class when loading prop is true', () => {
    render(<Button loading>Loading...</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('flex justify-center');
  });

  test('disables button when disabled prop is true', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
