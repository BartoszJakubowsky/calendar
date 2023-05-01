import useCalendars from '../hooks/useCalendars';

function Route({path, children})
{
    const {currentPath} = useCalendars();

    if (Array.isArray(path) && path.includes(currentPath))
    {
        return children
    }
    if (path === currentPath)
        return children
    else
        return null;
}


export default Route;
