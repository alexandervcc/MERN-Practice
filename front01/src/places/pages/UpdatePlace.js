import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import useForm from '../../shared/hooks/form-hook';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'

import './PlaceForm.css';

const UpdatePlace = (props) => {

    const placeId = useParams().placeId;

    const identifiedPlace = null;

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    useEffect(() => {
        if (identifiedPlace) {
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true)
        }
    }, [setFormData, identifiedPlace]);

    if (!identifiedPlace) {
        return (
            <div className='center'>
                <Card>
                    <h2>Could not find the place!!</h2>
                </Card>
            </div>
        )
    }

    const placeUpdateSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs)
    }



    return (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="title"
                element="input"
                label="title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid value"
                onInput={inputHandler}
                value={formState.inputs.title.value}
                valid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description, min 5 characters"
                onInput={inputHandler}
                value={formState.inputs.description.value}
                valid={formState.inputs.description.isValid}
            />

            <Button
                type="submit"
                disabled={formState.isValid}
            >
                Update Place
            </Button>

        </form>
    )
}

export default UpdatePlace