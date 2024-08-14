import { useEffect, useState, useRef } from 'react';

export default function onMouseDown(ref, widgetContainer) {
    const [mouseDownAt, setMouseDownAt] = useState(0); // Store the initial x value
    const [prevPercentage, setPrevPercentage] = useState(0);
    const [percentageMoved, setPercentageMoved] = useState(0);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const handleMouseDown = (event) => {
            setMouseDownAt(event.pageX);
            event.preventDefault(); // Prevent default mouse behavior
        };

        const handleMouseMove = (event) => {
            if (mouseDownAt === 0) return; // Only move if mouse is down

            const newX = event.clientX;
            const deltaX = newX - mouseDownAt; // Calculate movement
            const maxDelta = window.innerWidth / 2;
            const percentageTransform = (deltaX / maxDelta) * 100;

            // Calculate the total scrollable width
            const containerWidth = widgetContainer.current.offsetWidth;
            const bodyWidth = 1321.3;
            const maxTranslation = Math.max((bodyWidth - containerWidth) / bodyWidth * 100, -100);

            const nextPercentageUnconstrained = prevPercentage + percentageTransform;
            const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), maxTranslation);

            setPercentageMoved(nextPercentage);
            
            // Smooth transition using requestAnimationFrame
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            const updateTransform = () => {
                widgetContainer.current.style.transform = `translateX(${nextPercentage}%)`;
            };

            animationFrameRef.current = requestAnimationFrame(updateTransform);
        };

        const handleMouseUp = () => {
            setMouseDownAt(0); // Reset on mouse up
            setPrevPercentage(percentageMoved); // Store the current position for the next drag
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };

        // Prevent default dragging behavior
        const handleDragStart = (event) => {
            event.preventDefault();
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('dragstart', handleDragStart); // Prevent dragging

        // Also handle touch events for mobile devices
        document.addEventListener('touchstart', handleMouseDown);
        document.addEventListener('touchmove', handleMouseMove);
        document.addEventListener('touchend', handleMouseUp);
        document.addEventListener('dragstart', handleDragStart); // Prevent dragging for touch

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('dragstart', handleDragStart); // Clean up dragging prevention
            document.removeEventListener('touchstart', handleMouseDown);
            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('touchend', handleMouseUp);
            document.removeEventListener('dragstart', handleDragStart); // Clean up dragging prevention for touch
        };
    }, [mouseDownAt, prevPercentage, percentageMoved, ref, widgetContainer]);

    return mouseDownAt;
}
