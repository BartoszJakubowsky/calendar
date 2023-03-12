
export default function input({calendarName, handleNameChange, ...rest})
{
    return (
                    <input 
                    className={rest.className}
                    value={calendarName}
                    required
                    type='text'
                    onChange={handleNameChange}/>
    );
}


