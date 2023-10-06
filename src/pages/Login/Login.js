import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('/users.json');

            if (!response.ok) {
                throw new Error('Some thing wrong');
            }

            const data = await response.json();
            const isValidUser = data.some(user => user.username === username && user.password === password);

            if (isValidUser) {
                window.location.href = '/home';
            } else {
                toast.warning('Tên người dùng hoặc mật khẩu không đúng.');
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="wrapper">
                <h2>Login</h2>
                <div className='input-wrapper'>
                    <div className='grid'>
                        <input
                            className='mgb_10px pd_10px'
                            type="text"
                            placeholder="Tên người dùng"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <input
                            className='mgb_10px pd_10px'
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button className='mgb_10px ' onClick={handleLogin}>Đăng nhập</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;
