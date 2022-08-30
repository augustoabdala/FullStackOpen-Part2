
const Numbers = (props) => {
    
    return (
        <div>
            <ul>
                {props.search.map(per =>
                    <li key={per.name}> {per.name}: {per.num} </li>
                )}
            </ul>
        </div>
    )
}

export default Numbers