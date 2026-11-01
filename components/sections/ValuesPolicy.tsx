import "@/styles/multicolumn.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import { ValuesPolicyData } from "@/data/sections/valuesPolicyData";

const ValuesPolicy = ({ data }: { data: typeof ValuesPolicyData }) => {
    const {
        wrapperCls,
        container,
        id,
        subheading,
        heading,
        values,
        policyHeading,
        policy,
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
                        {values.map((item, index) => (
                            <div
                                className="xl:col-span-4 md:col-span-6 col-span-12"
                                data-aos="fade-up"
                                key={`value-${index}`}
                            >
                                <div className="multicolumn-card">
                                    <h3 className="heading text-28">{item.title}</h3>
                                    <p className="text text-16 !mt-4">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-[60px]">
                    <h3 className="heading text-36" data-aos="fade-up">{policyHeading}</h3>
                    {policy.map((paragraph, index) => (
                        <p className="text text-18 !mt-5" data-aos="fade-up" key={`policy-${index}`}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ValuesPolicy;
