import React, { useEffect } from 'react';

export default function onMouseDown(ref) {
    useEffect(() => {
        function listener(event : Event) {
            if (ref.current) {
                console.log(ref.current)
            }
        }


        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref]);
}
