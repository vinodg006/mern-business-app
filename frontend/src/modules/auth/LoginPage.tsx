import Button from "components/Button";
import InputWithLabel from "components/InputWithLabel";
import { LogoEmos } from "lib/constants/imgSrc";
import { useAppDispatch } from "lib/hooks/useRedux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "./store/actions/authAction";
import { useLoginMutation } from "./store/slices/authApiSlice";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { isLoading }] = useLoginMutation()

  const handleEmail = (e: any) => setEmail(e.target.value)

  const handlePassword = (e: any) => setPassword(e.target.value)


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userData = await login({ email, password }).unwrap()
    dispatch(setCredentials({ ...userData }))
    // setUser('')
    // setPwd('')
    navigate('/')

    // try {
    //   const userData = await login({ user, pwd }).unwrap()
    //   dispatch(setCredentials({ ...userData, user }))
    //   setUser('')
    //   setPwd('')
    //   navigate('/welcome')
    // } catch (err) {
    //   if (!err?.originalStatus) {
    //     // isLoading: true until timeout occurs
    //     setErrMsg('No Server Response');
    //   } else if (err.originalStatus === 400) {
    //     setErrMsg('Missing Username or Password');
    //   } else if (err.originalStatus === 401) {
    //     setErrMsg('Unauthorized');
    //   } else {
    //     setErrMsg('Login Failed');
    //   }
    //   errRef.current.focus();
    // }
  }

  return (
    <div className="background">
      <div className="lg:rounded-xl  w-full bg-white/70 shadow-sm flex lg:h-[90vh] lg:w-[80%]  min-h-screen lg:min-h-0  dark:bg-slate-900 font-monts">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          <div className="py-10 px-12 flex items-center lg:items-start justify-center flex-col">
            <div className="font-bold text-3xl">Login</div>
            <div className="text-center">
              Lorem ipsum dolor sit amet consectetur.
            </div>
            <div className="mt-3 flex flex-col space-y-3 w-full">
              <InputWithLabel
                name="Email"
                type="text"
                value={email}
                placeholder="yours@example.com"
                onChange={handleEmail}
              />
              <InputWithLabel
                name="Password"
                className="mt-2"
                type="password"
                placeholder="your password"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <Button className="text-center mt-5" onClick={handleSubmit}>
              LOGIN
            </Button>
          </div>
          <div className="hidden lg:flex w-full h-full bg-primary/40  rounded-r-xl  items-center justify-center flex-col">
            <img src={LogoEmos} alt="Emos" className="w-[60%] -ml-5" />
            <div className="text-primary text-xl font-bold -mt-4">
              Fast, Easy, & Reliable
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
