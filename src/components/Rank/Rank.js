import React from 'react';

class Rank extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            sign: ''
        }
    }

    componentDidMount() {
        this.getRankSign(this.props.entries);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.entries !== this.props.entries){
            this.getRankSign(this.props.entries);
        }
        return null;
    }

    getRankSign = (rank) => {
        fetch(`https://y7ley0zb0d.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${this.props.entries}`)
            .then(res => res.json())
            .then( lambdaData => this.setState({sign: lambdaData.input}))
            .catch(console.log);
    };

    render(){
        const {name, entries} = this.props;
        return(
            <div className='ma4 mt0'>
                <div className='white f3'>
                    {`${name}, your current rank is... `}
                </div>
                <div className='white f3'>
                    {`${entries} and you got sign of: '${this.state.sign}'`}
                </div>
            </div>
        );
    }
};

export default Rank;