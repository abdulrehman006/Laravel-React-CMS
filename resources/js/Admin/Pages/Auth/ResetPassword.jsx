import TextInput from "@/Admin/Components/Inputs/TextInput.jsx";
import {useForm, Head, Link} from "@inertiajs/react";
import FormButton from "@/Admin/Components/Button/FormButton.jsx";
export default function ResetPassword({token, email, status}){
    const customize = window.customize_settings

    // initial value
    const {data, errors, post, setData, processing} = useForm({
        password: '',
        password_confirmation: '',
        token: token,
        email: email,
    })

    // handle login
    const handlePasswordReset = (e) => {
        e.preventDefault();
        post(route('auth.password.store'));
    }
    return (
        <>
            <Head title="Reset Password" />
            <div
                className="yoo-login-wrap yoo-style1 yoo-bg yoo-dynamicbg"
                style={{ backgroundImage: "url(/static/login-bg.jpg)" }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={handlePasswordReset} className="yoo-form yoo-style2">
                                <div className="yoo-form-logo">
                                    <a href="/">
                                        <img src={customize?.general?.site_logo} alt="" />
                                    </a>
                                </div>
                                <div className="yoo-height-b25 yoo-height-lg-b25" />
                                <h2 className="yoo-form-title">Reset your password</h2>
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
                                            title="New password"
                                            type="password"
                                            id="password"
                                            error={errors?.password || errors?.email}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <TextInput
                                            title="Confirm new password"
                                            type="password"
                                            id="n-password"
                                            error={errors?.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <FormButton isLoading={processing}>
                                            Reset Password
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
