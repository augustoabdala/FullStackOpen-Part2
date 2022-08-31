import Num from "./Num"

const Numbers = (props) => {
    return (
        <div>
            <ul>
                {props.search.map(per => {
                    return (
                        <Num key={per.num} contact={per}/>
                        // <li key={per.num}>{per.name}</li>
                    )
                }
                )}
            </ul>
        </div>
    )
}

export default Numbers