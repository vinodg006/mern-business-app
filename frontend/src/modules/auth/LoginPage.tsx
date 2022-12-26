import Button from "components/Button";
import InputWithLabel from "components/InputWithLabel";
import { useAppDispatch } from "lib/hooks/useRedux";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "./store/actions/authAction";
import { useLoginMutation } from "./store/slices/authApiSlice";
import { useForm, FormProvider } from "react-hook-form";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const methods = useForm();

  const [login, { isLoading }] = useLoginMutation()

  const onSubmit = async (data: any) => {
    const userData = await login({ email: data.Email, password: data.Password }).unwrap()
    dispatch(setCredentials({ ...userData }))
    navigate('/')
  }


  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   const userData = await login({ email, password }).unwrap()
  //   dispatch(setCredentials({ ...userData }))
  //   // setUser('')
  //   // setPwd('')
  //   navigate('/')

  //   // try {
  //   //   const userData = await login({ user, pwd }).unwrap()
  //   //   dispatch(setCredentials({ ...userData, user }))
  //   //   setUser('')
  //   //   setPwd('')
  //   //   navigate('/welcome')
  //   // } catch (err) {
  //   //   if (!err?.originalStatus) {
  //   //     // isLoading: true until timeout occurs
  //   //     setErrMsg('No Server Response');
  //   //   } else if (err.originalStatus === 400) {
  //   //     setErrMsg('Missing Username or Password');
  //   //   } else if (err.originalStatus === 401) {
  //   //     setErrMsg('Unauthorized');
  //   //   } else {
  //   //     setErrMsg('Login Failed');
  //   //   }
  //   //   errRef.current.focus();
  //   // }
  // }

  return (
    <div className="background">
      <div className="w-[80%] flex space-y-4 flex-col items-center justify-center">
        <div>Don't have an account? <Link className="link" to="/register">Sign up</Link></div>
        <div className="lg:rounded-3xl  w-full bg-white/70 shadow-sm flex lg:w-[60%]  min-h-screen lg:min-h-0  dark:bg-[#fffaff] font-monts">
          <div className="w-full">
            <div className="p-10 flex items-center lg:items-start justify-center flex-col">
              <FormProvider {...methods} >
                <div className="flex flex-col space-y-5 w-full">
                  <InputWithLabel
                    type="text"
                placeholder="yours@example.com"
                    name="Email"
              />
                  <InputWithLabel
                className="mt-2"
                type="password"
                placeholder="your password"
                    name="Password"
              />
                  <div className="text-right link hover:text-black"><Link to="/forgot-password">Forgot Password?</Link></div>
                  <Button className="text-center" onClick={methods.handleSubmit(onSubmit)}>
                    Continue
            </Button>
                </div>

              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
