
const Num = (props) => {

    return (
        <li key={props.contact.name}> {props.contact.name}: {props.contact.num} </li>
    )
}

export default Num