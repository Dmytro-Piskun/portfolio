
const Time = () => {

  const date = new Date();

  const options = {
    timeZone: 'Europe/Vilnius',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  };

  let lithuanianTime = date.toLocaleString('en-US', options);

  if (lithuanianTime.startsWith('24')) {
    lithuanianTime = '00' + lithuanianTime.slice(2);
  }


  return (
    <p className=" text-primary font-light font-condensed text-2xl max-sm:text-xl">LITHUANIA, {lithuanianTime.toString()} GMT+3</p>
  );
};

export default Time;