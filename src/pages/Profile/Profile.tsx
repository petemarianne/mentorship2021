import React, { useContext, useEffect, useState } from 'react';
import './Profile.scss';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { useFetchError, useScreenSize } from '../../hooks';
import { Archive, Unarchive } from '@material-ui/icons';
import SellIcon from '@mui/icons-material/Sell';
import { useParams } from 'react-router-dom';
import { Ad,  User } from '../../interfaces';
import { AuthContext } from '../../contexts/auth-context';
import { useErrorHandler } from 'react-error-boundary';

interface ProfileProps {
    myProfile?: boolean,
}

interface Column {
    id: string,
    label: string,
    minWidth: number,
    align: 'center' | 'left' | 'right' | 'justify' | 'inherit' | undefined,
}

export const Profile: React.FC<ProfileProps> = (props): JSX.Element => {
    const [adsData, setAdsData] = useState<Ad[]>([]);
    const [user, setUser] = useState<User>({
        avatar: '',
        date: new Date,
        email: '',
        id: '',
        name: '',
        phone: '',
    });
    const { id } = useParams<{id: string}>();
    const [rerender, setRerender] = useState(0);
    const [page, setPage] = useState<number>(0);

    const { sellerID, token } = useContext(AuthContext);

    useEffect(() => {
        const userPromise = props.myProfile ? fetch(`api/users/${sellerID}`) : fetch(`api/users/${id}`);
        userPromise.then(response => response.json()).then((data) => {
            setUser(data);
            return fetch(`api/ads?sellerID=${data.id}`);
        }).then(response => response.json()).then(data => setAdsData(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rerender, sellerID]);

    const {desktop} = useScreenSize();

    const {request, error} = useFetchError();
    useErrorHandler(error)

    const columns: Column[] = [
        { id: 'title', label: 'Title', minWidth: 50, align: 'center' },
        { id: 'publication-date', label: 'Publication date', minWidth: 50, align: 'center'},
        { id: 'sale-date', label: 'Sale date', minWidth: 50, align: 'center'},
        { id: 'closing-date', label: 'Closing date', minWidth: 50, align: 'center'},
        { id: 'status', label: 'Status', minWidth: 40, align: 'center'},
        { id: 'price', label: 'Price', minWidth: 40, align: 'center'},
    ];

    if (props.myProfile) {
        columns.push({ id: 'action', label: 'Action', minWidth: 80, align: 'center'});
    }

    const dateCell = (date: Date | undefined): JSX.Element => {
        return date ?
            <TableCell size='medium' align='center'>
                {new Date(date).toLocaleString('default', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })}
            </TableCell> :
            <TableCell/>;
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number): void => {
        setPage(newPage);
    };

    return (
        <div className='profile-page'>
            {desktop && (
                <div className='profile-info'>
                    <div className='avatar'><img src={user.avatar} alt='avatar'/></div>
                    <div>
                        <div className='name'>{user.name}</div>
                        <div className='phone'>Phone number: {user.phone}</div>
                        <div className='email'>Email: {user.email}</div>
                        <div className='date'>
                            Date of registration: {new Date(user.date).toLocaleString('default', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'})}
                        </div>
                    </div>
                </div>
            )}
            {!desktop && (
                <div className='profile-info-mobile'>
                    <div className='avatar'><img src={user.avatar} alt='avatar'/></div>
                    <div className='name'>{user.name}</div>
                    <div className='phone'>Phone number: {user.phone}</div>
                    <div className='email'>Email: {user.email}</div>
                    <div className='date'>Date of registration: {new Date(user.date).toLocaleString('default', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'})}
                    </div>
                </div>
            )}
            <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => {
                                return (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            adsData.slice(page * 5, page * 5 + 5).map((row) => {
                                return (
                                    <TableRow role='checkbox' tabIndex={-1} key={row._id}>
                                        <TableCell size='medium' align='center'>{row.title}</TableCell>
                                        {dateCell(row.date)}
                                        {dateCell(row.saleDate)}
                                        {dateCell(row.closingDate)}
                                        <TableCell size='medium' align='center'>{row.status}</TableCell>
                                        <TableCell size='medium' align='center'>{row.price}</TableCell>
                                        {props.myProfile ?
                                            <TableCell size='medium' align='center'>
                                                {row.status === 'closed' ?
                                                    <IconButton
                                                        aria-label='lose'
                                                        size='small'
                                                        color='primary'
                                                        onClick={() => {
                                                            if (token) {
                                                                request(`/api/ads/${row._id}`, {
                                                                    method: 'PUT',
                                                                    body: JSON.stringify({status: 'active'}),
                                                                    headers: {
                                                                        'Content-Type': 'application/json',
                                                                        'authorization': token
                                                                    }
                                                                }).then(() => {
                                                                    setRerender(prevState => prevState + 1);
                                                                });
                                                            }
                                                        }}
                                                    >
                                                        <Unarchive fontSize='small'/>
                                                    </IconButton> :
                                                    row.status === 'active' ?
                                                        <>
                                                            <IconButton
                                                                aria-label='lose'
                                                                size='small'
                                                                color='primary'
                                                                onClick={() => {
                                                                    if (token) {
                                                                        request(`/api/ads/${row._id}`, {
                                                                            method: 'PUT',
                                                                            body: JSON.stringify({status: 'sold'}),
                                                                            headers: {
                                                                                'Content-Type': 'application/json',
                                                                                'authorization': token
                                                                            }
                                                                        }).then(() => {
                                                                            setRerender(prevState => prevState + 1);
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                <SellIcon fontSize='small'/>
                                                            </IconButton>
                                                            <IconButton
                                                                aria-label='lose'
                                                                size='small'
                                                                color='primary'
                                                                onClick={() => {
                                                                    if (token) {
                                                                        request(`/api/ads/${row._id}`, {
                                                                            method: 'PUT',
                                                                            body: JSON.stringify({status: 'closed'}),
                                                                            headers: {
                                                                                'Content-Type': 'application/json',
                                                                                'authorization': token
                                                                            }
                                                                        }).then(() => {
                                                                            setRerender(prevState => prevState + 1);
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                <Archive fontSize='small'/>
                                                            </IconButton>
                                                        </> : null
                                                }
                                            </TableCell> : null
                                        }
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5]}
                component='div'
                count={adsData.length}
                page={page}
                rowsPerPage={5}
                onPageChange={handleChangePage}
                className='table-pagination'
            />
        </div>
    );
};
