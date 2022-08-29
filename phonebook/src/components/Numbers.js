
const Numbers = ({ persons }) => {


    return (
        <div>
            <ul>
                {persons.map(
                    per => <li key={per.name}> {per.name} </li>
                )}
            </ul>
        </div>
    )

}


export default Numbers