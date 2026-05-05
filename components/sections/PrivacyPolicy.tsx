import "@/styles/blog.css";
import "@/styles/blog-details.css";

const PrivacyPolicySection = () => {
  return (
    <div className="page-blog mt-100 mb-100">
      <div className="container container-narrow">
        <div className="blog-details">
          <div className="card-blog-list" data-aos="fade-up">
            <div className="card-blog-content">
              <h2 className="card-blog-heading heading text-50 text-center">
                Gizlilik Politikası
              </h2>

              <div className="blog-description">
                <p>
                  VSC Danışmanlık A.Ş. olarak kişisel verilerinizin güvenliğine
                  önem veriyoruz. Bu politika, `vscdanismanlik.com` üzerinden
                  toplanan kişisel verilerin hangi amaçlarla işlendiğini, nasıl
                  korunduğunu ve haklarınızı açıklar.
                </p>

                <h3>1. Veri Sorumlusu</h3>
                <p>
                  Veri sorumlusu: VSC Danışmanlık A.Ş.
                  <br />
                  Adres: Maslak Mah. Bilim Sk. Sun Plaza No: 5A İç Kapı No: 40
                  Sarıyer / İstanbul
                  <br />
                  Telefon: 0555 555 55 55
                </p>

                <h3>2. Toplanan Veriler</h3>
                <p>İletişim formları ve site kullanımı kapsamında aşağıdaki veriler işlenebilir:</p>
                <ul>
                  <li>Kimlik ve iletişim bilgileri (ad soyad, e-posta, telefon)</li>
                  <li>Mesaj içeriği ve talep detayları</li>
                  <li>Teknik kullanım verileri (IP, tarayıcı bilgisi, oturum ve çerez verileri)</li>
                </ul>

                <h3>3. İşleme Amaçları</h3>
                <p>
                  Kişisel verileriniz; iletişim taleplerinin yanıtlanması,
                  danışmanlık süreçlerinin yürütülmesi, hizmet kalitesinin
                  geliştirilmesi, mevzuata uyum ve güvenlik süreçlerinin
                  yönetimi amaçlarıyla işlenir.
                </p>

                <h3>4. Hukuki Sebepler</h3>
                <p>
                  Verileriniz; sözleşmenin kurulması/ifa edilmesi, hukuki
                  yükümlülüklerin yerine getirilmesi, meşru menfaatler ve
                  gerektiğinde açık rıza hukuki sebeplerine dayanılarak
                  işlenir.
                </p>

                <h3>5. Veri Aktarımı</h3>
                <p>
                  Verileriniz; hizmetin ifası için sınırlı olarak teknik hizmet
                  sağlayıcılarına, yasal zorunluluk halinde yetkili kurumlara ve
                  uyuşmazlık hallerinde hukuki danışmanlara aktarılabilir.
                </p>

                <h3>6. Saklama Süresi ve Güvenlik</h3>
                <p>
                  Veriler, işleme amacının gerektirdiği süre boyunca ve ilgili
                  mevzuattaki zamanaşımı/yükümlülük süreleri kadar saklanır.
                  Uygun teknik ve idari tedbirler ile verilerin güvenliği
                  sağlanır.
                </p>

                <h3>7. KVKK Kapsamındaki Haklarınız</h3>
                <p>6698 sayılı KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
                <ul>
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                  <li>Amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                  <li>Şartları oluştuğunda silinmesini veya yok edilmesini isteme</li>
                  <li>İşlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                  <li>Kanuni haklarınız kapsamında itiraz ve tazminat talebi</li>
                </ul>

                <h3>8. İletişim</h3>
                <p>
                  Başvurularınızı şirket adresine yazılı olarak veya
                  `vscdanismanlik.com` üzerindeki iletişim kanallarından bize
                  iletebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicySection;
