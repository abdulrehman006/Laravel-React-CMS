import FunFact from "@/Frontend/Components/FunFact/index.jsx";
import FunFact2 from "@/Frontend/Components/FunFact/FunFact2";
import FunFact3 from "@/Frontend/Components/FunFact/funfact3";
import FunFact4 from "@/Frontend/Components/FunFact/FunFact4";
import Div from "@/Frontend/Components/Div";
import FunFact5 from "@/Frontend/Components/FunFact/FunFact5";
import FunFact6 from "@/Frontend/Components/FunFact/Funfact6";
export default function FunFactSection({sections_data}){
    const funFactSection = sections_data.our_fun_fact_section;
    // conditional layout rendering
    let funFactLayout = ''
    if (funFactSection.layout === "1"){
        funFactLayout =
            <Div className="container">
                <FunFact funFact_data={funFactSection} />
            </Div>
    } else if(funFactSection.layout === "2"){
        funFactLayout =
            <>
                {/* Start FunFact Section */}
                <Div className="container">
                    <FunFact2 funFact_data={funFactSection} />
                </Div>
            </>
    } else if(funFactSection.layout === "3"){
        funFactLayout =
            <>
                {/* Start FunFact Section */}
                <Div className="container">
                    <FunFact3 funFact_data={funFactSection} />
                </Div>
            </>
    } else if(funFactSection.layout === "4"){
        funFactLayout =
            <>
                {/* Start FunFact Section */}
                <Div className="container">
                    <FunFact4 funFact_data={funFactSection} />
                </Div>
            </>
    } else if(funFactSection.layout === "5"){
        funFactLayout =
            <>
                {/* Start FunFact Section */}
                <Div className="container">
                    <FunFact5 funFact_data={funFactSection} />
                </Div>
            </>
    } else if(funFactSection.layout === "6"){
        funFactLayout =
            <>
                <FunFact6 funFact_data={funFactSection} />
            </>
    }
    return <>{funFactLayout}</>
}
