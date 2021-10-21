import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';

test('Footer renders:', () => {
    render(<Footer />);
    expect(screen.getByText('© “Dog Shop”, 2021')).toBeInTheDocument();
    expect(screen.getByText('Piotr Piatrovich')).toBeInTheDocument();
    expect(screen.getByText('ppiatrovich@exadel.com')).toBeInTheDocument();
    expect(screen.getByText('+375-29-890-67-58')).toBeInTheDocument();
})