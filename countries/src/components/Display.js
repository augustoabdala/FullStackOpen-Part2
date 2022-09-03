

const Display = ({ countries }) => {


    return (
        <div>
            {countries.map(c => {
                return (
                    <div key={c.name.common}>{c.name.common}</div>
                )
            }

            )}
        </div>
    )
}


export default Display