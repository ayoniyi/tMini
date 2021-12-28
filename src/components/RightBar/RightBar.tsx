import {useState} from 'react'
import style from './RightBar.module.scss'

import Search from '../../images/icons/search.svg'
import Search2 from '../../images/icons/search-a.svg'

const RightBar = () => {

    const [focus, setFocus] = useState<boolean>(false)

    return (
        <section className={style.container}>
        <div className={style.content}  >
            <div className={style.top}>
                <div className={style.search}>
                    <input type="text" 
                    //onFocus={}
                    onFocusCapture={()=> setFocus(!focus)}
                    onBlur={()=> setFocus(!focus)}
                
                    placeholder='Search' />
                    <img src={focus ? Search2 : Search} alt="serch" />
                </div>
            </div>
        </div>

        </section>
    )
}

export default RightBar
