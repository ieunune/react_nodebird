import React, { useCallback, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';


import Password from 'antd/lib/input/Password';
import useInput from '../hooks/useInput';
import styled from 'styled-components';

const ErrorMessage = styled.div`
    color:red;
`;

const SignUp = () => {
    
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    
    const [id, onChangeId] = useInput('');
    const [nickName, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback(
      (e) => {
        setTerm(e.target.checked);
        setTermError(false);
      },
      [],
    )
    

    // const [id, setId] = useState('');
    // const onChangeId = useCallback((e) => {
    //     setId(e.target.value);
    // });

    // const [password, setPassword] = useState('');
    // const onChangePassword = useCallback((e) => {
    //     setPassword(e.target.value);
    // });

    // const [passwordCheck, setPasswordCheck] = useState('');
    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordError(e.target.value !== password);
            setPasswordCheck(e.target.value);
        }, 
        [password]
    );

    // const [nickName, setNickname] = useState('');
    // const onChangeNick = useCallback((e) => {
    //     setNickname(e.target.value);
    // });

    const onSubmit = useCallback(
        () => {
            console.log(password + " : " + passwordCheck)

            if (password !== passwordCheck) {
                return setPasswordError(true);
            }
            if (!term) {
                return setTermError(true);
            }
        },
        [password, passwordCheck, term]
    );

    return (
        <AppLayout>
            <Head>
                <title>???????????? | NordBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label name="user-id">?????????</label>
                    <br/>
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                    <label name="user-nick">?????????</label>
                    <br/>
                    <Input name="user-nick" value={nickName} required onChange={onChangeNick} />
                    <label name="user-password">????????????</label>
                    <br/>
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                    <label name="user-password-check">??????????????????</label>
                    <br/>
                    <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
                    {passwordError && <ErrorMessage>??????????????? ???????????? ????????????.</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>?????? ?????? ??? ?????? ?????? ?????? ?????????.</Checkbox>
                    {termError && <ErrorMessage>????????? ???????????? ???????????????.</ErrorMessage>}
                </div>
                <div>
                    <Button type='primary' htmlType='submit'>
                        ????????????
                    </Button>
                </div>
            </Form>
            
        </AppLayout>
    );
}

export default SignUp;