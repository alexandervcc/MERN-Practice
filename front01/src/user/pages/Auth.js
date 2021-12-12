import React, { useState } from 'react'

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import useForm from '../../shared/hooks/form-hook'

import './Auth.css';


const Auth = (props) => {
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
    }, false);
    const [loginMode, setLoginMode] = useState(true)


    const submitHandler = (event) => {
        event.preventDefault();
        console.log("Logging In")
    }

    const switchModeHandler = () => {
        if (!loginMode) {
            setFormData({
                ...formState.inputs, 
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setLoginMode(prevState => !prevState);
    };

    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={submitHandler} >
                {!loginMode &&
                    <Input
                        id='name'
                        element='input'
                        type='text'
                        label='Your name'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name"
                        onInput={inputHandler}
                    />
                }
                <Input
                    id='email'
                    element='input'
                    type='email'
                    label='email'
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address"
                    onInput={inputHandler}
                />
                <Input
                    id='password'
                    element='input'
                    type='password'
                    label='Password'
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid password"
                    onInput={inputHandler}
                />

                <Button type="submit" disabled={!formState.isValid} >
                    {loginMode ? 'Log-In' : 'Sign-Up'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler} >
                Switch to {loginMode ? 'Sign-Up' : 'Log-In'} Mode
            </Button>
        </Card>
    )
}

export default Auth
