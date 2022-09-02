const Num = (props) => {
    return (
        <li style={{display: "inline"}}> {props.contact.name}: {props.contact.num} </li>
    )
}

export default Num