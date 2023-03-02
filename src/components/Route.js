import useCarts from '../hooks/useCarts';

function Route({path, children})
{
    const {currentPath} = useCarts();

    if (path === currentPath)
        return children
    else
        return null;
}


export default Route;
