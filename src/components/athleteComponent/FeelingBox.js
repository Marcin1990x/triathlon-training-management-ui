const FeelingBox = (props) => {
    return (
    <div>
        <label>Feelings:</label>
            <select className = "form-select">
                <option value = 'STRONG'>STRONG</option>
                <option value = 'GOOD'>GOOD</option>
                <option value = 'NORMAL'>NORMAL</option>
                <option value = 'BAD'>BAD</option>
                <option value = 'WEAK'>WEAK</option>
            </select>
        <label>RPE:</label>    
            <select className = "form-select">
                <option value = '0'>0</option>
                <option value = '1'>1</option>
                <option value = '2'>2</option>
                <option value = '3'>3</option>
                <option value = '4'>4</option>
                <option value = '5'>5</option>
                <option value = '6'>6</option>
                <option value = '7'>7</option>
                <option value = '8'>8</option>
                <option value = '9'>9</option>
                <option value = '10'>10</option>
            </select>
        <label>Description:</label> 
            <input type = "text" maxLength = {80} className="form-control"></input>
        <button className = "btn btn-outline-dark m-2">Save</button>
    </div>
    )
}

export default FeelingBox