import React, {FormEvent, useState} from 'react';
import { Button, InputBase } from '@material-ui/core';

const Registration: React.FC = (): JSX.Element => {
    const [fields, setFields] = useState<{
        email: string,
        password: string,
        repeatedPassword: string,
        name: string,
        phone: string,
        picture: File | null,
    }>({
        email: '',
        password: '',
        repeatedPassword: '',
        name: '',
        phone: '',
        picture: null,
    });
    const [drag, setDrag] = useState<boolean>(false);
    const [uploaded, setUploaded] = useState<boolean>(false);
    const [file, setFile] = useState<File>();
    const [validation, setValidation] = useState<{
        email: boolean,
        repeatedPassword: boolean,
        phone: boolean,
        allFields: boolean
    }>({
        email: false,
        repeatedPassword: false,
        phone: false,
        allFields: false
    });

    const dragStartHandle = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandle = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        setDrag(false);
    }

    const onDropHandler = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFile(file);
        setDrag(false);
        setUploaded(true);
    }

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setFile(file);
            setDrag(false);
            setUploaded(true);
        }
    };

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, email: event.target.value}));
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, password: event.target.value}));
    };

    const handleRepeatedPassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, repeatedPassword: event.target.value}));
    };

    const handleName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, name: event.target.value}));
    };

    const handlePhone = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, phone: event.target.value}));
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const mailFormat = /^([a-zA-Z0-9._]+)@([a-zA-Z0-9._]+)\.([a-z]{2,3})$/;
        if (!mailFormat.test(fields.email) && fields.email !== '') {
            setValidation(prevState => ({...prevState, email: true}));
        }
        else {
            setValidation(prevState => ({...prevState, email: false}));
        }
        if (fields.password !== fields.repeatedPassword) {
            setValidation(prevState => ({...prevState, repeatedPassword: true}));
        } else {
            setValidation(prevState => ({...prevState, repeatedPassword: false}));
        }
        const phoneFormat = /^\+\d+$/;
        if (!phoneFormat.test(fields.phone)  && fields.phone !== '') {
            setValidation(prevState => ({...prevState, phone: true}));
        } else {
            setValidation(prevState => ({...prevState, phone: false}));
        }
        if (!(validation.email && validation.repeatedPassword && validation.phone)) {
            for (let key in fields) {
                // @ts-ignore
                if (fields[key] === '') {
                    setValidation(prevState => ({...prevState, allFields: true}));
                    break;
                }
                setValidation(prevState => ({...prevState, allFields: false}));
            }
        }
    };

    const uploadedJSX =
        <>
            <div>Uploaded!</div>
            <div className='file-name'>{file?.name}</div>
            <Button variant='contained' color='primary' component='label' className='re-upload-file-button'>
                Upload Another File
                <input data-testid='upload-another-file' type='file' onChange={onFileChange} hidden/>
            </Button>
        </>;

    const dragJSX =
        <>
            <div>Drag a picture!</div>
            <div>or</div>
            <Button variant='contained' color='primary' component='label' className='upload-file-button' data-testid='upload-button'>
                Upload File
                <input type='file' onChange={onFileChange} hidden/>
            </Button>
        </>;

    const dropJSX = <div>Drop a picture!</div>;

    return (
        <form className='login-wrapper' onSubmit={onSubmit}>
            <div className='label'>Email</div>
            <div className={validation.email ? 'input validate' : 'input'}>
                <InputBase value={fields.email} onChange={handleEmail} fullWidth/>
            </div>
            {validation.email ? <div className='validation-registration'>Incorrect email!</div> : null}
            <div className='label'>Password</div>
            <div className={validation.repeatedPassword ? 'input validate' : 'input'}>
                <InputBase type='password' value={fields.password} onChange={handlePassword} fullWidth/>
            </div>
            <div className='label'>Repeat password</div>
            <div className={validation.repeatedPassword ? 'input validate' : 'input'}>
                <InputBase type='password' value={fields.repeatedPassword} onChange={handleRepeatedPassword} fullWidth/>
            </div>
            {validation.repeatedPassword ? <div className='validation-registration'>Password don't match!</div> : null}
            <div className='label'>Name</div>
            <div className='input'>
                <InputBase value={fields.name} onChange={handleName} fullWidth/>
            </div>
            <div className='label'>Phone number</div>
            <div className={validation.phone ? 'input validate' : 'input'}>
                <InputBase value={fields.phone} onChange={handlePhone} fullWidth/>
            </div>
            {validation.phone ? <div className='validation-registration'>Incorrect phone number!</div> : null}
            <div onDragStart={dragStartHandle}
                 onDragLeave={dragLeaveHandle}
                 onDragOver={dragStartHandle}
                 onDrop={drag ? onDropHandler : undefined}
                 className='drag-and-drop-wrapper'
                 style={drag ? {padding: '55px 0'} : undefined}
                 data-testid='drug-and-drop-area'
            >
                {drag ?  dropJSX : uploaded ? uploadedJSX : dragJSX}
            </div>
            {validation.allFields ? <div className='validation-registration'>Fill in all the fields!</div> : null}
            <div className='button-wrapper'>
                <Button type='submit' className='button' variant='contained' color='primary'>Register</Button>
            </div>
        </form>
    );
}

export default Registration;
