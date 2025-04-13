import Div from "@/Frontend/Components/Div";
import Spacing from "@/Frontend/Components/Spacing";
import {Icon} from "@iconify/react";
import {useForm, usePage} from "@inertiajs/react";
import {useSelector} from "react-redux";

export default function ContactForm(){
    const {flash} = usePage().props
    const contactSection = useSelector((state) => state.homePage.contact_section)
    const {data, setData, errors, post, wasSuccessful, reset, processing} = useForm({
        name: "",
        email: "",
        project_type: "",
        mobile_number: "",
        message: ""
    })
    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
            }
        })
    }
    return(
        <form onSubmit={handleSubmit} className="row">
            <Div className="col-sm-6">
                <label className="cs-primary_color">Full Name*</label>
                <input onChange={(e) => setData('name', e.target.value)} value={data.name} type="text" className="cs-form_field" />
                {errors.name && <span className="text-danger">{errors.name}</span>}
                <Spacing lg="20" md="20" />
            </Div>
            <Div className="col-sm-6">
                <label className="cs-primary_color">Email*</label>
                <input onChange={(e) => setData('email', e.target.value)} value={data.email}  type="text" className="cs-form_field" />
                {errors.email && <span className="text-danger">{errors.email}</span>}
                <Spacing lg="20" md="20" />
            </Div>
            <Div className="col-sm-6">
                <label className="cs-primary_color">Project Type*</label>
                <input onChange={(e) => setData('project_type', e.target.value)} value={data.project_type}  type="text" className="cs-form_field" />
                {errors.project_type && <span className="text-danger">{errors.project_type}</span>}
                <Spacing lg="20" md="20" />
            </Div>
            <Div className="col-sm-6">
                <label className="cs-primary_color">Mobile*</label>
                <input type="text" onChange={(e) => setData('mobile_number', e.target.value)} value={data.mobile_number}  className="cs-form_field" />
                {errors.mobile_number && <span className="text-danger">{errors.mobile_number}</span>}
                <Spacing lg="20" md="20" />
            </Div>
            <Div className="col-sm-12">
                <label className="cs-primary_color">Message*</label>
                <textarea
                    cols="30"
                    rows="7"
                    className="cs-form_field"
                    onChange={(e) => setData('message', e.target.value)} value={data.message}
                ></textarea>
                {errors.message && <span className="text-danger">{errors.message}</span>}
                <Spacing lg="25" md="25" />
            </Div>
            <Div className="col-sm-12">
                <button  disabled={processing} className="cs-btn cs-style1">
                    <span>{contactSection.action_button_text}</span>
                    <Icon icon="bi:arrow-right" />
                </button>
            </Div>
            {wasSuccessful && <span className="text-success mt-2">{flash.success}</span>}
        </form>
    )
}
