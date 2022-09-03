import Num from "./Num"
import DelButton from "./DelButton"

const Numbers = (props) => {
    return (
        <div>
            <ul>
                {props.search.map(per => {
                    return (
                        <div key={per.num}>
                            <Num className='numbers' contact={per} />
                            <DelButton delNum={()=>props.delNum(per)}/>
                        </div>
                    )
                }
                )}
            </ul>
        </div>
    )
}

export default Numbers