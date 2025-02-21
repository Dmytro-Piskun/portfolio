'use client'
import { useEffect,useRef } from 'react';

const WobblyText = ({ text = "here is the default text for this element" }) => {
    const textRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const text = textRef.current;
        const textLength = text.getComputedTextLength();
        const path = pathRef.current;
        path.setAttribute('d', `M 0 36 L ${100 + textLength} 36`);
    }, []);

    return (
        <div className='mt-10'>
        <svg className='w-fit h-fit'>
            <path id="my-path" ref={pathRef} stroke="black" strokeWidth="2"  fill="transparent" />
            <text>
                <textPath xlinkHref="#my-path" id="text-path" className='text-6xl' ref={textRef}>
                    {text}
                </textPath>
            </text>
        </svg>
        </div>
    );
}
    ;

export default WobblyText;