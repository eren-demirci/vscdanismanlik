import '@/styles/team.css';
import TeamList from '@/data/teams.json';
import CardTeamMember from '../CardTeamMember';
import NotFoundMsg from '../NotFoundMsg';
import Heading from '../Heading';
import { SectionProps } from '@/types/sectionProps';

const OurTeam = ({
    wrapperCls,
    container
}: SectionProps) => {
    const teamList = TeamList;

    if(teamList.length == 0) {
        return <NotFoundMsg message="Ekip üyesi bulunamadı." />
    }

    const groups = Array.from(new Set(teamList.map((member) => member.group)));

    return (
        <div className={`our-team ${wrapperCls}`}>
            <div className={container}>
                {groups.map((group) => (
                    <div className="our-team-group" key={group}>
                        <Heading title={group} cls="text-36" aos="fade-up" />
                        <div className="grid grid-cols-12 sm:gap-1 product-grid">
                            {teamList.filter((member) => member.group === group).map((member) => (
                                <div
                                    className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
                                    data-aos="fade-up"
                                    key={member.slug}
                                >
                                    <CardTeamMember data={member} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OurTeam;
