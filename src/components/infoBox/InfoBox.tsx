import './InfoBox.scss';

type IPropsInfoBox = {
    bgColor: string,
    title: string,
    count: string | number,
    icon: JSX.Element
}

function InfoBox({ bgColor, title, count, icon }: IPropsInfoBox) {
    return (  
        <div className={`info-box ${bgColor}`}>
            <span className='info-icon --color-white'>{icon}</span>
            <span className='info-text'>
                <p>{title}</p>
                <h4>{count}</h4>
            </span>
        </div>
    );
}

export default InfoBox;