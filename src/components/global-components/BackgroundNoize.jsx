
const BackgroundNoize = ({children}) => {
    return (
        <>
        {children}
        <div className="fixed h-screen w-full noize" />
        </>
    );
};

export default BackgroundNoize;