import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Icon } from 'antd';

// const fileteredData = (albums, query) => {
//     query = query.toLowerCase();
//     const result = albums.filter(
//         item => item.name.toLowerCase().includes(query)
//     );
//     return result;
// }

class ApprovedSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    render() {
        return (
            <div>
                <div
                    className='search_bar'
                >
                    <Icon type="search" className='search_icon'/>
                    <Input 
                        placeholder='Name'
                        // disabled={!(this.props.user && this.props.user.albums)}
                        onChange={e => this.setState({query: e.target.value})}
                    />
                    <Link to ='/survey/new'>
                        <Icon type="plus" className='add_icon'/>
                    </Link>
                </div>
            </div>
        )
    }
}

export default ApprovedSurvey;