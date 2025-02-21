'use client'
import Image from 'next/image';
import switchOn from '@/assets/scheme-switch/switch-on.png';
import switchOff from '@/assets/scheme-switch/switch-off.png';
import { useState, useEffect } from 'react';

const SchemeToggle = () => {
    const userPreference = handleUserPreference();
    const [isSwitchOn, setIsSwitchOn] = useState(userPreference === 'light');

    const root = document.documentElement;

    const setSchemeDark = ()=>{
        setTimeout(() => {
            root.style.setProperty('--primary-color', '#ffffff');
            root.style.setProperty('--secondary-color', '#cccccc');
            root.style.setProperty('--accent-color', '#ffffff');
            root.style.setProperty('--background-color', '#252525');
        }, 0);    };
    
     const setSchemeLight = ()=>{
            root.style.setProperty('--primary-color', '#313131');  
            root.style.setProperty('--secondary-color', '#6c757d');  
            root.style.setProperty('--accent-color', '#383838');  
            root.style.setProperty('--background-color', '#ffffff');  
    };

    if(isSwitchOn){
        setSchemeLight();
    }
    else{
       setSchemeDark();
    }

    function handleUserPreference() {
                    if (!localStorage.getItem("prefered-color-scheme")){
                        const prefersDark = window.matchMedia(
                            "(prefers-color-scheme: dark)"
                        );
                
                        if (prefersDark.matches) {
                            return "dark";
                        } else {
                            return "light";
                        }
                    }
                    else {
                        return localStorage.getItem("prefered-color-scheme")
                    }
                }         


 const handleSchemeToggle = () => {
        setIsSwitchOn((prevIsSwitchOn => {
            localStorage.setItem("prefered-color-scheme",!prevIsSwitchOn?"light":"dark");
            return !prevIsSwitchOn;
        }));        
    }


    return (
        <Image onClick={handleSchemeToggle} className=' rotate-3 w-12'  alt='lightswitch' src={isSwitchOn ? switchOn : switchOff} />
    );
};

export default SchemeToggle;
