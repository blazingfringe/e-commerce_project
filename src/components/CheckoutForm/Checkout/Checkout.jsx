import React, { useEffect, useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core';
import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce';
import { Link, useNavigate } from 'react-router-dom';


const steps = ['Shipping address', 'Payement details'];


const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [isFinished, setIsFinished] = useState(0);
    const [checkoutToken, setChekoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    useEffect( () => {
        const generateToken = async ()=>{
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                console.log(token);
                setChekoutToken(token)
            }
            catch (error){
                navigate('/');
            }
        }
        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1 );
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1 );


    const next = (data) => {
        setShippingData(data);

        nextStep();
    };

    const timeout = () => {
        setTimeout(() => {
            console.log('hello, world')
        }, 3000);
    }

    let Confirmation = () => (order.customer ? (
        <>
            <div>
                <Typography variant='h5'>
                    Thankyou for your purchase
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2'>Order Ref: {order.customer.reference}</Typography>
            </div> 
            <br/>
            <Button component={Link} to='/' variant='outline' type='button'>Back to Home</Button>
        </>
    ) :
    (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    ));

    if(error){
        Confirmation = () => (
            <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br/>
            <Button component={Link} to='/' variant='outline' type='button'>Back to Home</Button>

        </>
        );  
    }

    const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm shippingData={shippingData} checkoutToken = {checkoutToken} nextStep ={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/>
  return (
    <>
    <CssBaseline/>
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center'>Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
            </Paper>
        </main>
        
    </>
  )
}

export default Checkout