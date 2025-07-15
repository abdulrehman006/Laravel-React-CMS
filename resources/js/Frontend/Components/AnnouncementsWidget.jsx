import Div from "@/Frontend/Components/Div";

const AnnouncementsWidget = ({ announcements }) => {
  return (
    <Div className="cs-announcements-widget">
      <h5 className="cs-announcements-title">Latest Announcements</h5>
      <div className="cs-marquee-container">
        <div className="cs-marquee-content">
          <ul>
            {announcements.map((item, index) => (
              <li key={index}>
                <strong>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.heading}
                  </a>
                </strong>
                <br />
                <span dangerouslySetInnerHTML={{ __html: item.text }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Div>
  );
};

export default AnnouncementsWidget;
