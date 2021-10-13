import React, { useEffect, useState } from 'react';
import './Profile.scss';
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@material-ui/core';
import { db } from '../../firebase';
import { useScreenSize } from '../../hooks/useScreenSize';
import { toDate } from '../../utils/toDate';
import { Archive, Unarchive } from '@material-ui/icons';
import SellIcon from '@mui/icons-material/Sell';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const Profile = ({ myProfile }) => {
    const [adsData, setAdsData] = useState([]);
    const [user, setUser] = useState({});
    const [userDate, setUserDate] = useState(new Date());
    const { id } = useParams();
    const [rerender, setRerender] = useState(0);
    const [page, setPage] = React.useState(0);

    const fetchAds = async (id) => {
        const adsCollection = await db.collection('dogAds').where('sellerID','==', id).get();
        const ads = adsCollection.docs
            .map((doc) => {return {...doc.data(), docID: doc.id};})
            .sort((item1, item2) => {return item2.date - item1.date;});
        return Promise.resolve(ads);
    };

    const fetchUser = async () => {
        const usersCollection = await db.collection('users').where('id', '==', myProfile ? 'seller1' : `seller${id}`).get();
        const user = usersCollection.docs
            .map((doc) => {return doc.data();})[0];
        return Promise.resolve(user);
    }

    useEffect(() => {
        fetchUser().then((response1) => {
            setUser(response1);
            setUserDate(toDate(response1.date))
            fetchAds(response1.id).then((response2) => {
                setAdsData(response2);
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rerender]);

    const {desktop} = useScreenSize();

    const columns = [
        { id: 'title', label: 'Title', minWidth: 50, align: 'center' },
        { id: 'publication-date', label: 'Publication date', minWidth: 50, align: 'center'},
        { id: 'sale-date', label: 'Sale date', minWidth: 50, align: 'center'},
        { id: 'closing-date', label: 'Closing date', minWidth: 50, align: 'center'},
        { id: 'status', label: 'Status', minWidth: 40, align: 'center'},
        { id: 'price', label: 'Price', minWidth: 40, align: 'center'},
    ];

    if (myProfile) {
        columns.push({ id: 'action', label: 'Action', minWidth: 80, align: 'center'});
    }

    const dateCell = (date) => {
        return (
            <TableCell size='medium' align='center'>
                {date?.toDate().toLocaleString('default', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })}
            </TableCell>
        )
    }

    const activate = async (ad) => {
        await db.collection('dogAds').doc(ad.docID).set(
            {
                ...ad,
                status: 'active',
                closingDate: null
            }
        );
        await db.collection('users').doc(user.name).set({
            ...user,
            activeAds: user.activeAds + 1,
        });
    }

    const close = async (ad) => {
        await db.collection('dogAds').doc(ad.docID).set({
            ...ad,
            status: 'closed',
            closingDate: new Date()
        });
        await db.collection('users').doc(user.name).set({
            ...user,
            activeAds: user.activeAds - 1,
        });
    }

    const sell = async (ad) => {
        await db.collection('dogAds').doc(ad.docID).set({
            ...ad,
            status: 'sold',
            saleDate: new Date()
        });
        await db.collection('users').doc(user.name).set({
            ...user,
            activeAds: user.activeAds - 1,
        });
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div className='profile-page'>
            {desktop && (
                <div className='profile-info'>
                    <div className='avatar'><img src={user.avatar} alt={'avatar'}/></div>
                    <div>
                        <div className='name'>{user.name}</div>
                        <div className='phone'>Phone number: {user.phone}</div>
                        <div className='email'>Email: {user.email}</div>
                        <div className='date'>
                            Date of registration: {userDate.toLocaleString('default', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'})}
                        </div>
                    </div>
                </div>
            )}
            {!desktop && (
                <div className='profile-info-mobile'>
                    <div className='avatar'><img src={user.avatar} alt={'avatar'}/></div>
                    <div className='name'>{user.name}</div>
                    <div className='phone'>Phone number: {user.phone}</div>
                    <div className='email'>Email: {user.email}</div>
                    <div className='date'>Date of registration: {userDate.toLocaleString('default', {
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
                                    <TableRow role='checkbox' tabIndex={-1} key={row.id}>
                                        <TableCell size='medium' align='center'>{row.title}</TableCell>
                                        {dateCell(row.date)}
                                        {dateCell(row.saleDate)}
                                        {dateCell(row.closingDate)}
                                        <TableCell size='medium' align='center'>{row.status}</TableCell>
                                        <TableCell size='medium' align='center'>{row.price}</TableCell>
                                        {myProfile ?
                                            <TableCell size='medium' align='center'>
                                                {row.status === 'closed' ?
                                                    <IconButton
                                                        aria-label='lose'
                                                        size='small'
                                                        color='primary'
                                                        onClick={() => {
                                                            activate(row).then(() => setRerender(cur => {
                                                                setRerender(cur + 1)
                                                            }));
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
                                                                    sell(row).then(() => setRerender(cur => {
                                                                        setRerender(cur + 1)
                                                                    }));
                                                                }}
                                                            >
                                                                <SellIcon fontSize='small'/>
                                                            </IconButton>
                                                            <IconButton
                                                                aria-label='lose'
                                                                size='small'
                                                                color='primary'
                                                                onClick={() => {
                                                                    close(row).then(() => setRerender(cur => {
                                                                        setRerender(cur + 1)
                                                                    }));
                                                                }}
                                                            >
                                                                <Archive fontSize='small'/>
                                                            </IconButton>
                                                        </> : <></>
                                                }
                                            </TableCell> : <></>
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

Profile.propTypes = {
    myProfile: PropTypes.bool,
};

export default Profile;
