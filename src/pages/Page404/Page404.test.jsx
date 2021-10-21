import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Page404 from './Page404';
import { Route, MemoryRouter } from 'react-router-dom';
import React from "react";

test('Page 404 renders:', () => {
    render(
        <MemoryRouter initialEntries={['/pathname']}>
            <Route
                path='*'
                render={() => <Page404 />}/>
        </MemoryRouter>
    );
    screen.getAllByText('4').map((item, index) => {
        expect(item).toBeInTheDocument();
        expect(index).toBeLessThanOrEqual(1);
    })
    expect(screen.getByText('Oops, this page')).toBeInTheDocument();
    expect(screen.getByText('/pathname')).toBeInTheDocument();
    expect(screen.getByText('was not found!')).toBeInTheDocument();
    expect(screen.getByText('Either something went wrong or the page doesn\'t exist anymore.')).toBeInTheDocument();
    expect(screen.getByText('Go Home')).toBeInTheDocument();
});