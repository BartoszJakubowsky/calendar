import useCalendars from '../hooks/useCalendars';

function Route({path, children})
{
    const {currentPath} = useCalendars();

    if (path === currentPath)
        return children
    else
        return null;
}


export default Route;
