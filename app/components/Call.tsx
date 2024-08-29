import React, { useEffect, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';

interface CallProps {
    room: string | null;
    setRoom: (room: string | null) => void;
}

const CALL_OPTIONS = {
    // Add your call options here  
};

const Call: React.FC<CallProps> = ({ room, setRoom }) => {
    const callRef = useRef<HTMLDivElement>(null);
    const callFrame = useRef<any>(null); // Use useRef for the callFrame  

    useEffect(() => {
        const createAndJoinCall = async () => {
            if (!callRef.current || callFrame.current || !room) return;

            const newCallFrame = DailyIframe.createFrame(callRef.current, CALL_OPTIONS);
            callFrame.current = newCallFrame; // Store in the ref  

            try {
                await newCallFrame.join({ url: room });
            } catch (error) {
                console.error("Error joining call:", error);
                // Handle the error appropriately, e.g., display an error message  
            }

            newCallFrame.on('left-meeting', () => {
                setRoom(null);
                callFrame.current = null;
                newCallFrame.destroy();
            });
        };

        createAndJoinCall();

        // Cleanup  
        return () => {
            if (callFrame.current) {
                callFrame.current.leave();
                callFrame.current.destroy();
                callFrame.current = null;
            }
        };
    }, [room]); // Only re-run the effect when the `room` changes  

    return <div ref={callRef} className='w-full h-[800px] rounded-xl' />;
};

export default Call;