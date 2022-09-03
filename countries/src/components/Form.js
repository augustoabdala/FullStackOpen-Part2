

const Form = (props) => {

    return (
        <input onChange={props.handleSearch} value={props.search}/>
    )
}


export default Form