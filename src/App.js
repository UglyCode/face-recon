import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Logo from './components/Logo/Logo';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';

const SERVER = 'http://localhost:3001'; //'https://face-recon-backend.herokuapp.com';

const particlesOptions = {
    particles: {
        number: {
            value: 80
        },
        line_linked: {
            shadow: {
                enable: true,
                color: '#000',
                blur: 1
            }
        },
        color:{
            value: '#FF4596'
        }
    }
};

const initilalState = {
        input: '',
        boundingBoxes: [],
        route: 'signIn',
        isSignedIn: false,
        isProfileOpen: false,
        user: {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
        }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = initilalState;
    }

    componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        if (token){
            fetch(`${SERVER}/signIn`, {
                method: 'POST',
                headers : {
                    'Content-type': 'application/json',
                    'Authorization': token
                }
            })
                .then(res=>res.json())
                .then(data =>{
                if(data && data.id){
                    fetch(`${SERVER}/profile/${data.id}`, {
                        method: 'GET',
                        headers : {
                            'Content-type': 'application/json',
                            'Authorization': token
                        }
                    })
                        .then(res => res.json())
                        .then(user => {
                            if (user && user.id){
                                this.userUpdate(user);
                                this.onRouteChange('home');
                            }
                    })
                }
            })
        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    };

    onSubmit = () => {
        fetch(`${SERVER}/image`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then((response) => {
                fetch(`${SERVER}/image`, {
                    method: 'put',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': window.sessionStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                    .then(res => res.json())
                    .then(data => this.setState(Object.assign(this.state.user, {entries: data})));
                this.setState({boundingBoxes: this.calcBoxes(response.outputs[0].data.regions)});
            })
            .catch(function(err) {
                console.log(err);
            }
        );
    };

    calcBoxes(clarifaiRegions){
        return clarifaiRegions.map((elem)=>{
            let box = elem.region_info.bounding_box;
            box.top_row *= 100;
            box.left_col *= 100;
            box.bottom_row = (1-box.bottom_row) *100;
            box.right_col = (1-box.right_col) * 100;
            return box;
        })
    }

    userUpdate = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        });
    };

    onRouteChange = (route) => {
        if(route === 'signOut'){
            return this.setState(initilalState)
        } else if (route === 'home'){
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    };

    toggleProfile = () =>{
      this.setState(prevState => ({
          ...prevState,
          isProfileOpen: !prevState.isProfileOpen
          }))
    };

    render() {
        const {isSignedIn, input, boundingBoxes, route, isProfileOpen} = this.state;
        return (
          <div className="App">
              <Particles className='particles'
                  params={particlesOptions}
              />
              <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}
              toggleProfile={this.toggleProfile}/>
              {isProfileOpen &&
              <Modal>
                  <Profile isProfileOPen={isProfileOpen}
                           toggleProfile={this.toggleProfile}
                           user={this.state.user}
                           userUpdate = {this.userUpdate}
                  />
              </Modal>
              }
              {route === 'home'
                  ? <div className='flex'>
                      <div className=' w-10'>
                        <Logo />
                      </div>
                      <div className=' w-80'>
                          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                          <ImageLinkForm
                              onInputChange={this.onInputChange}
                              onSubmit={this.onSubmit}
                          />
                          <FaceRecognition imgLink={input} imgBoxes={boundingBoxes}/>
                      </div>
                  </div>
                  : (
                      route === 'register'
                      ? <Register server={SERVER} userUpdate={this.userUpdate} onRouteChange={this.onRouteChange}/>
                      : <SignIn server={SERVER} userUpdate={this.userUpdate} onRouteChange={this.onRouteChange}/>
                  )
              }
          </div>
        );
  }
}

export default App;
