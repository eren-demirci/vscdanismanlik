import "@/styles/multicolumn.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import { OfficesData } from "@/data/sections/officesData";

const Offices = ({ data }: { data: typeof OfficesData }) => {
    const {
        wrapperCls,
        container,
        id,
        subheading,
        heading,
        offices,
    } = data;

    return (
        <div className={`multicolumn multicolumn-page ${wrapperCls}`} id={id}>
            <div className={container}>
                <div className="section-headings">
                    <Subheading title={subheading} cls="text-20" aos="fade-up" />
                    <Heading title={heading} cls="text-50" aos="fade-up" />
                </div>

                <div className="multicolumn-inner mt-[60px]">
                    <div className="grid grid-cols-12 md:gap-1 product-grid">
                        {offices.map((office, index) => (
                            <div
                                className="xl:col-span-4 md:col-span-6 col-span-12"
                                data-aos="fade-up"
                                key={`office-${index}`}
                            >
                                <div className="multicolumn-card">
                                    <h3 className="heading text-24">{office.title}</h3>
                                    <p className="text text-16 !mt-4">{office.address}</p>
                                    {office.phones.map((item) => (
                                        <p className="text text-16 fw-500 !mt-3" key={item.name}>
                                            <a href={`tel:${item.phone.replaceAll(" ", "")}`}>{item.phone}</a>
                                            <br />
                                            {item.name}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Offices;
