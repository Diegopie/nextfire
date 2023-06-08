interface ILoaderProps {
    show: any
}

export default function Loader( props: ILoaderProps ) {
    return props.show ? <div className='loader'></div> : null;
}