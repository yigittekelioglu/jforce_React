import React from "react";
import {signup} from '../api/apiCalls';
import {Input} from '../components/Input';




class UserSignupPage extends React.Component{

    state = {
        username: null,
        password: null,
        passwordAgain: null,
        pendingApiCall: false,
        errors: {

        }
    };

    onChange = event =>{
        const{name, value} = event.target; //object destructing
        //const value = event.target.value;
        //const name = event.target.name;
        const errors ={...this.state.errors};//state'deki errors objesının kopyasını oluşturuyor
        errors[name] = undefined;
        if( name == 'password' || name == 'passwordAgain'){
            if(name == 'password' && value != this.state.passwordAgain){
                errors.passwordAgain = 'Şifreler uyuşmuyor!';
            }else if(name == 'passwordAgain' && value != this.state.password){
                errors.passwordAgain = 'Şifreler uyuşmuyor!';
            }else{
                errors.passwordAgain = undefined;
            }
        }
        this.setState({
            [name]: value,
            errors
        });
    };

    onClickSignup = async event =>{
        event.preventDefault();
 
        const {username, password} = this.state;
        const body = {
            //username: username,
            //password: password
            username,
            password
        };
        this.setState({pendingApiCall: false});

        try{
            const response = await signup(body);
        }catch(error){
            //console.log(error.response.data);
            if(error.response.data.validationErrors){
                this.setState({ errors: error.response.data.validationErrors});
            }
            
            
        }
        this.setState({pendingApiCall: false});
        

        /*
        signup(body)
        .then((response) =>{//butonu disableddan geri donduruyo responsa göre
            this.setState({pendingApiCall: false});
        }).catch(error => { //hata alırsak yıne aktıf edıyo
            this.setState({pendingApiCall: false});
        });
        */
    };

    /*
    onChangeUsername = event =>{
        this.setState({
            username: event.target.value
        });
    };

    onChangePassword = event =>{
        this.setState({
            password: event.target.value
        });
    };

    onChangepasswordAgain = event =>{
        this.setState({
            passwordAgain: event.target.value
        });
    };
    */

    render(){
        const {pendingApiCall, errors} = this.state;
        const {username, password, passwordAgain} = errors;


        return(
            <div className="container ">
                <form> 
                <h1 className="text-center mt-2">Jforce System Sign Up</h1>
                <Input name="username" label="Username" error={username} onChange={this.onChange} />
                <Input name="password" label="Password" error={password} onChange={this.onChange} type="password"/>
                <Input name="passwordAgain" label="Password Again" error={passwordAgain} onChange={this.onChange} type="password"/>

                <div className="text-center">
                    <button className="mt-3 btn btn-secondary" onClick={this.onClickSignup} disabled={pendingApiCall || passwordAgain != undefined}> {pendingApiCall && <span className="spinner-border spinner-border-sm"></span> } 
                        Sign Up
                    </button>
                </div>
                {/*<div className="mt-3">
                    <label>Username</label>
                    <input className={ username ? "form-control is-invalid" : "form-control"} name="username" onChange={this.onChange}></input>
                    <div className="invalid-feedback">{username}</div>
                </div> 
                
                <div className="mt-3">
                    <label>Password</label>
                    <input className="form-control" name="password" type="password" onChange={this.onChange}></input>
                </div>
                <div className="mt-3">
                    <label>Password Again</label>
                    <input className="form-control" name="passwordAgain" type="password" onChange={this.onChange}></input>
                </div>*/}

                
                </form>
            </div>
            
        );
    }
} 

export default UserSignupPage;

/* btn'deki kod conditiona rendering. */