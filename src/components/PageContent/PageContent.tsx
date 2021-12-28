import style from './PageContent.module.scss'

const PageContent = (props:any) => {
    return (
        <div className={style.container}>
            {props.children}
        </div>
    )
}

export default PageContent
