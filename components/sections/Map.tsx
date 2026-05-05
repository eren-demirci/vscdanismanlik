"use client";

import "@/styles/google-map.css";

const MapSection = () => {
    return (
        <div className="google-map">
            <div className="iframe-wrapper">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.1158687184457!2d29.01664107677916!3d41.11016047133646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5c107f5d707%3A0x3b4fe6cfd6d3233b!2sSun%20Plaza!5e0!3m2!1str!2str!4v1777922539394!5m2!1str!2str"
                    title="Google map"
                    width="1920"
                    height="600"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
      </div>
    )
}

export default MapSection;