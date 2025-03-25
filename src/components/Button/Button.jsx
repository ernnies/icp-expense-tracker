import styles from './Button.module.css';
// console.log(styles);

const Button=({children,handleClick, style='primary',btnshadow=false,type='button'})=>{
    // console.log(styles[style]);
    // console.log(handleClick);
    return(
        <button type={type} onClick={handleClick} className={`${styles.button} ${styles[style]} ${btnshadow&&styles.shadow}`}>
            {/* button  component is received children which is here a buttonText*/}
            {children}
        </button>
    );
}

export default Button;