import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Home from '../../app/page';

// Mocking next/image since it's not available in the test environment
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe('Home component', () => {
  it('renders the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Answer 93% of customer support tickets autonomously');
  });

  it('renders the Maven logo', () => {
    render(<Home />);
    const logo = screen.getByAltText('Maven logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the "Get Started" button', () => {
    render(<Home />);
    const getStartedButton = screen.getByRole('link', { name: /app studio/i });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveAttribute('href', 'https://developers.mavenagi.com');
  });

  it('renders the "Learn More" button', () => {
    render(<Home />);
    const learnMoreButton = screen.getAllByRole('link', { name: /Documentation/i })[0];
    expect(learnMoreButton).toBeInTheDocument();
    expect(learnMoreButton).toHaveAttribute('href', 'https://docs.mavenagi.com');
  });
});
