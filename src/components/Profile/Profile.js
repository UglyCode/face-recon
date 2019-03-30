import React from 'react';
import './profile.css'

class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet,
        }
    }

    onFormChange = (event) =>{
      switch (event.target.name) {
          case 'user-name':
              this.setState({name: event.target.value});
              break;
          case 'user-age':
              this.setState({age: event.target.value});
              break;
          case 'user-pet':
              this.setState({pet: event.target.value});
              break;
          default:
              return;
      }
    };

    onProfileSubmit = (data) => {
        fetch(`http://localhost:3001/profile/${this.props.user.id}`, {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({formInput: data})
        }).then(resp => {
            this.props.toggleProfile();
            this.props.userUpdate({...this.props.user, ...data});
        }).catch( err => console.log);

    };

    render() {
        const {user} = this.props;
        const {name, age, pet} = this.state;
        return (
            <div className='profile-modal'>
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80">
                        <img
                            src="http://tachyons.io/img/logo.jpg"
                            className="h3 w3 dib" alt="avatar" />

                        <h1>{this.state.name}</h1>
                        <h4>{`Images recon: ${user.entries}`}</h4>
                        <p>{`Mambered: ${user.joined}`}</p>
                        <hr />
                        <div className="mt3">
                            <label htmlFor="user-name">Name:</label>
                            <input
                                onChange={this.onFormChange}
                                className="pa2 b--black-10 w-100"
                                type="text"
                                name="user-name"
                                id="user-name"
                                placeholder={user.name}
                            ></input>
                        </div>
                        <div className="mv3">
                            <label htmlFor="user-age">Age:</label>
                            <input
                                onChange={this.onFormChange}
                                className="b pa2 b--black-10 w-100"
                                type="number"
                                name="user-age"
                                id="user-age"
                                placeholder="29"
                            ></input>
                        </div>
                        <div className="mt3">
                            <label htmlFor="user-pet">Pet:</label>
                            <input
                                onChange={this.onFormChange}
                                className="pa2 b--black-10 w-100"
                                type="text"
                                name="user-pet"
                                id="user-pet"
                                placeholder="cute kitty"
                            ></input>
                        </div>
                        <div className='mt4' style={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <button
                                className={'b pa2 pointer grow hover-white w-40 bg-light-green b--black-30'}
                                onClick={() => this.onProfileSubmit({name, age, pet})}
                            >
                                Save
                            </button>
                            <button className={'b pa2 pointer grow hover-white w-40 bg-light-red b--black-30'}
                                    onClick={this.props.toggleProfile}>
                                Cancel
                            </button>
                        </div>
                    </main>
                </article>
            </div>
        )
    }
};

export default Profile;