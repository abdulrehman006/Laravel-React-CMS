import TextInput from "@/Admin/Components/Inputs/TextInput.jsx";
import {useForm, Head, Link} from "@inertiajs/react";
import FormButton from "@/Admin/Components/Button/FormButton.jsx";
export default function Login({status}){
    const customize = window.customize_settings

    // initial value
    const {data, errors, post, setData, processing} = useForm({
        email: '',
        password: '',
        remember: false,
    })

    // handle login
    const handleLogin = (e) => {
        e.preventDefault();
        post(route('auth.login'));
    }
    return (
        <>
            <Head title="Admin login" />
            <div
            className="yoo-login-wrap yoo-style1 yoo-bg yoo-dynamicbg"
            style={{ backgroundImage: "url(/static/login-bg.jpg)" }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={handleLogin} className="yoo-form yoo-style2">
                            <div className="yoo-form-logo">
                                <a href="/">
                                    <img src={customize?.general?.site_logo} alt="" />
                                </a>
                            </div>
                            <div className="yoo-height-b25 yoo-height-lg-b25" />
                            <h2 className="yoo-form-title">Sign in to continue</h2>
                            <div className="yoo-height-b25 yoo-height-lg-b25" />
                            <div className="yoo-height-b15 yoo-height-lg-b15" />
                            {status && (
                                <>
                                    <div className="alert alert-success">{status}</div>
                                    <div className="yoo-height-b15 yoo-height-lg-b15" />
                                </>
                            )}
                            <div className="row">
                                <div className="col-lg-12">
                                    <TextInput
                                        title="Email"
                                        type="text"
                                        id="email"
                                        error={errors?.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <TextInput
                                        title="Password"
                                        type="password"
                                        id="password"
                                        error={errors?.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="yoo-forget-pass-wrap">
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="gridCheck"
                                                    checked={data.remember}
                                                    onChange={(e) => setData('remember', e.target.checked)}
                                                />
                                                <label className="custom-control-label" htmlFor="gridCheck">
                                                    <span className="custom-control-shadow" />
                                                    Remember me
                                                </label>
                                            </div>
                                            <Link href={route('auth.password.request')} className="yoo-form-btn yoo-style2 text-white">Forgot password?</Link>
                                        </div>
                                    </div>
                                    <FormButton isLoading={processing}>
                                        Login
                                    </FormButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* .container */}
        </div>
        </>


    )
}
