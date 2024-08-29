import React, { useState, useRef, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import type { InputRef } from 'antd';
import CreateRoomButton from './CreateRoomButton';

interface HomeProps {
    setRoom: (room: string | null) => void;
}

const Create: React.FC<HomeProps> = ({ setRoom }) => {
    const [isValidRoom, setIsValidRoom] = useState(false);
    const roomRef = useRef<InputRef>(null);

    const checkValidity = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checkValidity()) {
            setIsValidRoom(true);
        } else {
            setIsValidRoom(false);
        }
    }, []);

    const joinCall = useCallback(() => {
        const roomUrl = roomRef.current?.input?.value;
        if (roomUrl) {
            setRoom(roomUrl);
        }
    }, [setRoom]);

    return (
        <div className='w-full'>
            <CreateRoomButton setRoom={setRoom} isValidRoom={isValidRoom} />
            <Form className='w-full'>
                <Input
                    ref={roomRef}
                    type="text"
                    placeholder="Enter room URL..."
                    pattern="^(https:\/\/)?[\w.-]+(\.(daily\.(co)))+[\/\/]+[\w.-]+$"
                    onChange={checkValidity}
                    className='mb-2 w-full p-2'
                />
            </Form>
            <Button onClick={joinCall} disabled={!isValidRoom}>
                Join room
            </Button>
        </div>
    );
};

export default Create;
