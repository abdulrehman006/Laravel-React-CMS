import {useState} from "react";
import {IonIcon} from "@ionic/react";
import {chevronBackOutline} from "ionicons/icons";

export default function AddSection({setIsAddSection, addSection}){
    const [sections, setSections] = useState([
        { id: 'Hero', title: 'Hero Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'FunFact', title: 'Fun fact Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'Service', title: 'Services Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'Portfolio', title: 'Portfolio Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'Award', title: 'Award Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'Video', title: 'Video Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'Team', title: 'Team Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'Testimonial', title: 'Testimonial Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'Blog', title: 'Blog Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'MovingText', title: 'Moving Text Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'Partner', title: 'Partner Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'CTA', title: 'CTA Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'Pricing', title: 'Pricing Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'Contact', title: 'Contact Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'CaseStudy', title: 'Case Study Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'About', title: 'About Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'WhyChooseUs', title: 'Why Choose Us', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'Faq', title: 'Faq Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'PhotoGallery', title: 'Photo Gallery Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'WorkingProgress', title: 'Working Progress Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'Banner', title: 'Banner Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
        { id: 'Resume', title: 'Resume Section', spacing: {top: {lg: 0, md: 0}, bottom: {lg: 0, md: 0}} },
    ])
    const [selectedSection, setSelectedSection] = useState({});

    // handle add section
    const handleAddSection = (e) => {
        e.preventDefault();
        addSection(selectedSection);
        setSelectedSection({})
        setIsAddSection(false)
    }
    return(
        <div className="customize-section-description-container">
            <div className="add-section-title">
                <button onClick={() => setIsAddSection(false)}>
                    <IonIcon icon={chevronBackOutline} />
                </button>
                <span>
                    Action <br/>
                    <strong>Add Section</strong>
                </span>
            </div>
            <div className="customize-field">
                <form onSubmit={handleAddSection}>
                    <div className="form-group">
                        <label htmlFor="">Sections</label>
                        <select name="" id="" className="form-control" required onChange={(e) => setSelectedSection(JSON.parse(e.target.value))}>
                            <option value="">Select Section</option>
                            {sections.map((section, index) => (
                                <option key={index} value={JSON.stringify(section)}>{section.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-sm btn-primary">Add Section</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
