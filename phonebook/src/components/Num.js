const Num = (props) => {
    return (
        <li className='note'> {props.contact.name}: {props.contact.num} </li>
    )
}

export default Num