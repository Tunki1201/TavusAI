import React from 'react';
import { Button } from 'antd';

interface CreateRoomButtonProps {
    isValidRoom: boolean;
    setRoom: (room: string) => void;
}

const CreateRoomButton: React.FC<CreateRoomButtonProps> = ({ isValidRoom, setRoom }) => {
    const createRoom = async (): Promise<void> => {
        try {
            const res: Response = await fetch('/api/conversation_url/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!res.status) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const resJson: { conversation_url: string } = await res.json();

            setRoom(resJson.conversation_url);
        } catch (err: any) {
            console.error(err);
        }
    };

    return (
        <Button onClick={createRoom} disabled={isValidRoom} type='primary' className='mb-2'>
            Create room and start
        </Button>
    );
};

export default CreateRoomButton;
