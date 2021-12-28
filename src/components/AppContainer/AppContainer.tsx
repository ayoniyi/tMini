import style from './AppContainer.module.scss'
const AppContainer = (props:any) => {
    return (
        <div className={style.container}>
           {props.children} 
        </div>
    )
}

export default AppContainer
