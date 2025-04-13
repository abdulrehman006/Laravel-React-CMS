import TextInput from "@/Admin/Components/Inputs/TextInput.jsx";
import {useForm, Head, Link} from "@inertiajs/react";
import FormButton from "@/Admin/Components/Button/FormButton.jsx";
export default function ForgotPassword({status}){
    const customize = window.customize_settings

    // initial value
    const {data, errors, post, setData, processing, reset} = useForm({
        email: '',
    })

    // handle login
    const handleForgotPassword = (e) => {
        e.preventDefault();
        post(route('auth.password.email'), {onSuccess: () => {
            reset('email')
        }});
    }
    return (
        <>
            <Head title="Forgot Password" />
            <div
                className="yoo-login-wrap yoo-style1 yoo-bg yoo-dynamicbg"
                style={{ backgroundImage: "url(/static/login-bg.jpg)" }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={handleForgotPassword} className="yoo-form yoo-style2">
                                <div className="yoo-form-logo">
                                    <a href="/">
                                        <img src={customize?.general?.site_logo} alt="" />
                                    </a>
                                </div>
                                <div className="yoo-height-b25 yoo-height-lg-b25" />
                                <h2 className="yoo-form-title">Forget your password?</h2>
                                <div className="yoo-height-b15 yoo-height-lg-b15" />
                                <span className="text-white">No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</span>
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
                                        <FormButton isLoading={processing}>
                                            Forgot Password
                                        </FormButton>
                                    </div>
                                    <div className="text-center mt-3" style={{width: "100%"}}>
                                        <Link href={route('auth.login')} className="yoo-form-btn yoo-style2 text-white">Login?</Link>
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
