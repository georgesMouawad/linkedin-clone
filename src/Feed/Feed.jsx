import './style.css'

import CreateIcon from '@mui/icons-material/Create';

const Feed = () => {
    return (
        <div className="feed">
            <div className="feed-input-container">
                <div className="feed-inpu">
                    <CreateIcon/>
                    <form>
                        <input type="text" />
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Feed;