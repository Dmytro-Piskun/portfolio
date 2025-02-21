import Image from 'next/image'
import SomebodyHireThisGuy from '@/assets/SomebodyHireThisGuy.gif'
import AnimatedText from './AnimatedTeaxt';
import Lines from '../projects/Lines';

const Contacts = () => {
    return (
        <section className="h-[100dvh]  text-3xl flex items-center justify-center">



            dmitriy.piskun.dp@gmail.com
            {/* <Image
            
            src={SomebodyHireThisGuy}
            width={200}
            height={200}
            alt="SomebodyHireThisGuy GIF"
            
            /> */}
            {/* <AnimatedText></AnimatedText> */}
        </section>
    );
};

export default Contacts;