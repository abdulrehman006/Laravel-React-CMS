import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import PostSlider from "@/Frontend/Components/Slider/PostSlider";
import AnnouncementsWidget from "@/Frontend/Components/AnnouncementsWidget";
// Sample announcements
const sampleAnnouncements = [
    {
      heading: "New Stations",
      link: "https://punjab.vics.pk/stations/",
      text: `Five new stations have been implemented:<br />
            1. Bahawalpur<br />
            2. Chiniot<br />
            3. Jhang<br />
            4. Chakwal<br />
            5. Pakpattan`
    },
    {
      heading: "Punjab Govt Start",
      link: "http://app.itrig.net/punjabvics/?preview_id=82&preview_nonce=44d216531c&_thumbnail_id=-1&preview=true",
      text: `Under special instructions of the Government of Punjab, in collaboration with Opus Inspection, has taken a revolutionary step towards road safety & clean air whereby all public service vehicles will be inspected and given fitness certificates through latest computerized technology.`
    },
    {
      heading: "Punjab Govt Start",
      link: "http://app.itrig.net/punjabvics/?preview_id=82&preview_nonce=44d216531c&_thumbnail_id=-1&preview=true",
      text: `Under special instructions of the Government of Punjab, in collaboration with Opus Inspection, has taken a revolutionary step towards road safety & clean air whereby all public service vehicles will be inspected and given fitness certificates through latest computerized technology.`
    }
  ];
  


export default function Blog1({ blog_data }) {
  return (
    <>
      <Div className="cs-shape_wrap_4">
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
          <SectionHeading
                title={blog_data.title}
                subtitle={blog_data.sub_title}
                
              />
             
            
            <Div className="col-xl-8">
              <Div className="dcs-half_of_full_width">
                <PostSlider />
              </Div>
            </Div>
            <Div className="col-xl-4">
              
              {/* Add widget below heading */}
              <AnnouncementsWidget announcements={sampleAnnouncements} />
            </Div>
          </Div>
        </Div>
      </Div>
    </>
  );
}