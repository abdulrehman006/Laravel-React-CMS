import CtaStyle2 from "@/Frontend/Components/Cta/CtaStyle2";

export default function Banner({section_data}){
    const banner = section_data.banner_section;
    return(
        <CtaStyle2
            bgUrl={banner?.background_image}
            btnText={banner?.title}
            btnLink={banner?.action_url}
        />
    )
}
