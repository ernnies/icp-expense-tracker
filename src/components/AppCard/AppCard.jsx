import Button from '../Button/Button';
import styles from './AppCard.module.css';

const AppCard=({cardTitle,money,success=true,buttonText,buttonType,handleClick})=>{
    // console.log(buttonText);
    return(
        <div className={styles.appcard}>
            <h3 className={styles.cardtitle}>
                {`${cardTitle}: `}
                <span className={success?styles.success:styles.warning}>{`₹${money}`}</span>
            </h3>
            {/* here buttonText is passed as children inside the Button component */}
            <Button style={buttonType} handleClick={handleClick}>{buttonText}</Button>
        </div>
    )

}

export default AppCard;