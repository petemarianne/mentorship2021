import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Filter from './Filter';
import userEvent from '@testing-library/user-event';
import { Divider } from '@material-ui/core';
import React from 'react';
import {FilterContext} from "../../contexts/filter-context";

describe('Filter component:', () => {

    const handleDrawer = jest.fn();
    const setFilterState = jest.fn();

    test('Desktop component renders', () => {
        render(<Filter />);
    });

    test('Mobile component renders', () => {
        render(
            <Filter
                handleDrawer={handleDrawer}
                Divider={<Divider style={{backgroundColor: 'transparent'}}/>}
                isMenu={true}
            />
        );
    });

    test('Text renders', () => {
        render(<Filter />);
        expect(screen.getByText('Country')).toBeInTheDocument();
        expect(screen.getByText('City')).toBeInTheDocument();
        expect(screen.getByText('Price')).toBeInTheDocument();
        expect(screen.getByText('Sort by')).toBeInTheDocument();
        expect(screen.getByText('Reset filters')).toBeInTheDocument();
    });

    test('Desktop button renders', () => {
        render(<Filter />);
        expect(screen.getByText('Show result')).toBeInTheDocument();
    });

    test('Mobile button renders', () => {
        render(
            <Filter
                handleDrawer={handleDrawer}
                Divider={<Divider style={{backgroundColor: 'transparent'}}/>}
                isMenu={true}
            />
        );
        expect(screen.getByText('Show result')).toBeInTheDocument();
    });

    test('Dividers render', () => {
        render(
            <Filter
                handleDrawer={handleDrawer}
                Divider={<Divider style={{backgroundColor: 'transparent'}}  data-testid='divider'/>}
                isMenu={true}
            />
        );
        screen.getAllByTestId('divider').map((item, index) => {
            expect(item).toBeInTheDocument();
            expect(index).toBeLessThanOrEqual(5);
        });
    });

    test('Inputs render in desktop', () => {
        render(<Filter />);
        screen.getAllByTestId('input').map((item, index) => {
            expect(item).toBeInTheDocument();
            expect(index).toBeLessThanOrEqual(4);
        });
    });

    test('Inputs render in mobile', () => {
        render(
            <Filter
                handleDrawer={handleDrawer}
                Divider={<Divider style={{backgroundColor: 'transparent'}}  data-testid='divider'/>}
                isMenu={true}
            />
        );
        screen.getAllByTestId('input').map((item, index) => {
            expect(item).toBeInTheDocument();
            expect(index).toBeLessThanOrEqual(4);
        });
    });

    test('Select renders', () => {
        render(<Filter />);
        const select = screen.getByTestId('select');
        expect(select).toBeInTheDocument();
        for (let i = 1; i <= 4; i++) {
            expect(screen.getByTestId(`val${i}`)).toBeInTheDocument();
        }
        expect(select).toHaveValue('dateDown');
        userEvent.selectOptions(select, ['priceDown']);
        expect(select).toHaveValue('priceDown');
    });

    test('Handle drawer', () => {
        render(
            <Filter
                handleDrawer={handleDrawer}
                Divider={<Divider style={{backgroundColor: 'transparent'}}  data-testid='divider'/>}
                isMenu={true}
            />
        );
        userEvent.click(screen.getByText('Show result'));
        expect(handleDrawer).toBeCalled();
        userEvent.click(screen.getByText('Reset filters'));
        expect(handleDrawer).toBeCalled();
    });

    test('Set filter', () => {
        render(
            <FilterContext.Provider value={{filter: {}, setFilterState}}>
                <Filter />
            </FilterContext.Provider>
        )
        userEvent.click(screen.getByText('Show result'));
        expect(setFilterState).toBeCalled();
        screen.getAllByTestId('input').map((item) => {
            fireEvent.keyDown(item, {key: 'Enter', code: 'Enter', charCode: 13})
            expect(setFilterState).toBeCalled();
        });
    })
});
