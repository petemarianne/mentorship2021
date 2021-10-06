import React, { useEffect, useState } from 'react';
import './Profile.scss';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery
} from '@material-ui/core';
import { db } from '../../firebase';

const Profile = () => {
    const [adsData, setAdsData] = useState([]);
    const [loggedInUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')))

    const fetchAds = async () => {
        const adsCollection = await db.collection('dogAds').get();
        setAdsData(adsCollection.docs
            .map((doc) => {return doc.data();})
            .sort((item1, item2) => {return item2.date - item1.date;})
            .filter((item) => {
                if (item.sellerID === loggedInUser.id) {
                    return item;
                }
            })
        );
    };

    useEffect(() => {
        fetchAds();
    }, []);

    const screenSize = useMediaQuery('(min-width: 560px)');

    const columns = [
        { id: 'title', label: 'Title', minWidth: 50, align: 'center' },
        { id: 'publication-date', label: 'Publication date', minWidth: 130, align: 'center'},
        { id: 'sale-date', label: 'Sale date', minWidth: 130, align: 'center'},
        { id: 'closing-date', label: 'Closing date', minWidth: 130, align: 'center'},
        { id: 'status', label: 'Status', minWidth: 40, align: 'center'},
        { id: 'price', label: 'Price', minWidth: 80, align: 'center'},
        { id: 'action', label: 'Action', minWidth: 290, align: 'center'},
    ];

    return (
        <div className='profile-page'>
            {screenSize && (
                <div className='profile-info'>
                    <div className='avatar'><img src={loggedInUser.avatar} alt={'avatar'}/></div>
                    <div>
                        <div className='name'>{loggedInUser.name}</div>
                        <div className='phone'>Phone number: {loggedInUser.phone}</div>
                        <div className='email'>Email: {loggedInUser.email}</div>
                        <div className='date'>Date of registration: {new Date(loggedInUser.date.seconds * 1000).toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                    </div>
                </div>
            )}
            {!screenSize && (
                <div className='profile-info-mobile'>
                    <div className='avatar'><img src={loggedInUser.avatar} alt={'avatar'}/></div>
                    <div className='name'>{loggedInUser.name}</div>
                    <div className='phone'>Phone number: {loggedInUser.phone}</div>
                    <div className='email'>Email: {loggedInUser.email}</div>
                    <div className='date'>Date of registration: {new Date(loggedInUser.date.seconds * 1000).toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                </div>
            )}
            <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => {
                                return <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>{column.label}</TableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            adsData.map((row) => {
                                return (
                                    <TableRow role='checkbox' tabIndex={-1} key={row.id} >
                                        <TableCell size='medium' align='center'>{row.title}</TableCell>
                                        <TableCell size='medium' align='center'>
                                            {row.date.toDate().toLocaleString('default', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell size='medium' align='center'>
                                            {row.saleDate?.toDate().toLocaleString('default', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell size='medium' align='center'>
                                            {row.closingDate?.toDate().toLocaleString('default', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell size='medium' align='center'>{row.status}</TableCell>
                                        <TableCell size='medium' align='center'>{row.price}</TableCell>
                                        <TableCell size='medium' align='center'>
                                            {row.status === 'closed' ?
                                                <Button className='table-button' variant='contained' color='primary'>Open</Button> :
                                                row.status === 'active' ?
                                                    <>
                                                        <Button className='table-button' variant='contained' color='primary'>Sold</Button>
                                                        <Button className='table-button' variant='outlined' color='primary' style={{marginLeft: '15px'}}>Close</Button>
                                                    </> :
                                                    <></>
                                            }
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Profile;