import Num from "./Num"
import DelButton from "./DelButton"

const Numbers = (props) => {
    return (
        <div>
            <ul>
                {props.search.map(per => {
                    return (
                        <div key={per.num}>
                            <Num contact={per} />
                            <DelButton id={per.id} delNum={()=>props.delNum(per.id)}/>
                        </div>
                    )
                }
                )}
            </ul>
        </div>
    )
}

export default Numbers