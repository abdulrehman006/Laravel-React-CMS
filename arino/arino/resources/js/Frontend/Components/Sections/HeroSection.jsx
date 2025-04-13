import Hero from "@/Frontend/Components/Hero/index.jsx";
import Hero2 from "@/Frontend/Components/Hero/Hero2";
import Hero3 from "@/Frontend/Components/Hero/Hero3";
import Hero4 from "@/Frontend/Components/Hero/Hero4";
import Hero5 from "@/Frontend/Components/Hero/Hero5";
import Hero6 from "@/Frontend/Components/Hero/Hero6";
import Hero7 from "@/Frontend/Components/Hero/Hero7";
import Hero8 from "@/Frontend/Components/Hero/Hero8";
import Hero9 from "@/Frontend/Components/Hero/Hero9";
import Hero10 from "@/Frontend/Components/Hero/Hero10";
import Hero11 from "@/Frontend/Components/Hero/Hero11";

export default function HeroSection({sections_data}){
    const heroSectionLayout = sections_data.hero_section.layout;

    let layoutSection = '';
    // conditional layout rendering
    if (heroSectionLayout === "1"){
        layoutSection = <Hero
            scrollDownId="#service"
            data={sections_data.hero_section}
        />
    } else if(heroSectionLayout === "2"){
        layoutSection = <Hero2 data={sections_data.hero_section} />
    } else if(heroSectionLayout === "3"){
        layoutSection = <Hero3 data={sections_data.hero_section} />
    } else if(heroSectionLayout === "4"){
        layoutSection = <Hero4
            scrollDownId="#service"
            data={sections_data.hero_section}
        />
    } else if(heroSectionLayout === "5"){
        layoutSection = <Hero5 data={sections_data.hero_section} />
    } else if(heroSectionLayout === "6"){
        layoutSection = <Hero6 data={sections_data.hero_section} />
    } else if(heroSectionLayout === "7"){
        layoutSection = <Hero7 data={sections_data.hero_section} />
    } else if(heroSectionLayout === "8"){
        layoutSection = <Hero8 data={sections_data.hero_section} />
    } else if(heroSectionLayout === "9"){
        layoutSection = <Hero9 data={sections_data.hero_section} />
    } else if(heroSectionLayout === "10"){
        layoutSection = <Hero10 data={sections_data.hero_section} />
    } else if(heroSectionLayout === "11"){
        layoutSection = <Hero11 data={sections_data.hero_section} />
    }
    return(
        <>
            {layoutSection}
        </>
    )
}
