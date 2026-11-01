import { TeamMemberDataType } from "@/types/teamMember";
import Link from "next/link";
import Image from "next/image";

const CardTeamMember = ({ data }: TeamMemberDataType) => {
    const { name, designation, image, slug } = data || {};

    return (
        <Link
            href={`/teams/${slug}`}
            aria-label={`${name} biyografisi`}
            className="card-team-member radius18"
        >
            {image &&
                <div className="card-team-member-media">
                    <Image
                        src={image}
                        alt={name || "Ekip üyesi"}
                        width={320}
                        height={400}
                        loading="lazy"
                    />
                </div>
            }

            <div className="card-team-member-content">
                {name && <h3 className="heading text-22 fw-600">{name}</h3>}
                {designation && <p className="text text-16">{designation}</p>}
            </div>
        </Link>
    )
}

export default CardTeamMember;
