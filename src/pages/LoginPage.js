import React, { Component } from 'react';
import { Input } from '../components/Input';
import { login } from '../api/apiCalls';
import axios from 'axios';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from "../shared/ApiProgress";
import { Authentication } from '../shared/AuthenticationContext';



class LoginPage extends Component {
    static contextType = Authentication;
    state = {
        username: null,
        password: null,
        error: null
        
    
    };

    
    onChange = event =>{
        const{name, value} = event.target; //object destructing
        
        this.setState({
            [name]: value,
            error: null
            
        });
    };

    onClickLogin = async event =>{
        event.preventDefault();
        const {username, password} = this.state;
        const {onLoginSuccess} =this.context;
        const creds = {
            username,
            password
        };
        //login(creds);

        const {push} = this.props.history;

        this.setState({
            error: null
        });

        try{
            const response = await login(creds);
            //console.log(response.data);
            //push('/');
            const authState = {
                ...response.data,
                password
            }
            onLoginSuccess(authState);

            const { role } = response.data;
            if (role && role.name === 'ADMIN') {
                push('/admin');
            } else if (role && role.name === 'IK') {
                push('/ik');
            } else if (role && role.name === 'INVENTORYMASTER') {
                push('/inventory');
            } else {
                push('/'); 
            }


        } catch(apiError){
            
            this.setState({
                error: apiError.response.data.message
            })
        }
        

            
    };

    render() {

        const{pendingApiCall} = this.props;
        const {username, password, error} = this.state;
        const buttonEnabled = username && password;



        return (
            <div className='container'>
                <form>
                    <h1 className="text-center mt-2">Jforce System Sign In</h1>
                    <Input label="Username" name="username" onChange={this.onChange}/>
                    <Input label="Password" name="password" type="password" onChange={this.onChange}/>
                    {this.state.error && <div className="alert alert-danger mt-2">
                        {this.state.error}
                    </div>}
                    <div className="text-center">
                        <ButtonWithProgress  onClick={this.onClickLogin} disabled={!buttonEnabled || pendingApiCall} pendingApiCall={pendingApiCall} >Login</ButtonWithProgress>
                    </div>
                    
                </form>
            </div>
        );
    }
}

const LoginPageWithApiProgress = withApiProgress(LoginPage, '/api/1.0/auth');


export default LoginPageWithApiProgress;