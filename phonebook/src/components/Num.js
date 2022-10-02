const Num = (props) => {
    return (
        <li className='note'> {props.contact.name}: {props.contact.number} </li>
    )
}

export default Num