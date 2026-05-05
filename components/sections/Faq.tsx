import { SectionProps } from "@/types/sectionProps";
import { FaqAccordion } from "@/data/faqAccordion";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Text from "../Text";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Accordion from "../Accordion";

const Faq = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        subheading,
        heading,
        text,
        button,
    } = data || {};

    const accordionData = FaqAccordion.slice(0, 5);

    return (
        <div className={`faq ${wrapperCls}`}>
            <div className={container}>
                <div className="grid grid-cols-2 lg:gap-1 faq-row">
                    <div className="lg:col-span-1 col-span-2">
                        <div className="section-headings">
                            {subheading && 
                                <Subheading 
                                    title={subheading}
                                    cls="text-20"
                                    aos="fade-up"
                                />
                            }

                            {heading && 
                                <Heading 
                                    title={heading}
                                    cls="text-50"
                                    aos="fade-up"
                                    aosDelay="50"
                                />
                            }

                            {text && 
                                <Text 
                                    text={text}
                                    cls="text-18"
                                    aos="fade-up"
                                    aosDelay="80"
                                />
                            }

                            {button &&
                                <div className="buttons" data-aos="fade-up" data-aos-delay="100">
                                    {button.type == 'primary' &&
                                        <PrimaryButton 
                                            label={button.label}
                                            href={button.href}
                                            ariaLabel={button.label}
                                        />
                                    }

                                    {button.type == 'secondary' &&
                                        <SecondaryButton 
                                            label={button.label}
                                            href={button.href}
                                            ariaLabel={button.label}
                                        />
                                    }
                                </div>
                            }


                        </div>
                    </div>

                    <div className="lg:col-span-1 col-span-2">
                        <Accordion data={accordionData} />
                    </div>
                </div>
            </div>
      </div>
    )
}

export default Faq;