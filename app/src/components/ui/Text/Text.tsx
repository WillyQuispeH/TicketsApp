import React from 'react'

import styles from './Text.module.scss'

interface IntText{
    text:string
}

const Text = ({text} :IntText) => {
  return (
    <div className={styles.text} >
        <h1>{text}</h1>
    </div>
  )
}

export default Text