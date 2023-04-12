import styles from "./Screen.module.scss"

const Screen = ({children}:any) => {
  return (
    <div className={styles.Screen}>
     {children}
    </div>
  )
}

export default Screen