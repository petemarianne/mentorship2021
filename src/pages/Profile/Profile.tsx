import React, { useContext, useEffect, useState } from 'react';
import './Profile.scss';
import {
    IconButton,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@material-ui/core';
import { useFetchError, useScreenSize } from '../../hooks';
import { Archive, Unarchive, Edit } from '@material-ui/icons';
import SellIcon from '@mui/icons-material/Sell';
import { Link, useParams } from 'react-router-dom';
import { Ad,  User } from '../../interfaces';
import { AuthContext } from '../../contexts';
import { useErrorHandler } from 'react-error-boundary';
import AdFormModal from '../../components/AdFormModal/AdFormModal';
import Registration from '../../components/Header/LoginOrRegisterModal/Registration/Registration';

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
    const [openEditAd, setOpenEditAd] = useState<boolean>(false);
    const [openEditUser, setOpenEditUser] = useState<boolean>(false);
    const [adToEditID, setAdToEditID] = useState<string>('');

    const { sellerID, token } = useContext(AuthContext);

    useEffect(() => {
        const userPromise = props.myProfile ? fetch(`api/users/${sellerID}`) : fetch(`api/users/${id}`);
        userPromise.then(response => response.json()).then((data) => {
            setUser(data);
            return fetch(`api/ads?sellerID=${data.id}`);
        }).then(response => response.json()).then(data => setAdsData(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rerender, sellerID, openEditUser, openEditAd]);

    const {desktop} = useScreenSize();

    const {request, error} = useFetchError();
    useErrorHandler(error)

    const columns: Column[] = [
        { id: 'title', label: 'Title', minWidth: 50, align: 'center' },
        { id: 'publication-date', label: 'Last edit date', minWidth: 50, align: 'center'},
        { id: 'sale-date', label: 'Sale date', minWidth: 50, align: 'center'},
        { id: 'closing-date', label: 'Closing date', minWidth: 50, align: 'center'},
        { id: 'status', label: 'Status', minWidth: 40, align: 'center'},
        { id: 'price', label: 'Price', minWidth: 40, align: 'center'},
    ];

    if (props.myProfile) {
        columns.unshift({id: 'edit', label: 'Edit', minWidth: 10, align: 'center'});
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
                        <div className='name-edit-button'>
                            <div className='name'>{user.name}</div>
                            {props.myProfile ?
                                <IconButton
                                    aria-label='lose'
                                    size='small'
                                    color='primary'
                                    className='edit-button'
                                    onClick={() => setOpenEditUser(true)}
                                >
                                    <Edit fontSize='small'/>
                                </IconButton>
                                : null
                            }
                        </div>
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
                    <div className='name-edit-button'>
                        <div className='name'>{user.name}</div>
                        {props.myProfile ?
                            <IconButton
                                aria-label='lose'
                                size='small'
                                color='primary'
                                className='edit-button'
                                onClick={() => setOpenEditUser(true)}
                            >
                                <Edit fontSize='small'/>
                            </IconButton>
                            : null
                        }
                    </div>
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
                                        {props.myProfile && row.status === 'active' ?
                                            <TableCell size='medium' align='center'>
                                                <IconButton
                                                    aria-label='lose'
                                                    size='small'
                                                    color='primary'
                                                    onClick={() => {
                                                        setAdToEditID(row._id);
                                                        setOpenEditAd(true);
                                                    }}>
                                                    <Edit fontSize='small'/>
                                                </IconButton>
                                            </TableCell>
                                            : null
                                        }
                                        {props.myProfile && row.status !== 'active' ? <TableCell size='medium' align='center' /> : null}
                                        <TableCell size='medium' align='center' style={{padding: '5px'}}>
                                            <Link to={`/ad${row._id}`} style={{ textDecoration: 'none', color: 'black'}}>
                                                {row.title}
                                            </Link>
                                        </TableCell>
                                        {dateCell(row.date)}
                                        {dateCell(row.saleDate)}
                                        {dateCell(row.closingDate)}
                                        <TableCell size='medium' align='center'>{row.status}</TableCell>
                                        <TableCell size='medium' align='center'>{row.price}</TableCell>
                                        {props.myProfile ?
                                            <TableCell size='medium' align='center'>
                                                <IconButton
                                                    aria-label='lose'
                                                    size='small'
                                                    color='primary'
                                                    disabled={row.status !== 'closed'}
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
                                                    <Unarchive fontSize='small' color={row.status !== 'closed' ? 'disabled' : undefined}/>
                                                </IconButton>
                                                <IconButton
                                                    aria-label='lose'
                                                    size='small'
                                                    color='primary'
                                                    disabled={row.status !== 'active'}
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
                                                    <SellIcon fontSize='small' color={row.status !== 'active' ? 'disabled' : undefined}/>
                                                </IconButton>
                                                <IconButton
                                                    aria-label='lose'
                                                    size='small'
                                                    color='primary'
                                                    disabled={row.status !== 'active'}
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
                                                    <Archive fontSize='small' color={row.status !== 'active' ? 'disabled' : undefined}/>
                                                </IconButton>
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
            {props.myProfile ?
                <>
                    <Modal
                        open={openEditAd}
                        onClose={() => {setOpenEditAd(false)}}
                        aria-labelledby='simple-modal-title'
                        aria-describedby='simple-modal-description'
                        className='modal'>
                        <div className='modal-content'>
                            <AdFormModal handleClose={() => {setOpenEditAd(false)}} adToEditID={adToEditID}/>
                        </div>
                    </Modal>
                    <Modal
                        open={openEditUser}
                        onClose={() => {setOpenEditUser(false)}}
                        aria-labelledby='simple-modal-title'
                        aria-describedby='simple-modal-description'
                        className='modal'>
                        <div className='modal-content'>
                            <Registration onCloseModal={() => {setOpenEditUser(false)}} userData={user}/>
                        </div>
                    </Modal>
                </>
            : null}
        </div>
    );
};
