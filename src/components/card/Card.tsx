import styles from './Card.module.scss';

function Card({ children, cardClass }: {children: JSX.Element | JSX.Element[], cardClass?: string}) {
    return (  
        <div className={`${styles.card} ${cardClass}`}>
            {children}
        </div>
    );
}

export default Card;